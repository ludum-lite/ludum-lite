import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'

export type Color = Exclude<
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'white'
  | MuiButtonProps['color'],
  'inherit' | undefined
>

interface StyledButtonProps {
  variant: string
  customColor: Color
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: ignoreProps(['customColor']),
})<StyledButtonProps>`
  ${({ customColor, variant, theme }) => {
    const colors = theme.themeColors.button.level1?.[variant]?.[customColor]

    return css`
      color: ${colors?.color};
      background: ${colors?.background};
      border-color: ${colors?.borderColor};

      &:hover {
        background: ${colors?.hoverBackground};
      }
    `
  }}
`

interface Props {
  color?: Color
  variant?: MuiButtonProps['variant']
  loading?: Boolean
}
export type ButtonProps = Props & Omit<MuiButtonProps, keyof Props | 'color'>
const Button = React.forwardRef(
  (
    {
      color = 'default',
      variant = 'text',
      loading,
      disabled,
      children,
      onClick,
      ...others
    }: ButtonProps,
    ref
  ) => {
    return (
      <StyledButton
        innerRef={ref}
        customColor={color}
        variant={variant}
        endIcon={loading && <CircularProgress size={20} color="inherit" />}
        children={children}
        onClick={loading ? undefined : onClick}
        {...others}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
