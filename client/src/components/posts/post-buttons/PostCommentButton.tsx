import React from 'react'
import { useTheme } from 'styled-components/macro'
import { gql } from '@apollo/client'
import * as Types from '__generated__/Types'

import CommentIcon from '@material-ui/icons/ModeComment'
import CommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import ToggleButton from 'components/common/ToggleButton'

interface Props {
  post: Types.PostCommentButton_post
}
export default function PostCommentButon({ post }: Props) {
  const theme = useTheme()

  return (
    <ToggleButton
      activeIcon={CommentIcon}
      defaultIcon={CommentOutlinedIcon}
      color={theme.themeColors.loveButton.activeColor}
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
