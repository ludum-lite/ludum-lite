import React from 'react'
import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

export type Background = 'globalNav' | 'contextualNav' | 'page' | 'white'

interface StyledButtonProps {
  background: Background
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: (prop) => !['background'].includes(prop),
})<StyledButtonProps>`
  ${({ background, color, variant, theme }) => {
    const colors = theme.themeColors.button.background[background]

    let hoverBackground: string | undefined

    if (variant === 'text') {
      hoverBackground = colors.text?.hoverBackground
    } else if (color === 'default' && variant === 'contained') {
      hoverBackground = colors.contained?.hoverBackground
    }

    return css`
      color: ${color === 'default' && colors.color};

      &:hover {
        background: ${hoverBackground};
      }
    `
  }}
`

export interface Props {
  background?: Background
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  loading?: Boolean
}
export default function Button({
  background = 'white',
  color = 'default',
  variant = 'text',
  loading,
  disabled,
  children,
  onClick,
  ...others
}: Props & Omit<ButtonProps, keyof Props>) {
  return (
    <StyledButton
      background={background}
      color={color}
      variant={variant}
      endIcon={loading && <CircularProgress />}
      children={loading ? 'Loading' : children}
      onClick={loading ? undefined : onClick}
      {...others}
    />
  )
}
