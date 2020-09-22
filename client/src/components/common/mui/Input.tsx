import React from 'react'
import {
  FilledInput as MuiFillInput,
  FilledInputProps,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'

type Background = 'transparent' | null
type Color = 'black' | 'white'

interface StyledInputProps {
  background: Background
  textColor: Color
  // Used with a transparent background to align the edge of text with where it would have been
  flushLeftEdge?: boolean
}

const StyledInput = styled(MuiFillInput).withConfig({
  shouldForwardProp: ignoreProps(['background', 'textColor', 'flushLeftEdge']),
})<StyledInputProps>`
  ${({ background }) =>
    background === 'transparent' &&
    css`
      box-shadow: none;
      background: transparent;
      border-color: transparent;
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
      margin-left: -12px;
    `}
`

interface InputProps {
  background?: Background
  textColor?: Color
  flushLeftEdge?: boolean
  ref?: React.RefObject<HTMLInputElement>
}

export type Props = InputProps & FilledInputProps

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    { background = null, textColor = 'black', flushLeftEdge, ...other },
    ref
  ) => {
    return (
      <StyledInput
        inputRef={ref}
        background={background}
        textColor={textColor}
        flushLeftEdge={flushLeftEdge}
        {...other}
      />
    )
  }
)

export default Input
