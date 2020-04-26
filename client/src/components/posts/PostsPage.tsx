import React from 'react'
import styled from 'styled-components/macro'

import { useQuery, gql } from '@apollo/client'
import { PostType } from '../../__generated__/globalTypes'
import * as Types from './__generated__/GetPostsPageData'

import PostDetails from 'components/common/post/PostDetails'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import Button from 'components/common/mui/Button'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import CommentIcon from '@material-ui/icons/CommentRounded'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'

const Root = styled.div`
  display: flex;
  justify-content: center;
  /* Keep scroll bar on bar while loading so the page doesn't jump sideways */
  margin-bottom: -1;
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

const PlaceholderContainer = styled.div`
  /* // Keep scroll bar on bar while loading so the page doesn't jump sideways */
  align-self: stretch;
`

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 301px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`

const StatButtonFavorite = styled.div`
  /* color: theme.palette.getContrastText(pink[500]), */
  /* background-color: pink[500]; */
  &:hover {
    /* background-color: pink[700]; */
  }
`

const StatButtonComment = styled.div`
  /* color: theme.palette.getContrastText(blue[500]); */
  /* background-color: blue[500]; */
  &:hover {
    /* background-color: blue[700]; */
  }
`

const RightIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  font-size: 1.32rem;
`

const ActionRow = styled.div`
  display: flex;
`

const MoreContainer = styled.div`
  display: flex;
  justify-content: center;
`

const NoItemsContainer = styled.div`
  display: flex;
  height: 125px;
  align-items: center;
  justify-content: center;
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
      numLove
      numNotes
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
          const hasLovedPost = false // myLove.includes(post.id)
          const hasFavoritedPost = false // pinnedPostIds.includes(post.id)

          if (!post) return null

          return (
            <Post key={post.id} onClick={() => onClickCard(post.id)}>
              <PostDetails postId={post.id} />
              <ActionRow>
                <ButtonGroup>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      // store.postStore.toggleLovePost(post.id)
                    }}
                  >
                    {hasLovedPost ? (
                      <RightIcon as={FavoriteIcon} />
                    ) : (
                      <RightIcon as={FavoriteBorderIcon} />
                    )}
                    {post.numLove}
                  </Button>
                  <Button size="small">
                    <RightIcon as={CommentIcon} />
                    {post.numNotes}
                  </Button>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      // store.postStore.togglePinnedPost(post.id)
                    }}
                  >
                    {hasFavoritedPost ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </Button>
                </ButtonGroup>
              </ActionRow>
            </Post>
          )
        })}
      </Posts>
    </Root>
  )
}
