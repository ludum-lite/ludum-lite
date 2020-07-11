import React from 'react'
import {
  FilledInput as MuiFillInput,
  FilledInputProps,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

type Background = 'transparent' | null
type Color = 'black' | 'white'

interface StyledInputProps {
  background: Background
  textColor: Color
  // Used with a transparent background to align the edge of text with where it would have been
  flushLeftEdge?: boolean
}

const StyledInput = styled(MuiFillInput).withConfig({
  shouldForwardProp: (prop) =>
    !['background', 'textColor', 'flushLeftEdge'].includes(prop),
})<StyledInputProps>`
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.03);
  padding-left: 6px;

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
      margin-left: -7px;
    `}
`

interface MoreProps {
  background?: Background
  textColor?: Color
  flushLeftEdge?: boolean
  ref?: React.RefObject<HTMLInputElement>
}

export type Props = MoreProps & FilledInputProps

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
