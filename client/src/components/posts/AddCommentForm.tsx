import React from 'react'

import { gql } from '@apollo/client'
import CommentForm from './CommentForm'
import {
  useAddCommentMutation,
  AddCommentForm_PostFragment,
  AddCommentForm_PostFragmentDoc,
} from '__generated__/client-types'

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
    update(store, { data }) {
      const postCacheKey = `Post:${postId}`

      if (data?.addComment.__typename === 'AddCommentSuccess') {
        const comment = data.addComment.comment

        const readData = store.readFragment<AddCommentForm_PostFragment>({
          id: postCacheKey,
          fragment: AddCommentForm_PostFragmentDoc,
        })

        store.writeFragment({
          id: postCacheKey,
          fragment: AddCommentForm_PostFragmentDoc,
          data: {
            id: postId,
            comments: [...(readData?.comments || []), comment],
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
    />
  )
}

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
