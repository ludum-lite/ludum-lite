import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import * as Types from '__generated__/Types'
import Markdown from 'components/common/Markdown'
import UserPostedHeader from './UserPostedHeader'
import CommentLoveButton from './comment-buttons/CommentLoveButton'
import { filter } from 'graphql-anywhere'
import Button from 'components/common/mui/Button'
import EditCommentForm from './EditCommentForm'
import { useMe } from 'hooks/useMe'

const Root = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(1)}px;
  box-shadow: ${({ theme }) => theme.themeColors.comment.boxShadow};

  &:nth-child(even) {
    background: ${({ theme }) => theme.themeColors.comment.evenBackground};
  }

  &:nth-child(odd) {
    background: ${({ theme }) => theme.themeColors.comment.oddBackground};
  }
`

const TitleRow = styled.div`
  display: flex;
`

const Body = styled.div``

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`

interface Props {
  comment: Types.Comment_comment
  post: Types.Comment_post
  className?: string
}
export default function Comment({ comment, post, className }: Props) {
  const [isEditing, setIsEditing] = React.useState(false)
  const { me } = useMe()

  if (!comment) return null

  if (!isEditing) {
    return (
      <Root className={className}>
        <TitleRow>
          <UserPostedHeader
            userProfilePath={comment.author?.profilePath}
            userAvatarPath={comment.author?.avatarPath}
            userName={comment.author?.name}
            postedDate={comment.createdDate}
            highlightUserLink={comment.author?.id === post.authorId}
          />
        </TitleRow>
        <Body>
          <Markdown source={comment.body} />
        </Body>
        <ActionRow>
          {comment.author?.id === me?.id && (
            <Button
              onClick={() => {
                setIsEditing(true)
              }}
              size="small"
            >
              Edit
            </Button>
          )}
          <CommentLoveButton
            comment={filter(CommentLoveButton.fragments.comment, comment)}
            post={filter(CommentLoveButton.fragments.post, post)}
          />
        </ActionRow>
      </Root>
    )
  } else {
    return (
      <EditCommentForm
        className={className}
        comment={filter(EditCommentForm.fragments.comment, comment)}
        onClose={() => {
          setIsEditing(false)
        }}
      />
    )
  }
}

Comment.fragments = {
  comment: gql`
    fragment Comment_comment on Comment {
      id
      body
      numLove
      createdDate
      author {
        id
        avatarPath
        profilePath
        name
      }
      ...CommentLoveButton_comment
      ...EditCommentForm_comment
    }
    ${CommentLoveButton.fragments.comment}
    ${EditCommentForm.fragments.comment}
  `,
  post: gql`
    fragment Comment_post on Post {
      authorId
      ...CommentLoveButton_post
    }
    ${CommentLoveButton.fragments.post}
  `,
}
