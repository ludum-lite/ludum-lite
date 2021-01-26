import React from 'react'
import styled, { css } from 'styled-components/macro'
import { gql } from '@apollo/client'
import { filter } from 'graphql-anywhere'

import PostDetails from './PostDetails'
import ButtonGroup from 'components/common/mui/ButtonGroup'

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
import FocusableCard from 'components/common/FocusableCard'

interface RootProps {
  collapsedNewsPost?: boolean
}
const Root = styled(FocusableCard).withConfig({
  shouldForwardProp: ignoreProps(['active', 'collapsedNewsPost']),
})<RootProps>`
  padding: ${({ theme }) => theme.spacing(2)}px;

  ${({ collapsedNewsPost }) =>
    collapsedNewsPost &&
    css`
      background: ${({ theme }) => theme.themeColors.post.newsTagBackground};
      border-bottom: none;
    `}
`

const StyledButtonGroup = styled(ButtonGroup)`
  flex: 1 1 0px;
`

const Separator = styled.div`
  flex: 1 1 0px;
`

const ActionRow = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.spacing(1)}px;
  /* Raise above the card link */
  z-index: 1;
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
  collapsedNewsPost?: boolean
  className?: string
}
export default function Post({
  post,
  me,
  collapsedNewsPost,
  className,
}: Props) {
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
      className={className}
      onClick={() => onClickCard(post.id)}
      active={activePostId === post.id}
      collapsedNewsPost={collapsedNewsPost}
    >
      <Link to={`/posts/${post.id}`} overlay />
      <PostDetails
        post={filter(PostDetails_PostFragmentDoc, post)}
        collapsedNewsPost={collapsedNewsPost}
      />
      {!collapsedNewsPost && (
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
      )}
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
    subtype
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
