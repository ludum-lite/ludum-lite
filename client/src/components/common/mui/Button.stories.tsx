import React from 'react'
import styled from 'styled-components/macro'
import Button from './Button'
import ToggleButton from './ToggleButton'
import { ButtonProps } from '@material-ui/core/Button'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Typography } from '@material-ui/core'
import Panel from 'components/storybook/Panel'

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

const Level1Background = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const Level2Background = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.backgrounds.level2};
`

const Level3Background = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.backgrounds.level3};
`

const PrimaryBackground = styled(ButtonContainer)`
  background: ${({ theme }) => theme.themeColors.palette.primary.main};
`

const Options = styled(Panel)``

const VARIANTS = ['text', 'outlined', 'contained'] as const
const COLORS = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'white',
] as const

type PropCombination = {
  [key in NonNullable<ButtonProps['variant']>]?: {
    [key in NonNullable<
      Exclude<ButtonProps['color'], 'inherit'> | 'success' | 'error' | 'white'
    >]?: boolean
  }
}
const INVALID_COMBINATIONS: PropCombination = {
  // globalNav: {
  //   text: {
  //     primary: true,
  //     secondary: true,
  //     error: true,
  //   },
  //   outlined: {
  //     primary: true,
  //     secondary: true,
  //     success: true,
  //     error: true,
  //   },
  // },
  // contextualNav: {
  //   text: {
  //     primary: true,
  //   },
  //   outlined: {
  //     default: true,
  //     primary: true,
  //     secondary: true,
  //     success: true,
  //     error: true,
  //   },
  //   contained: {
  //     default: true,
  //   },
  // },
  // page: {
  //   text: {
  //     // primary: true,
  //     // secondary: true,
  //     // error: true,
  //   },
  //   outlined: {
  //     // secondary: true,
  //     // primary: true,
  //     // success: true,
  //     // error: true,
  //   },
  // },
  // white: {
  //   text: {
  //     primary: true,
  //   },
  //   outlined: {
  //     primary: true,
  //     success: true,
  //     error: true,
  //   },
  // },
}

function renderButtons(size: ButtonProps['size'], isLoading: boolean) {
  return VARIANTS.map((variant) =>
    COLORS.map((color) => (
      <Button
        key={`${variant}_${color}`}
        variant={variant}
        color={color}
        size={size}
        loading={isLoading}
        style={{
          visibility:
            INVALID_COMBINATIONS[variant]?.[color] === true
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
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <BasicRoot>
      <Options layout="row">
        <div>
          <Typography>Padding</Typography>
          <ToggleButtonGroup
            value={size}
            exclusive
            onChange={(e, newPadding) => {
              if (newPadding) {
                setSize(newPadding)
              }
            }}
          >
            <ToggleButton value="small" padding="text">
              Small
            </ToggleButton>
            <ToggleButton value="medium" padding="text">
              Medium
            </ToggleButton>
            <ToggleButton value="large" padding="text" disabled>
              Large
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <Typography>Loading</Typography>
          <ToggleButtonGroup
            value={isLoading}
            exclusive
            onChange={(e, newPadding) => {
              setIsLoading(!isLoading)
            }}
          >
            <ToggleButton value={false} padding="text">
              Not Loading
            </ToggleButton>
            <ToggleButton value={true} padding="text">
              Loading
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Options>
      <Backgrounds>
        <Level1Background>{renderButtons(size, isLoading)}</Level1Background>
        <Level2Background>{renderButtons(size, isLoading)}</Level2Background>
        <Level3Background>{renderButtons(size, isLoading)}</Level3Background>
        <PrimaryBackground>{renderButtons(size, isLoading)}</PrimaryBackground>
      </Backgrounds>
    </BasicRoot>
  )
}
