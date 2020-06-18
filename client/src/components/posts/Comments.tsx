import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import Comment from './Comment'
import { filter } from 'graphql-anywhere'
import {
  Comments_CommentFragment,
  Comments_PostFragment,
} from '__generated__/client-types'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

interface Props {
  comments: Comments_CommentFragment[]
  post: Comments_PostFragment
}
export default function Comments({ comments, post }: Props) {
  return (
    <Root>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          post={filter(Comment.fragments.post, post)}
        />
      ))}
    </Root>
  )
}

Comments.fragments = {
  comment: gql`
    fragment Comments_comment on Comment {
      ...Comment_comment
    }

    ${Comment.fragments.comment}
  `,
  post: gql`
    fragment Comments_post on Post {
      ...Comment_post
    }
    ${Comment.fragments.post}
  `,
}
