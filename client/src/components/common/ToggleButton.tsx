import React from 'react'
import styled, { css } from 'styled-components/macro'

import Button from 'components/common/mui/Button'
import { ignoreProps } from 'utils'
import { ButtonProps } from '@material-ui/core'

interface StyledButtonProps {
  active: boolean
  activeColor: string
}
const StyledButton = styled(Button).withConfig({
  shouldForwardProp: ignoreProps(['active', 'activeColor']),
})<StyledButtonProps>`
  font-size: 1rem;

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
const RightIcon = styled.div.withConfig({
  shouldForwardProp: ignoreProps(['padRight']),
})<RightIconProps>`
  margin-right: ${({ theme, padRight }) => padRight && theme.spacing(1)}px;
  font-size: 1.25rem;
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
      size="small"
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
