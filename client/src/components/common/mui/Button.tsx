import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'

export type Background = 'level1' | 'level2' | 'level3'

export type Color = Exclude<
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | MuiButtonProps['color'],
  'inherit' | undefined
>

interface StyledButtonProps {
  background: Background
  isBreadcrumb: Boolean
  variant: string
  customColor: Color
}

/* ${({ theme, variant, customColor }) => {
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
    } else if (customColor === 'yellow') {
      return css`
        background: ${theme.themeColors.button.color.contained
          .yellowBackground};
        color: ${({ theme }) => theme.themeColors.textBlack};

        &:hover {
          background: ${theme.themeColors.button.color.contained
            .yellowHoverBackground};
        }
      `
    }
  } else if (variant === 'outlined') {
    if (customColor === 'success') {
      return css`
        color: ${theme.themeColors.button.color.outlined.successColor};
        border-color: ${theme.themeColors.button.color.outlined.successColor};

        &:hover {
          background: ${theme.themeColors.button.color.outlined
            .successHoverBackground};
        }
      `
    } else if (customColor === 'error') {
      return css`
        color: ${theme.themeColors.button.color.outlined.errorColor};
        border-color: ${theme.themeColors.button.color.outlined.errorColor};

        &:hover {
          background: ${theme.themeColors.button.color.outlined
            .errorHoverBackground};
        }
      `
    } else if (customColor === 'yellow') {
      return css`
        color: ${theme.themeColors.button.color.outlined.yellowColor};
        border-color: ${theme.themeColors.button.color.outlined.yellowColor};

        &:hover {
          background: ${theme.themeColors.button.color.outlined
            .yellowHoverBackground};
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
    } else if (customColor === 'yellow') {
      return css`
        color: ${theme.themeColors.button.color.text.yellowColor};

        &:hover {
          background: ${theme.themeColors.button.color.text
            .yellowHoverBackground};
        }
      `
    }
  }
}} */

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: ignoreProps(['background', 'isBreadcrumb', 'customColor']),
})<StyledButtonProps>`
  ${({ background, customColor, variant, theme }) => {
    const colors =
      theme.themeColors.button?.[background]?.[variant]?.[customColor]

    // if (variant === 'text') {
    //   hoverBackground = colors.text?.hoverBackground
    // } else if (color === 'default' && variant === 'contained') {
    //   hoverBackground = colors.contained?.hoverBackground
    // }

    return css`
      color: ${colors?.color};
      background: ${colors?.background};
      border-color: ${colors?.borderColor};

      &:hover {
        background: ${colors?.hoverBackground};
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
  color?: Color
  variant?: MuiButtonProps['variant']
  loading?: Boolean
  isBreadcrumb?: Boolean
}
export type ButtonProps = Props & Omit<MuiButtonProps, keyof Props | 'color'>
const Button = React.forwardRef(
  (
    {
      background = 'level1',
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
        background="level1"
        customColor={color}
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
