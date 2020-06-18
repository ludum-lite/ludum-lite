import React from 'react'

import { gql } from '@apollo/client'
import CommentForm from './CommentForm'
import {
  EditCommentForm_CommentFragment,
  useEditCommentMutation,
} from '__generated__/client-types'

interface Props {
  comment: EditCommentForm_CommentFragment
  onClose: () => void
  className?: string
}
export default function EditCommentForm({
  className,
  comment,
  onClose,
}: Props) {
  const [body, setBody] = React.useState(comment.body)

  const [editComment] = useEditCommentMutation({
    onCompleted() {
      onClose()
    },
  })

  return (
    <CommentForm
      className={className}
      body={body}
      onChange={(data) => {
        setBody(data.body)
      }}
      onSubmit={() => {
        return editComment({
          variables: {
            input: {
              id: comment.id,
              postId: comment.postId,
              body,
            },
          },
        })
      }}
      onCancel={onClose}
    />
  )
}

EditCommentForm.fragments = {
  comment: gql`
    fragment EditCommentForm_comment on Comment {
      id
      postId
      body
    }
  `,
}

gql`
  mutation EditComment($input: EditCommentInput!) {
    editComment(input: $input) {
      ... on EditCommentSuccess {
        comment {
          id
          body
        }
      }
    }
  }
`
