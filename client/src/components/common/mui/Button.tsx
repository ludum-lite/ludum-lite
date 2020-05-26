import React from 'react'
import { Button as MuiButton, ButtonProps } from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

type Padding = 'wide'

interface StyledButtonProps {
  border?: boolean
  noShadow?: boolean
  padding?: Padding
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: (prop) => !['border', 'noShadow'].includes(prop),
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

  ${({ padding }) =>
    padding === 'wide' &&
    css`
      padding: 0.375rem 1rem;
    `}
`

export interface Props {
  border?: boolean
  noShadow?: boolean
  padding?: Padding
}
export default function Button({
  border,
  noShadow,
  padding,
  ...other
}: Props & Omit<ButtonProps, keyof Props>) {
  return (
    <StyledButton
      border={border}
      noShadow={noShadow}
      padding={padding}
      {...other}
    />
  )
}
