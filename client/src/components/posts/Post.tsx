import React from 'react'
import styled from 'styled-components/macro'
import { useMutation, gql } from '@apollo/client'
import * as Types from '__generated__/Types'

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

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow: visible;
// `

const RightIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  font-size: 2rem;
`

const ActionRow = styled.div`
  display: flex;
`

// const PlaceholderContainer = styled.div`
//   /* // Keep scroll bar on bar while loading so the page doesn't jump sideways */
//   align-self: stretch;
// `

// const PlaceholderCard = styled(Card)`
//   display: flex;
//   flex-direction: column;
//   padding: 12px;
//   height: 301px;
// `

// const StatButtonFavorite = styled.div`
//   /* color: theme.palette.getContrastText(pink[500]), */
//   /* background-color: pink[500]; */
//   &:hover {
//     /* background-color: pink[700]; */
//   }
// `

// const StatButtonComment = styled.div`
//   /* color: theme.palette.getContrastText(blue[500]); */
//   /* background-color: blue[500]; */
//   &:hover {
//     /* background-color: blue[700]; */
//   }
// `

const POST_FRAGMENT = gql`
  fragment Post_post on Post {
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
`

const LOVE_POST = gql`
  mutation LovePost($input: IdInput!) {
    lovePost(input: $input) {
      ... on LovePostSuccess {
        post {
          id
          numLove
        }
        me {
          ... on Me {
            id
            lovedPosts
          }
        }
      }
    }
  }
`

const UNLOVE_POST = gql`
  mutation UnlovePost($input: IdInput!) {
    unlovePost(input: $input) {
      ... on UnlovePostSuccess {
        post {
          id
          numLove
        }
        me {
          ... on Me {
            id
            lovedPosts
          }
        }
      }
    }
  }
`

interface Props {
  postId: number
  post: Types.Post_post
  hasLovedPost: boolean
}
export default function Post({ postId, post, hasLovedPost }: Props) {
  const [lovePost] = useMutation<Types.LovePost, Types.LovePostVariables>(
    LOVE_POST,
    {
      variables: {
        input: {
          id: postId,
        },
      },
    }
  )

  const [unlovePost] = useMutation<Types.UnlovePost, Types.UnlovePostVariables>(
    UNLOVE_POST,
    {
      variables: {
        input: {
          id: postId,
        },
      },
    }
  )

  const hasFavoritedPost = false // pinnedPostIds.includes(post.id)

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
            onClick={(e) => {
              e.stopPropagation()
              if (!hasLovedPost) {
                lovePost()
              } else {
                unlovePost()
              }
            }}
          >
            {hasLovedPost ? (
              <RightIcon as={FavoriteIcon} />
            ) : (
              <RightIcon as={FavoriteBorderIcon} />
            )}
            {post.numLove}
          </Button>
          <Button>
            <RightIcon as={CommentIcon} />
            {post.numNotes}
          </Button>
          <Button
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

Post.fragments = {
  post: POST_FRAGMENT,
}
