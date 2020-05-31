import React from 'react'

import { gql, useMutation } from '@apollo/client'
import * as Types from '__generated__/Types'
import CommentForm from './CommentForm'

interface Props {
  postId: number
  className?: string
}
export default function AddCommentForm({ className, postId }: Props) {
  const [body, setBody] = React.useState('')

  const [addComment] = useMutation<Types.AddComment, Types.AddCommentVariables>(
    ADD_COMMENT,
    {
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

          const readData = store.readFragment<Types.AddCommentForm_post>({
            id: postCacheKey,
            fragment: ADD_COMMENT_POST_FRAGMENT,
          })

          store.writeFragment({
            id: postCacheKey,
            fragment: ADD_COMMENT_POST_FRAGMENT,
            data: {
              id: postId,
              comments: [...(readData?.comments || []), comment],
            },
          })
        }
      },
    }
  )

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

const ADD_COMMENT = gql`
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

const ADD_COMMENT_POST_FRAGMENT = gql`
  fragment AddCommentForm_post on Post {
    id
    comments {
      id
    }
  }
`
