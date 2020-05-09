import React from 'react'
import styled from 'styled-components/macro'
import sortBy from 'lodash/sortBy'

import { useQuery, gql } from '@apollo/client'
import * as Types from '__generated__/Types'

import Post from './Post'
import Button from 'components/common/mui/Button'
import {
  Typography,
  LinearProgress as MuiLinearProgress,
} from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
  /* Keep scroll bar on bar while loading so the page doesn't jump sideways */
  margin-bottom: -1;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

const Posts = styled.div``

const MoreButton = styled(Button)`
  border-radius: 0px;
  background-color: white;
  padding: ${({ theme }) => theme.spacing(5)}px 0;
`

const LinearProgress = styled(MuiLinearProgress)`
  height: 112px;
  background-color: ${({ theme }) => theme.themeColors.loaderBackground};

  .MuiLinearProgress-barColorPrimary {
    background-color: ${({ theme }) => theme.themeColors.loaderBarBackground};
  }
`

const NoItemsContainerRoot = styled.div`
  display: flex;
  height: 125px;
  align-items: center;
  justify-content: center;
`

const NoItemsContainer = () => (
  <NoItemsContainerRoot>
    <Typography variant="h5" color="textSecondary">
      <pre>{`No Posts :(`}</pre>
    </Typography>
  </NoItemsContainerRoot>
)

const GET_DATA = gql`
  query GetPostsPageData(
    $filters: SearchPostsFiltersInput!
    $limit: Int!
    $page: Int!
  ) {
    searchPosts(filters: $filters, limit: $limit, page: $page) {
      page
      posts {
        id
        publishedDate
        ...Post_post
      }
    }
    me {
      ... on Me {
        id
        lovedPosts
      }
    }
  }
  ${Post.fragments.post}
`

export default function PostsPage() {
  const { data, loading, fetchMore } = useQuery<
    Types.GetPostsPageData,
    Types.GetPostsPageDataVariables
  >(GET_DATA, {
    variables: {
      filters: {
        postType: Types.PostType.user,
      },
      limit: 3,
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  })

  const lovedPosts = data?.me.__typename === 'Me' ? data?.me.lovedPosts : []

  const postComponents = sortBy(data?.searchPosts?.posts, 'publishedDate')
    ?.reverse()
    ?.map((post) => {
      if (!post) return null

      const hasLovedPost = !!lovedPosts?.includes(post.id)

      return (
        <Post
          key={post.id}
          postId={post.id}
          post={post}
          hasLovedPost={hasLovedPost}
        />
      )
    })
    .filter(Boolean)

  const hasPosts = postComponents && postComponents.length > 0

  const body = React.useMemo(() => {
    if (hasPosts) {
      return <Posts>{postComponents}</Posts>
    } else if (loading) {
      return null
    } else {
      return <NoItemsContainer />
    }
  }, [postComponents, hasPosts, loading])

  return (
    <Root>
      {body}
      {loading ? (
        <LinearProgress />
      ) : (
        <MoreButton
          variant="contained"
          size="large"
          disableElevation
          onClick={() => {
            fetchMore({
              variables: {
                page: (data?.searchPosts?.page || 0) + 1,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return {
                  ...fetchMoreResult,
                  searchPosts: {
                    ...fetchMoreResult.searchPosts,
                    posts: [
                      ...prev.searchPosts.posts,
                      ...fetchMoreResult.searchPosts.posts,
                    ],
                  },
                }
              },
            })
          }}
        >
          <Typography variant="h5">Load More</Typography>
        </MoreButton>
      )}
    </Root>
  )
}
