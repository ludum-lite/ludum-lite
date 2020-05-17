import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import { filter } from 'graphql-anywhere'
import * as Types from '__generated__/Types'
import { favoritedIdsVar } from 'resolvers'
import { useNavigate } from 'react-router-dom'

import PostDetails from './PostDetails'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import Button from 'components/common/mui/Button'

import CommentIcon from '@material-ui/icons/CommentRounded'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Card from 'components/common/mui/Card'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import PostLoveButton from './PostLoveButton'

const Root = styled(Card)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.themeColors.post.backgroundColor};
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(1)}px`};
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
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
  padding-top: ${({ theme }) => theme.spacing(1)}px;
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

interface Props {
  post: Types.Post_post
  me: Types.Post_me
  hasFavoritedPost: boolean
}
export default function Post({ post, me, hasFavoritedPost }: Props) {
  const navigate = useNavigate()
  const [, setPostOverlayed] = usePostOverlayed()

  const onClickCard = React.useCallback(
    (id) => {
      setPostOverlayed(true)
      navigate(`/posts/${id}`)
    },
    [navigate, setPostOverlayed]
  )

  if (!post) return null

  return (
    <Root onClick={() => onClickCard(post.id)} clickable>
      <PostDetails post={filter(PostDetails.fragments.post, post)} />
      <ActionRow>
        <ButtonGroup>
          <PostLoveButton
            post={filter(PostLoveButton.fragments.post, post)}
            me={filter(PostLoveButton.fragments.me, me)}
          />
          <Button>
            <RightIcon as={CommentIcon} />
            {post.numNotes}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              let newFavoritedIds: number[]

              if (hasFavoritedPost) {
                newFavoritedIds = favoritedIdsVar().filter(
                  (id) => post.id !== id
                )
              } else {
                newFavoritedIds = [...favoritedIdsVar(), post.id]
              }

              favoritedIdsVar(newFavoritedIds)
              window.localStorage.setItem(
                'favoritedIds',
                JSON.stringify(newFavoritedIds)
              )
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
  post: gql`
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
      ...PostDetails_post
      ...PostLoveButton_post
    }
    ${PostDetails.fragments.post}
    ${PostLoveButton.fragments.post}
  `,
  me: gql`
    fragment Post_me on MeResponse {
      ...PostLoveButton_me
    }
    ${PostLoveButton.fragments.me}
  `,
}
