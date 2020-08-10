import React from 'react'
import styled, { css, keyframes } from 'styled-components/macro'
import { gql } from '@apollo/client'
import { filter } from 'graphql-anywhere'

import PostDetails from './PostDetails'
import ButtonGroup from 'components/common/mui/ButtonGroup'

import Card from 'components/common/mui/Card'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import PostLoveButton from './post-buttons/PostLoveButton'
import PostBookmarkButton from './post-buttons/PostBookmarkButton'
import PostCommentButton from './post-buttons/PostCommentButton'
import { useActivePostId } from 'hooks/useActivePostId'
import { ignoreProps } from 'utils'
import {
  Post_PostFragment,
  Post_MeFragment,
  PostDetails_PostFragmentDoc,
  PostLoveButton_MeFragmentDoc,
  PostLoveButton_PostFragmentDoc,
  PostCommentButton_PostFragmentDoc,
} from '__generated__/client-types'
import Link from 'components/common/mui/Link'

const activeBoxShadowKeyFrames = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0px 4px transparent;
  }

  100% {
    box-shadow: 0 0 0px 4px ${color};
  }
`

interface RootProps {
  active: boolean
}
const Root = styled(Card).withConfig({
  shouldForwardProp: ignoreProps(['active']),
})<RootProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.themeColors.post.backgroundColor};
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  transition: box-shadow 5000ms;

  ${({ active, theme }) =>
    active &&
    css`
      animation: ${activeBoxShadowKeyFrames(
          theme.themeColors.post.activeBorderColor
        )}
        250ms forwards;
    `}
`

const StyledButtonGroup = styled(ButtonGroup)`
  flex: 1 1 0px;
`

const Separator = styled.div`
  flex: 1 1 0px;
`

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow: visible;
// `

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
  post: Post_PostFragment
  me: Post_MeFragment
}
export default function Post({ post, me }: Props) {
  const [, setPostOverlayed] = usePostOverlayed()
  const { activePostId } = useActivePostId()

  const onClickCard = React.useCallback(
    (id) => {
      setPostOverlayed(true)
    },
    [setPostOverlayed]
  )

  if (!post) return null

  return (
    <Root
      onClick={() => onClickCard(post.id)}
      clickable
      active={activePostId === post.id}
    >
      <Link to={`/posts/${post.id}`} overlay />
      <PostDetails post={filter(PostDetails_PostFragmentDoc, post)} />
      <ActionRow>
        <StyledButtonGroup>
          <PostLoveButton
            post={filter(PostLoveButton_PostFragmentDoc, post)}
            me={filter(PostLoveButton_MeFragmentDoc, me)}
          />
          <PostCommentButton
            post={filter(PostCommentButton_PostFragmentDoc, post)}
          />
          <Separator />
          <PostBookmarkButton postId={post.id} />
        </StyledButtonGroup>
      </ActionRow>
    </Root>
  )
}

gql`
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
    ...PostCommentButton_post
  }

  fragment Post_me on MeResponse {
    ...PostLoveButton_me
  }

  ${PostDetails_PostFragmentDoc}
  ${PostLoveButton_MeFragmentDoc}
  ${PostLoveButton_PostFragmentDoc}
  ${PostCommentButton_PostFragmentDoc}
`
