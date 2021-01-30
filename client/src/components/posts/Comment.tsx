import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import { filter } from 'graphql-anywhere'
import Markdown from 'components/common/Markdown'
import Button from 'components/common/mui/Button'
import Icon from 'components/common/mui/Icon'
import CreateIcon from '@material-ui/icons/Create'
import { useMe } from 'hooks/useMe'
import UserPostedHeader from './UserPostedHeader'
import CommentLoveButton from './comment-buttons/CommentLoveButton'
import EditCommentForm from './EditCommentForm'
import {
  Comment_CommentFragment,
  Comment_PostFragment,
  CommentLoveButton_CommentFragmentDoc,
  EditCommentForm_CommentFragmentDoc,
  CommentLoveButton_PostFragmentDoc,
} from '__generated__/client-types'

const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px;
  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme }) => theme.themeColors.borderColors.level1};
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
  comment: Comment_CommentFragment
  post: Comment_PostFragment
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
              startIcon={<Icon icon={CreateIcon} />}
            >
              Edit
            </Button>
          )}
          <CommentLoveButton
            comment={filter(CommentLoveButton_CommentFragmentDoc, comment)}
            post={filter(CommentLoveButton_PostFragmentDoc, post)}
          />
        </ActionRow>
      </Root>
    )
  } else {
    return (
      <EditCommentForm
        className={className}
        comment={filter(EditCommentForm_CommentFragmentDoc, comment)}
        onClose={() => {
          setIsEditing(false)
        }}
      />
    )
  }
}

Comment.displayName = 'Comment'

gql`
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

  fragment Comment_post on Post {
    authorId
    ...CommentLoveButton_post
  }

  ${CommentLoveButton_CommentFragmentDoc}
  ${CommentLoveButton_PostFragmentDoc}
  ${EditCommentForm_CommentFragmentDoc}
`
