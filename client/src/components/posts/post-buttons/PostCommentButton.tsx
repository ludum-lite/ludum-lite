import React from 'react'
import { useTheme } from 'styled-components/macro'
import { gql } from '@apollo/client'

import CommentIcon from '@material-ui/icons/ModeComment'
import CommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import ToggleButton from 'components/common/ToggleButton'
import { PostCommentButton_PostFragment } from '__generated__/client-types'

interface Props {
  post: PostCommentButton_PostFragment
}
export default function PostCommentButon({ post }: Props) {
  const theme = useTheme()

  return (
    <ToggleButton
      activeIcon={CommentIcon}
      defaultIcon={CommentOutlinedIcon}
      color={theme.themeColors.loveButton.activeColor}
      size="small"
    >
      {post.numNotes}
    </ToggleButton>
  )
}

PostCommentButon.fragments = {
  post: gql`
    fragment PostCommentButton_post on Post {
      id
      numNotes
    }
  `,
}
