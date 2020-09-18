import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'

export type Background = 'globalNav' | 'contextualNav' | 'page' | 'white'

interface StyledButtonProps {
  background: Background
  isBreadcrumb: Boolean
  customColor?: 'success' | 'error'
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: ignoreProps(['background', 'isBreadcrumb', 'customColor']),
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

  ${({ theme, variant, customColor }) => {
    if (variant === 'contained') {
      if (customColor === 'success') {
        return css`
          background: ${theme.themeColors.button.color.contained
            .successBackground};
          color: white;

          &:hover {
            background: ${theme.themeColors.button.color.contained
              .successHoverBackground};
          }
        `
      } else if (customColor === 'error') {
        return css`
          background: ${theme.themeColors.button.color.contained
            .errorBackground};
          color: white;

          &:hover {
            background: ${theme.themeColors.button.color.contained
              .errorHoverBackground};
          }
        `
      }
    } else if (variant === 'text') {
      if (customColor === 'success') {
        return css`
          color: ${theme.themeColors.button.color.text.successColor};

          &:hover {
            background: ${theme.themeColors.button.color.text
              .successHoverBackground};
          }
        `
      } else if (customColor === 'error') {
        return css`
          color: ${theme.themeColors.button.color.text.errorColor};

          &:hover {
            background: ${theme.themeColors.button.color.text
              .errorHoverBackground};
          }
        `
      }
    }
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
  customColor?: 'success' | 'error'
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
      customColor,
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
        customColor={customColor}
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
