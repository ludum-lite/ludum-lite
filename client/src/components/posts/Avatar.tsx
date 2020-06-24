import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Link } from 'react-router-dom'

const DEFAULT_IMAGE =
  'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'

const AvatarLink = styled(Link)`
  display: flex;
`

interface AvatarImgProps {
  circle?: boolean
  border?: boolean
}
const AvatarImg = styled.img<AvatarImgProps>`
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);

  ${({ circle }) =>
    circle &&
    css`
      border-radius: 50%;
    `}

  ${({ border }) =>
    border &&
    css`
      border: 2px solid white;
      background: white;
    `}
`

interface Props {
  linkPath?: string
  avatarPath?: string | null
  size: number
  className?: string
  circle?: boolean
  defaultToProfileImage?: boolean
  border?: boolean
}
export default function Avatar({
  linkPath,
  avatarPath,
  size,
  className,
  circle,
  defaultToProfileImage,
  border,
}: Props) {
  return (
    <AvatarLink className={className} to={linkPath || ''}>
      <AvatarImg
        src={avatarPath || (defaultToProfileImage ? DEFAULT_IMAGE : '')}
        alt=""
        style={{ height: size, width: size }}
        circle={circle}
        border={border}
      />
    </AvatarLink>
  )
}
