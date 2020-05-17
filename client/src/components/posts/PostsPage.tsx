import React from 'react'
import styled from 'styled-components/macro'
import { useSearchParams } from 'react-router-dom'

import { useQuery, gql, NetworkStatus } from '@apollo/client'
import * as Types from '__generated__/Types'

import Post from './Post'
import Button from 'components/common/mui/Button'
import { Typography, LinearProgress } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
  /* Keep scroll bar on bar while loading so the page doesn't jump sideways */
  margin-bottom: -1;
  margin: 0px ${({ theme }) => theme.spacing(4)}px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`

const Posts = styled.div`
  display: flex;
  flex-direction: column;
`

const MoreButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing(5)}px 0;
`

const SortButton = styled(Button)`
  padding: 6px 16px;
`

const SortActions = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing(4)}px 0;

  ${SortButton} {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
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
      No Posts :(
    </Typography>
  </NoItemsContainerRoot>
)

const GET_FAVORITED_IDS = gql`
  query GetFavoritedIds {
    favoritedIds @client
  }
`

const GET_DATA = gql`
  query GetPostsPageData(
    $filters: SearchPostsFiltersInput!
    $limit: Int!
    $page: Int!
  ) {
    isLoggedIn @client
    searchPosts(filters: $filters, limit: $limit, page: $page) {
      page
      posts {
        id
        publishedDate
        ...Post_post
      }
    }
    me {
      ...Post_me
    }
  }
  ${Post.fragments.post}
  ${Post.fragments.me}
`

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    postType: Types.PostType.all,
  })

  const postType = searchParams.get('postType') as Types.PostType

  const { data: favoritedIdsData } = useQuery<Types.GetFavoritedIds>(
    GET_FAVORITED_IDS
  )

  const favoritedIds = favoritedIdsData?.favoritedIds

  const { data, loading, fetchMore, networkStatus } = useQuery<
    Types.GetPostsPageData,
    Types.GetPostsPageDataVariables
  >(GET_DATA, {
    variables: {
      filters: {
        postType,
        favoritedIds:
          postType === Types.PostType.favorites
            ? favoritedIdsData?.favoritedIds
            : undefined,
      },
      limit: 3,
      page: 0,
    },
    notifyOnNetworkStatusChange: true,
  })

  const postComponents = data?.searchPosts?.posts?.map((post) => (
    <Post
      key={post.id}
      post={post}
      me={data?.me}
      hasFavoritedPost={!!favoritedIds?.includes(post.id)}
    />
  ))

  const hasPosts = postComponents && postComponents.length > 0

  const body = React.useMemo(() => {
    if (
      networkStatus === NetworkStatus.loading ||
      networkStatus === NetworkStatus.setVariables
    ) {
      return null
    } else if (hasPosts) {
      return <Posts>{postComponents}</Posts>
    } else {
      return <NoItemsContainer />
    }
  }, [postComponents, hasPosts, networkStatus])

  const footer = React.useMemo(() => {
    if (
      (networkStatus === NetworkStatus.ready ||
        networkStatus === NetworkStatus.error) &&
      !hasPosts
    ) {
      return null
    } else if (loading) {
      return <LinearProgress />
    }

    return (
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
    )
  }, [loading, networkStatus, data, fetchMore, hasPosts])

  return (
    <Root>
      <SortActions>
        <SortButton
          onClick={() =>
            setSearchParams({ postType: Types.PostType.all }, undefined)
          }
          variant={postType === Types.PostType.all ? 'contained' : 'text'}
          color={postType === Types.PostType.all ? 'primary' : 'default'}
        >
          All
        </SortButton>
        <SortButton
          onClick={() =>
            setSearchParams({ postType: Types.PostType.news }, undefined)
          }
          variant={postType === Types.PostType.news ? 'contained' : 'text'}
          color={postType === Types.PostType.news ? 'primary' : 'default'}
        >
          News
        </SortButton>
        <SortButton
          onClick={() =>
            setSearchParams({ postType: Types.PostType.favorites }, undefined)
          }
          variant={postType === Types.PostType.favorites ? 'contained' : 'text'}
          color={postType === Types.PostType.favorites ? 'primary' : 'default'}
        >
          Favorites
        </SortButton>
      </SortActions>
      <Content>
        {body}
        {footer}
      </Content>
    </Root>
  )
}
