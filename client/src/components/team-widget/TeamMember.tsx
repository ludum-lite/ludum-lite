import React from 'react'
import styled from 'styled-components/macro'
import Avatar from 'components/posts/Avatar'

const Root = styled.div`
  display: flex;
  position: relative;
`

interface Props {
  avatarPath?: string | null
  leader?: boolean
  onClick?: () => void
  className?: string
}
export default React.forwardRef<HTMLDivElement, Props>(
  ({ avatarPath, leader, className, ...others }, ref) => {
    const size = leader ? 50 : 40

    return (
      <Root className={className} {...others} ref={ref}>
        <Avatar
          avatarPath={avatarPath}
          size={size}
          defaultToProfileImage
          circle
          border
        />
      </Root>
    )
  }
)
