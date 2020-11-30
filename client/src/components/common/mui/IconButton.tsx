import React from 'react'
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'
import { Background, Color } from './Button'

type Variant = 'text' | 'contained'

interface StyledButtonProps {
  background: Background
  customColor: Color
  variant: Variant
}

const StyledIconButton = styled(MuiIconButton).withConfig({
  shouldForwardProp: ignoreProps(['variant']),
})<StyledButtonProps>`
  ${({ customColor, variant, theme }) => {
    const colors = theme.themeColors.button.level1?.[variant]?.[customColor]

    return css`
      color: ${colors?.color};
      background: ${colors?.background};
      border-color: ${colors?.borderColor};

      &.MuiIconButton-root:hover {
        background: ${colors?.hoverBackground};
      }
    `
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
  color?: Color
  variant?: Variant
}
export type IconButtonProps = Props &
  Omit<MuiIconButtonProps, keyof Props | 'color'>
const IconButton = React.forwardRef(
  (
    {
      background = 'level1',
      color = 'default',
      variant = 'text',
      ...others
    }: IconButtonProps,
    ref
  ) => {
    return (
      <StyledIconButton
        innerRef={ref}
        variant={variant}
        customColor={color}
        background={background}
        {...others}
      />
    )
  }
)

export default IconButton
