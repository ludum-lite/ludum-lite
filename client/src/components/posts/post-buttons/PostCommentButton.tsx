import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import * as Types from '__generated__/Types'

import CommentIcon from '@material-ui/icons/ModeComment'
import CommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import Button from 'components/common/mui/Button'

const StyledButton = styled(Button)`
  font-size: 1.6rem;
  line-height: 1.4rem;

  &:hover {
    color: ${({ theme }) => theme.themeColors.commentsButton.activeColor};
    background-color: ${({ theme }) => theme.buttonRootBackgroundColor};
  }
`

const RightIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  font-size: 2rem;
`

interface Props {
  post: Types.PostCommentButton_post
}
export default function PostCommentButon({ post }: Props) {
  const [isHovering, setIsHovering] = React.useState(false)

  const IconComponent = React.useMemo(() => {
    if (isHovering) {
      return CommentIcon
    } else {
      return CommentOutlinedIcon
    }
  }, [isHovering])

  return (
    <StyledButton
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={(e) => {
        setIsHovering(false)
      }}
    >
      <RightIcon as={IconComponent} />
      {post.numNotes}
    </StyledButton>
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
