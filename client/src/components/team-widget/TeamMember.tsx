import React from 'react'
import styled from 'styled-components/macro'

const Root = styled.div`
  display: flex;
`
const AvatarImg = styled.img`
  position: relative;
  border-radius: 50%;
  background: white;
  border: 2px solid white;
`

interface Props {
  avatarPath: string
  leader?: boolean
  className?: string
}
export default function TeamMember({ avatarPath, leader, className }: Props) {
  const size = leader ? 50 : 40

  return (
    <Root className={className}>
      <AvatarImg
        src={avatarPath}
        alt=""
        style={{ height: size, width: size }}
      />
    </Root>
  )
}
