import React from 'react'
import styled from 'styled-components/macro'
import { useQuery, gql } from '@apollo/client'
import * as Types from './__generated__/GetPostData'

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
  flex-direction: column;
  overflow: visible;
  background: white;
  padding: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`

const RightIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  font-size: 1.32rem;
`

const ActionRow = styled.div`
  display: flex;
`

const PlaceholderContainer = styled.div`
  /* // Keep scroll bar on bar while loading so the page doesn't jump sideways */
  align-self: stretch;
`

const PlaceholderCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 301px;
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

const GET_DATA = gql`
  query GetPostData($id: Int!) {
    post(id: $id) {
      id
      numLove
      numNotes
      name
      body
      publishedDate
      author {
        id
        profilePath
        avatarPath
        name
      }
    }
  }
`

interface Props {
  postId: number
}
export default function Post({ postId }: Props) {
  const hasLovedPost = false // myLove.includes(post.id)
  const hasFavoritedPost = false // pinnedPostIds.includes(post.id)

  const { data } = useQuery<Types.GetPostData, Types.GetPostDataVariables>(
    GET_DATA,
    {
      variables: {
        id: postId,
      },
    }
  )

  const post = data?.post

  const onClickCard = React.useCallback((id) => {
    // navigate(`/feed/posts/${id}`)
    // setHasClickedPost(true)
  }, [])

  if (!post) return null

  return (
    <Root onClick={() => onClickCard(post.id)}>
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
            {hasFavoritedPost ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </Button>
        </ButtonGroup>
      </ActionRow>
    </Root>
  )
}
