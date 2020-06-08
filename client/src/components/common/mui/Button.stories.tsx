import React from 'react'
import styled from 'styled-components/macro'
import Button, { Background } from './Button'
import ToggleButton from './ToggleButton'
import { ButtonProps } from '@material-ui/core/Button'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Typography } from '@material-ui/core'

export default {
  title: 'Button',
  component: Button,
}
type NonNullable<T> = Exclude<T, null | undefined>

const BasicRoot = styled.div`
  display: flex;
  flex-direction: column;
`

const Backgrounds = styled.div`
  display: flex;

  & > * {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(2)}px;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

const GlobalNavBackground = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.globalNavBackground};
`

const ContexualNavBackground = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
`

const PageBackground = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.background};
`

const WhiteBackground = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.post.backgroundColor};
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  background: ${({ theme }) => theme.themeColors.popupPage.background};
`

const VARIANTS = ['text', 'outlined', 'contained'] as const
const COLORS = ['default', 'primary', 'secondary'] as const

type PropCombination = {
  [key in Background]?: {
    [key in NonNullable<ButtonProps['variant']>]?: {
      [key in NonNullable<Exclude<ButtonProps['color'], 'inherit'>>]?: boolean
    }
  }
}
const INVALID_COMBINATIONS: PropCombination = {
  globalNav: {
    text: {
      primary: true,
      secondary: true,
    },
    outlined: {
      primary: true,
      secondary: true,
    },
  },
  contextualNav: {
    text: {
      primary: true,
    },
    outlined: {
      default: true,
      primary: true,
      secondary: true,
    },
    contained: {
      default: true,
    },
  },
  page: {
    text: {
      primary: true,
      secondary: true,
    },
    outlined: {
      secondary: true,
      primary: true,
    },
  },
  white: {
    text: {
      primary: true,
    },
    outlined: {
      primary: true,
    },
  },
}

function renderButtons(background: Background, size: ButtonProps['size']) {
  return VARIANTS.map((variant) =>
    COLORS.map((color) => (
      <Button
        key={`${variant}_${color}`}
        variant={variant}
        color={color}
        background={background}
        size={size}
        style={{
          visibility:
            INVALID_COMBINATIONS[background]?.[variant]?.[color] === true
              ? 'hidden'
              : 'visible',
        }}
      >
        {variant} + {color}
      </Button>
    ))
  )
}

export const Basic = () => {
  const [size, setSize] = React.useState<ButtonProps['size']>('medium')

  return (
    <BasicRoot>
      <Options>
        <Typography>Padding</Typography>
        <ToggleButtonGroup
          value={size}
          exclusive
          onChange={(e, newPadding) => {
            if (newPadding) {
              setSize(newPadding)
            }
          }}
          aria-label="text alignment"
        >
          <ToggleButton value="small" aria-label="left aligned" padding="text">
            Small
          </ToggleButton>
          <ToggleButton value="medium" aria-label="centered" padding="text">
            Medium
          </ToggleButton>
          <ToggleButton
            value="large"
            aria-label="right aligned"
            padding="text"
            disabled
          >
            Large
          </ToggleButton>
        </ToggleButtonGroup>
      </Options>
      <Backgrounds>
        <GlobalNavBackground>
          {renderButtons('globalNav', size)}
        </GlobalNavBackground>
        <ContexualNavBackground>
          {renderButtons('contextualNav', size)}
        </ContexualNavBackground>
        <PageBackground>{renderButtons('page', size)}</PageBackground>
        <WhiteBackground>{renderButtons('white', size)}</WhiteBackground>
      </Backgrounds>
    </BasicRoot>
  )
}
