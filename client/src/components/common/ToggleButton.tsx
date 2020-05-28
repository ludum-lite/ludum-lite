import React from 'react'
import styled, { css } from 'styled-components/macro'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import Button from 'components/common/mui/Button'
import { ignoreProps } from 'utils'
import { ButtonProps } from '@material-ui/core'

interface StyledButtonProps {
  active: boolean
  activeColor: string
}
const StyledButton = styled(Button).withConfig({
  shouldForwardProp: ignoreProps(['active', 'color']),
})<StyledButtonProps>`
  font-size: 1rem;
  padding: 6px 1rem;

  ${({ active, activeColor }) =>
    !active &&
    css`
      &:hover {
        color: ${activeColor};
        background-color: ${({ theme }) => theme.buttonRootBackgroundColor};
      }
    `}

  ${({ active, activeColor }) =>
    active &&
    css`
      background-color: ${activeColor};
      color: white;

      &:hover {
        background-color: ${activeColor};
      }
    `}
`

interface RightIconProps {
  padRight: boolean
}
const RightIcon = styled.div<RightIconProps>`
  margin-right: ${({ theme, padRight }) => padRight && theme.spacing(1)}px;
  font-size: 1.25rem;
`

interface Props {
  color: string
  active: boolean
  defaultIcon: React.ReactNode
  activeIcon: React.ReactNode
}
export default function ToggleButton({
  color,
  active,
  defaultIcon,
  activeIcon,
  children,
  onClick,
  ...others
}: Props & Omit<ButtonProps, 'color'>) {
  const [isHovering, setIsHovering] = React.useState(false)

  const IconComponent = React.useMemo(() => {
    if (active) {
      if (isHovering) {
        return FavoriteBorderIcon
      } else {
        return FavoriteIcon
      }
    } else {
      if (isHovering) {
        return FavoriteIcon
      } else {
        return FavoriteBorderIcon
      }
    }
  }, [active, isHovering])

  return (
    <StyledButton
      active={active}
      activeColor={color}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={(e) => {
        setIsHovering(false)

        if (onClick) {
          onClick(e)
        }
      }}
      {...others}
    >
      <RightIcon
        as={IconComponent}
        padRight={children !== null && children !== undefined}
      />
      {children}
    </StyledButton>
  )
}
