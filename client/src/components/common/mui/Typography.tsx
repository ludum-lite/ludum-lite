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
  bold?: boolean
}

const StyledTypography = styled(MuiTypography).withConfig({
  shouldForwardProp: (prop) => !['textColor', 'bold'].includes(prop),
})<StyledTypographyProps>`
  color: ${({ textColor }) =>
    textColor ? TEXT_COLOR_TO_RGBA[textColor] : undefined};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
`

interface Props {
  textColor?: TextColor
  bold?: boolean
}

export default function Typography({
  textColor,
  ...other
}: Props & TypographyProps) {
  return <StyledTypography textColor={textColor} {...other} />
}
