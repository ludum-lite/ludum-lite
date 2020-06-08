import React from 'react'
import { Button as MuiButton, ButtonProps } from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

export type Background = 'globalNav' | 'contextualNav' | 'page' | 'white'

interface StyledButtonProps {
  border?: boolean
  noShadow?: boolean
  background: Background
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: (prop) =>
    !['border', 'noShadow', 'background'].includes(prop),
})<StyledButtonProps>`
  ${({ background, color, theme }) => {
    const colors = theme.themeColors.button.background[background]

    return css`
      color: ${color === 'default' && colors.color};

      &.MuiButton-text:hover {
        background: ${colors.text?.hoverBackground};
      }

      &.MuiButton-contained:hover {
        background: ${color === 'default' && colors.contained?.hoverBackground};
      }
    `
  }}

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
  background?: Background
}
export default function Button({
  border,
  noShadow,
  background = 'white',
  ...other
}: Props & Omit<ButtonProps, keyof Props>) {
  return (
    <StyledButton
      border={border}
      noShadow={noShadow}
      background={background}
      {...other}
    />
  )
}
