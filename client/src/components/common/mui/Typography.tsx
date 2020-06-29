import React from 'react'
import { Typography as MuiTypography, TypographyProps } from '@material-ui/core'
import styled from 'styled-components/macro'

type TextColor = 'white' | 'whiteFaded'

const TEXT_COLOR_TO_RGBA: {
  [key in TextColor]: string
} = {
  white: 'white',
  whiteFaded: 'rgba(255, 255, 255, 0.75)',
}

interface StyledTypographyProps {
  textColor?: TextColor
}

const StyledTypography = styled(MuiTypography).withConfig({
  shouldForwardProp: (prop) => !['textColor'].includes(prop),
})<StyledTypographyProps>`
  color: ${({ textColor }) =>
    textColor ? TEXT_COLOR_TO_RGBA[textColor] : undefined};
`

interface Props {
  textColor?: TextColor
}

export default function Typography({
  textColor,
  ...other
}: Props & TypographyProps) {
  return <StyledTypography textColor={textColor} {...other} />
}
