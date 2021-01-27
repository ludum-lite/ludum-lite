import React from 'react'
import styled, { css } from 'styled-components/macro'
import { useSearchParams } from 'react-router-dom'

import { gql, NetworkStatus } from '@apollo/client'

import Post from './Post'
import Button from 'components/common/mui/Button'
import { Typography, LinearProgress } from '@material-ui/core'
import { ignoreProps } from 'utils'
import {
  useGetPostsPageDataQuery,
  PostType,
  usePostsPage_GetFavoritedIdsQuery,
  Post_PostFragmentDoc,
  Post_MeFragmentDoc,
} from '__generated__/client-types'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
  /* Keep scroll bar on bar while loading so the page doesn't jump sideways */
  margin-bottom: -1;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLinearProgress = styled(LinearProgress)`
  border: 1px solid ${({ theme }) => theme.themeColors.loader.barBackground};
`

const Posts = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px;
`

const MoreButton = styled(Button)`
  height: 112px;
`

interface SortButtonProps {
  active: boolean
}
const SortButton = styled(Button).withConfig({
  shouldForwardProp: ignoreProps(['active']),
})<SortButtonProps>`
  /* ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.themeColors.backgrounds.level1};

      &:hover {
        background-color: ${({ theme }) =>
          theme.themeColors.backgrounds.level1};
      }
    `} */
`

const SortActions = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing(2)}px;

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
    <Typography variant="h4" color="textSecondary">
      No Posts :(
    </Typography>
  </NoItemsContainerRoot>
)

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    postType: PostType.All,
  })

  const postType = searchParams.get('postType') as PostType

  const { data: favoritedIdsData } = usePostsPage_GetFavoritedIdsQuery()

  const {
    data,
    loading,
    fetchMore,
    networkStatus,
    ...others
  } = useGetPostsPageDataQuery({
    variables: {
      filters: {
        postType,
        favoritedIds:
          postType === PostType.Favorites
            ? favoritedIdsData?.favoritedIds
            : null,
      },
      limit: 3,
      page: 0,
    },
    notifyOnNetworkStatusChange: true,
  })
  console.log({
    data,
    loading,
    fetchMore,
    networkStatus,
    others,
  })

  const latestNewsPost = postType === PostType.All && data?.latestNewsPost && (
    <Post
      key="latestNewsPost"
      post={data?.latestNewsPost}
      me={data?.me}
      collapsedNewsPost
    />
  )

  const postComponents =
    data?.searchPosts?.posts?.map((post) => (
      <Post key={post.id} post={post} me={data?.me} />
    )) || []

  const allPosts = [latestNewsPost, ...postComponents].filter(Boolean)

  const hasPosts = allPosts.length > 0

  const body = React.useMemo(() => {
    if (
      networkStatus === NetworkStatus.loading ||
      networkStatus === NetworkStatus.setVariables
    ) {
      return null
    } else if (hasPosts) {
      return <Posts>{allPosts}</Posts>
    } else {
      return <NoItemsContainer />
    }
  }, [allPosts, hasPosts, networkStatus])

  const footer = React.useMemo(() => {
    if (
      (networkStatus === NetworkStatus.ready ||
        networkStatus === NetworkStatus.error) &&
      !hasPosts
    ) {
      return null
    } else if (loading) {
      return <StyledLinearProgress />
    }

    return (
      <MoreButton
        variant="outlined"
        color="primary"
        disableElevation
        fullWidth
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
        <Typography variant="h4">Load More</Typography>
      </MoreButton>
    )
  }, [loading, networkStatus, data, fetchMore, hasPosts])

  return (
    <Root>
      <SortActions>
        <SortButton
          onClick={() => setSearchParams({ postType: PostType.All }, undefined)}
          color="primary"
          variant={postType === PostType.All ? 'contained' : 'text'}
          active={postType === PostType.All}
          focusRipple
        >
          All
        </SortButton>
        <SortButton
          onClick={() =>
            setSearchParams({ postType: PostType.News }, undefined)
          }
          color="primary"
          variant={postType === PostType.News ? 'contained' : 'text'}
          active={postType === PostType.News}
        >
          News
        </SortButton>
        <SortButton
          onClick={() =>
            setSearchParams({ postType: PostType.Favorites }, undefined)
          }
          color="primary"
          variant={postType === PostType.Favorites ? 'contained' : 'text'}
          active={postType === PostType.Favorites}
        >
          Favorites
        </SortButton>
      </SortActions>
      <Content>
        {body}
        <FooterContainer>{footer}</FooterContainer>
      </Content>
    </Root>
  )
}

gql`
  query PostsPage_GetFavoritedIds {
    favoritedIds @client
  }

  query GetPostsPageData(
    $filters: SearchPostsFiltersInput!
    $limit: Int!
    $page: Int!
  ) {
    isLoggedIn @client
    latestNewsPost {
      id
      publishedDate
      ...Post_post
    }
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
  ${Post_PostFragmentDoc}
  ${Post_MeFragmentDoc}
`
