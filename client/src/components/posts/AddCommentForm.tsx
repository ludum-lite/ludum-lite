import React from 'react'

import { gql } from '@apollo/client'
import CommentForm from './CommentForm'
import { useAddCommentMutation } from '__generated__/client-types'

interface Props {
  postId: number
  className?: string
}
export default function AddCommentForm({ className, postId }: Props) {
  const [body, setBody] = React.useState('')

  const [addComment] = useAddCommentMutation({
    variables: {
      input: {
        body,
        postId,
      },
    },
    onCompleted() {
      setBody('')
    },
    update(cache, { data }) {
      if (data?.addComment.__typename === 'AddCommentSuccess') {
        const comment = data.addComment.comment

        cache.modify({
          id: `Post:${postId}`,
          fields: {
            comments(cachedComments) {
              return [...(cachedComments || []), comment]
            },
          },
        })
      }
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
        return addComment({
          variables: {
            input: {
              postId,
              body,
            },
          },
        })
      }}
      onCancel={() => {
        setBody('')
      }}
    />
  )
}

AddCommentForm.displayName = 'AddCommentForm'

gql`
  fragment AddCommentForm_post on Post {
    id
    comments {
      id
    }
  }

  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      ... on AddCommentSuccess {
        comment {
          id
          postId
          body
        }
      }
    }
  }
`
