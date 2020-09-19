import React from 'react'
import { IconButton as MuiIconButton, IconButtonProps } from '@material-ui/core'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'

export type Background = 'globalNav' | 'contextualNav' | 'page' | 'white'

interface StyledButtonProps {
  background: Background
  color: IconButtonProps['color']
  variant: 'default' | 'contained'
}

const StyledIconButton = styled(MuiIconButton).withConfig({
  shouldForwardProp: ignoreProps(['background', 'variant']),
})<StyledButtonProps>`
  ${({ background, color, theme }) => {
    const colors = theme.themeColors.button.background[background]

    return css`
      color: ${(!color || color === 'default') && colors.color};

      &.MuiIconButton-root:hover {
        background: ${colors.text?.hoverBackground};
      }
    `
  }}

  ${({ variant, color, theme }) => {
    if (variant === 'contained' && color === 'default') {
      return css`
        color: white;

        &.MuiIconButton-root {
          background: ${theme.themeColors.defaultIconBlack};

          &:hover {
            background: ${theme.themeColors.fadedBlack};
          }
        }
      `
    }
  }}
`

/**
 * Note: the `component` prop doesn't work correctly with typing so you'll need to @ts-ignore
 * props from the new component when using `component`. Eg:
 * <IconButton
 *   component={Link}
 *   // @ts-ignore
 *   to="somewhere"
 * >...</IconButton>
 */

export interface Props {
  background?: Background
  component?: React.ElementType
  color?: IconButtonProps['color']
  variant?: 'default' | 'contained'
}
const IconButton = React.forwardRef<
  HTMLButtonElement,
  Props & Omit<IconButtonProps, keyof Props>
>(
  (
    { background = 'white', variant = 'default', color = 'default', ...others },
    ref
  ) => {
    return (
      <StyledIconButton
        ref={ref}
        background={background}
        variant={variant}
        color={color}
        {...others}
      />
    )
  }
)

export default IconButton
