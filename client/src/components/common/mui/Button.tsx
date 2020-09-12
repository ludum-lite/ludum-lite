import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

export type Background = 'globalNav' | 'contextualNav' | 'page' | 'white'

interface StyledButtonProps {
  background: Background
  isBreadcrumb: Boolean
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: (prop) => !['background', 'isBreadcrumb'].includes(prop),
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

  ${({ isBreadcrumb }) =>
    isBreadcrumb &&
    css`
      padding: 3px 12px;
      min-width: 0;
    `}
`

interface Props {
  background?: Background
  color?: MuiButtonProps['color']
  variant?: MuiButtonProps['variant']
  loading?: Boolean
  isBreadcrumb?: Boolean
}
export type ButtonProps = Props & Omit<MuiButtonProps, keyof Props>
const Button = React.forwardRef(
  (
    {
      background = 'white',
      color = 'default',
      variant = 'text',
      loading,
      disabled,
      children,
      onClick,
      isBreadcrumb = false,
      ...others
    }: ButtonProps,
    ref
  ) => {
    return (
      <StyledButton
        innerRef={ref}
        background={background}
        color={color}
        variant={variant}
        endIcon={loading && <CircularProgress size={20} color="inherit" />}
        children={children}
        onClick={loading ? undefined : onClick}
        isBreadcrumb={isBreadcrumb}
        {...others}
      />
    )
  }
)

export default Button
