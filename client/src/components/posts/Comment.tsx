import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import * as Types from '__generated__/Types'
import Markdown from 'components/common/Markdown'
import UserPostedHeader from './UserPostedHeader'
import CommentLoveButton from './comment-buttons/CommentLoveButton'
import { filter } from 'graphql-anywhere'

const Root = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(1)}px;
  box-shadow: ${({ theme }) => theme.themeColors.comment.boxShadow};

  &:nth-child(even) {
    background: ${({ theme }) => theme.themeColors.comment.evenBackground};
  }

  &:nth-child(odd) {
    background: ${({ theme }) => theme.themeColors.comment.oddBackground};
  }
`

const TitleRow = styled.div`
  display: flex;
`

const Body = styled.div``

const ActionRow = styled.div`
  display: flex;
`

interface Props {
  comment: Types.Comment_comment
  post: Types.Comment_post
  className?: string
}
export default function Comment({ comment, post, className }: Props) {
  console.log(comment)
  if (!comment) return null

  return (
    <Root className={className}>
      <TitleRow>
        <UserPostedHeader
          userProfilePath={comment.author?.profilePath}
          userAvatarPath={comment.author?.avatarPath}
          userName={comment.author?.name}
          postedDate={comment.createdDate}
        />
      </TitleRow>
      <Body>
        <Markdown source={comment.body} />
      </Body>
      <ActionRow>
        <CommentLoveButton
          comment={filter(CommentLoveButton.fragments.comment, comment)}
          post={filter(CommentLoveButton.fragments.post, post)}
        />
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
      createdDate
      author {
        id
        avatarPath
        profilePath
        name
      }
      ...CommentLoveButton_comment
    }
    ${CommentLoveButton.fragments.comment}
  `,
  post: gql`
    fragment Comment_post on Post {
      ...CommentLoveButton_post
    }
    ${CommentLoveButton.fragments.post}
  `,
}
