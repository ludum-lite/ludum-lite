import React from 'react'
import { IconButton as MuiIconButton, IconButtonProps } from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

export type Background = 'globalNav' | 'contextualNav' | 'page' | 'white'

interface StyledButtonProps {
  background: Background
}

const StyledIconButton = styled(MuiIconButton).withConfig({
  shouldForwardProp: (prop) => !['background'].includes(prop),
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
}
const IconButton = React.forwardRef<
  HTMLButtonElement,
  Props & Omit<IconButtonProps, keyof Props>
>(({ background = 'white', ...others }, ref) => {
  return <StyledIconButton ref={ref} background={background} {...others} />
})

export default IconButton
