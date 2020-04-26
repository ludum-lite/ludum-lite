import React from 'react'
import styled from 'styled-components/macro'
import { useQuery, gql } from '@apollo/client'
import { PostType } from '../../__generated__/globalTypes'
import * as Types from './__generated__/GetPostsPageData'
import Card from 'components/common/mui/Card'
import PostDetails from 'components/common/post/PostDetails'

const Root = styled.div`
  display: flex;
  justify-content: center;
`

const Post = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`

const Posts = styled.div`
  max-width: 480px;
  margin: ${({ theme }) => theme.spacing(6)}px 0;

  ${Post}:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(6)}px;
    padding-bottom: ${({ theme }) => theme.spacing(6)}px;
    border-bottom: 3px solid
      ${({ theme }) => theme.themeColors.posts.separatorColor};
  }
`

const GET_DATA = gql`
  query GetPostsPageData(
    $filters: SearchPostsFiltersInput!
    $limit: Int!
    $page: Int!
  ) {
    searchPosts(filters: $filters, limit: $limit, page: $page) {
      id
      name
    }
  }
`

interface Props {}
export default function PostsPage({}: Props) {
  const { data } = useQuery<
    Types.GetPostsPageData,
    Types.GetPostsPageDataVariables
  >(GET_DATA, {
    variables: {
      filters: {
        postType: PostType.user,
      },
      limit: 3,
      page: 1,
    },
  })

  const onClickCard = React.useCallback((id) => {
    // navigate(`/feed/posts/${id}`)
    // setHasClickedPost(true)
  }, [])

  return (
    <Root>
      <Posts>
        {data?.searchPosts?.map((post) => {
          return (
            <Post key={post.id} onClick={() => onClickCard(post.id)}>
              <PostDetails postId={post.id} />
              {/* <div className={classes.actionRow}>
                <ButtonGroup>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      store.postStore.toggleLovePost(post.id)
                    }}
                  >
                    {hasLovedPost ? (
                      <FavoriteIcon className={classes.rightIcon} />
                    ) : (
                      <FavoriteBorderIcon className={classes.rightIcon} />
                    )}
                    {post.numLove}
                  </Button>
                  <Button size="small">
                    <CommentIcon className={classes.rightIcon} />
                    {post.numComments}
                  </Button>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      store.postStore.togglePinnedPost(post.id)
                    }}
                  >
                    {hasFavoritedPost ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </Button>
                </ButtonGroup>
              </div> */}
            </Post>
          )
        })}
      </Posts>
    </Root>
  )
}
