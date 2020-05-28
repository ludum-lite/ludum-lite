import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const AvatarLink = styled(Link)`
  display: flex;
`
const AvatarImg = styled.img`
  border-radius: 4px;
`

interface Props {
  linkPath: string
  avatarPath?: string
  size: number
  className?: string
}
export default function Avatar({
  linkPath,
  avatarPath,
  size,
  className,
}: Props) {
  return (
    <AvatarLink className={className} to={linkPath}>
      <AvatarImg
        src={avatarPath}
        alt=""
        style={{ height: size, width: size }}
      />
    </AvatarLink>
  )
}
