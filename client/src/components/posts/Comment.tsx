import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import * as Types from '__generated__/Types'
import Markdown from 'components/common/Markdown'
import Button from 'components/common/mui/Button'

const Root = styled.div``

const TitleRow = styled.div`
  display: flex;
`

const Body = styled.div``

const ActionRow = styled.div`
  display: flex;
`

interface Props {
  comment: Types.Comment_comment
}
export default function Comment({ comment }: Props) {
  return (
    <Root>
      <TitleRow>{comment.id}</TitleRow>
      <Body>
        <Markdown source={comment.body} />
      </Body>
      <ActionRow>
        <Button>{comment.numLove}</Button>
      </ActionRow>
    </Root>
  )
}

Comment.fragments = {
  comment: gql`
    fragment Comment_comment on Comment {
      id
      body
      numLove
    }
  `,
}
