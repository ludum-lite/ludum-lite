import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import Comment from './Comment'
import { filter } from 'graphql-anywhere'
import {
  Comments_CommentFragment,
  Comments_PostFragment,
  Comment_PostFragmentDoc,
  Comment_CommentFragmentDoc,
} from '__generated__/client-types'
import Typography from 'components/common/mui/Typography'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

const NoCommentsMessage = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(5)}px;
`

interface Props {
  comments: Comments_CommentFragment[]
  post: Comments_PostFragment
}
export default function Comments({ comments, post }: Props) {
  if (comments.length) {
    return (
      <Root>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            post={filter(Comment_PostFragmentDoc, post)}
          />
        ))}
      </Root>
    )
  } else {
    return (
      <NoCommentsMessage>
        <Typography variant="body1">No comments yet</Typography>
      </NoCommentsMessage>
    )
  }
}

gql`
  fragment Comments_comment on Comment {
    ...Comment_comment
  }

  fragment Comments_post on Post {
    ...Comment_post
  }

  ${Comment_CommentFragmentDoc}
  ${Comment_PostFragmentDoc}
`
