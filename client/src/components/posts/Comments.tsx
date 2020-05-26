import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import * as Types from '__generated__/Types'
import Comment from './Comment'

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
  comments: Types.Comments_comment[]
}
export default function Comments({ comments }: Props) {
  return (
    <Root>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
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
}
