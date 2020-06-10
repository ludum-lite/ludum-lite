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

export interface Props {
  background?: Background
}
export default function IconButton({
  background = 'white',
  ...others
}: Props & Omit<IconButtonProps, keyof Props>) {
  return <StyledIconButton background={background} {...others} />
}
