import React from 'react'
import styled, { css } from 'styled-components/macro'

import Button from 'components/common/mui/Button'
import { ignoreProps } from 'utils'
import { ButtonProps } from '@material-ui/core'
import Icon from './mui/Icon'

interface StyledButtonProps {
  active: boolean
  activeColor: string
}
const StyledButton = styled(Button).withConfig({
  shouldForwardProp: ignoreProps(['active', 'activeColor']),
})<StyledButtonProps>`
  ${({ active, activeColor }) =>
    !active &&
    css`
      &:hover {
        color: ${activeColor};
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
  size: ButtonProps['size']
}
const RightIcon = styled.div.withConfig({
  shouldForwardProp: ignoreProps(['padRight', 'size']),
})<RightIconProps>`
  margin-right: ${({ theme, padRight }) => padRight && `${theme.spacing(1)}px`};
`

interface Props {
  color: string
  active?: boolean
  defaultIcon: React.FunctionComponent
  activeIcon: React.FunctionComponent
}
export default function ToggleButton({
  color,
  active = false,
  defaultIcon,
  activeIcon,
  children,
  onClick,
  size = 'medium',
  ...others
}: Props & Omit<ButtonProps, 'color'>) {
  const [isHovering, setIsHovering] = React.useState(false)

  const IconComponent = React.useMemo(() => {
    if (active) {
      if (isHovering) {
        return defaultIcon
      } else {
        return activeIcon
      }
    } else {
      if (isHovering) {
        return activeIcon
      } else {
        return defaultIcon
      }
    }
  }, [active, isHovering, defaultIcon, activeIcon])

  return (
    <StyledButton
      active={active}
      activeColor={color}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      size={size}
      onClick={(e) => {
        setIsHovering(false)

        if (onClick) {
          onClick(e)
        }
      }}
      {...others}
    >
      <RightIcon
        as={Icon}
        padRight={children !== null && children !== undefined}
        size={size}
        icon={IconComponent}
      />
      {children}
    </StyledButton>
  )
}

ToggleButton.displayName = 'ToggleButton'
