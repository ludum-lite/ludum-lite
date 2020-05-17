import React from 'react'
import { Button as MuiButton, ButtonProps } from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

interface StyledButtonProps {
  border?: boolean
  noShadow?: boolean
  active?: boolean
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: (prop) => !['border', 'noShadow', 'active'].includes(prop),
})<StyledButtonProps>`
  ${({ border }) =>
    border &&
    css`
      box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.14) inset;
      &:hover: {
        box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.3) inset;
      }
    `}

  ${({ noShadow }) =>
    noShadow &&
    css`
      box-shadow: 0 0 0 1px #00000017;
    `}
`

export interface Props {
  border?: boolean
  noShadow?: boolean
  active?: boolean
}
export default function Button({
  border,
  noShadow,
  active,
  ...other
}: Props & Omit<ButtonProps, keyof Props>) {
  return (
    <StyledButton
      border={border}
      noShadow={noShadow}
      active={active}
      {...other}
    />
  )
}
