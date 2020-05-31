import React from 'react'

import { gql, useMutation } from '@apollo/client'
import * as Types from '__generated__/Types'
import CommentForm from './CommentForm'

interface Props {
  comment: Types.EditCommentForm_comment
  onClose: () => void
  className?: string
}
export default function EditCommentForm({
  className,
  comment,
  onClose,
}: Props) {
  const [body, setBody] = React.useState(comment.body)

  const [editComment] = useMutation<
    Types.EditComment,
    Types.EditCommentVariables
  >(EDIT_COMMENT, {
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

const EDIT_COMMENT = gql`
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
