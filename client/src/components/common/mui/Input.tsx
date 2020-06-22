import React from 'react'
import { Input as MuiInput, InputProps } from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

type Background = 'transparent' | null
type Color = 'black' | 'white'

interface StyledInputProps {
  background: Background
  textColor: Color
  // Used with a transparent background to align the edge of text with where it would have been
  flushLeftEdge?: boolean
}

const StyledInput = styled(MuiInput).withConfig({
  shouldForwardProp: (prop) =>
    !['background', 'textColor', 'flushLeftEdge'].includes(prop),
})<StyledInputProps>`
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.03);

  ${({ background }) =>
    background === 'transparent' &&
    css`
      box-shadow: none;
      background: transparent;
      border-color: transparent;
      padding-left: 6px;
    `}

  ${({ textColor, background }) =>
    textColor === 'white' &&
    background === 'transparent' &&
    css`
      color: ${({ theme }) => theme.themeColors.fadedWhite};

      .MuiInputBase-input::placeholder {
        color: ${({ theme }) => theme.themeColors.fadedWhite};
      }

      &:hover .MuiInputBase-input {
        color: ${({ theme }) => theme.palette.text.primary};

        &::placeholder {
          color: ${({ theme }) => theme.themeColors.fadedBlack};
        }
      }

      .MuiInputBase-input:focus {
        color: ${({ theme }) => theme.palette.text.primary};

        &::placeholder {
          color: ${({ theme }) => theme.themeColors.fadedBlack};
        }
      }
    `}

  ${({ flushLeftEdge }) =>
    flushLeftEdge &&
    css`
      margin-left: -7px;
    `}
`

interface Props {
  background?: Background
  textColor?: Color
  flushLeftEdge?: boolean
}

const Input: React.FC<Props & InputProps> = ({
  background = null,
  textColor = 'black',
  flushLeftEdge,
  ...other
}) => {
  return (
    <StyledInput
      background={background}
      textColor={textColor}
      flushLeftEdge={flushLeftEdge}
      {...other}
    />
  )
}

export default Input
