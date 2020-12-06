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
  variant: string
  customColor: Color
}

const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: ignoreProps(['background', 'customColor']),
})<StyledButtonProps>`
  ${({ background, customColor, variant, theme }) => {
    const colors =
      theme.themeColors.button?.[background]?.[variant]?.[customColor]

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
  background?: Background
  color?: Color
  variant?: MuiButtonProps['variant']
  loading?: Boolean
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
        {...others}
      />
    )
  }
)

export default Button
