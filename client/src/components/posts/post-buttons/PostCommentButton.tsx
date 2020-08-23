import React from 'react'
import { useTheme } from 'styled-components/macro'
import { gql } from '@apollo/client'

import CommentIcon from '@material-ui/icons/ModeComment'
import CommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import ToggleButton from 'components/common/ToggleButton'
import { PostCommentButton_PostFragment } from '__generated__/client-types'
import { Background } from 'components/common/mui/Button'

interface Props {
  post: PostCommentButton_PostFragment
  background: Background
}
export default function PostCommentButon({ post, background }: Props) {
  const theme = useTheme()

  return (
    <ToggleButton
      activeIcon={CommentIcon}
      defaultIcon={CommentOutlinedIcon}
      color={theme.themeColors.loveButton.activeColor}
      size="small"
      background={background}
    >
      {post.numNotes}
    </ToggleButton>
  )
}

gql`
  fragment PostCommentButton_post on Post {
    id
    numNotes
  }
`
