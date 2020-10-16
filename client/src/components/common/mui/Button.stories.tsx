import React from 'react'
import styled from 'styled-components/macro'
import Button, { Background } from './Button'
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

const Options = styled(Panel)``

const VARIANTS = ['text', 'outlined', 'contained'] as const
const COLORS = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'yellow',
] as const
function isCustomColor(color: string) {
  return color === 'success' || color === 'error' || color === 'yellow'
}

type PropCombination = {
  [key in Background]?: {
    [key in NonNullable<ButtonProps['variant']>]?: {
      [key in NonNullable<
        | Exclude<ButtonProps['color'], 'inherit'>
        | 'success'
        | 'error'
        | 'yellow'
      >]?: boolean
    }
  }
}
const INVALID_COMBINATIONS: PropCombination = {
  globalNav: {
    text: {
      primary: true,
      secondary: true,
      error: true,
      yellow: true,
    },
    outlined: {
      primary: true,
      secondary: true,
      success: true,
      error: true,
      yellow: true,
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
      success: true,
      error: true,
      yellow: true,
    },
    contained: {
      default: true,
    },
  },
  page: {
    text: {
      primary: true,
      secondary: true,
      error: true,
      yellow: true,
    },
    outlined: {
      secondary: true,
      primary: true,
      success: true,
      error: true,
      yellow: true,
    },
  },
  white: {
    text: {
      primary: true,
      yellow: true,
    },
    outlined: {
      primary: true,
      success: true,
      error: true,
      yellow: true,
    },
  },
}

function renderButtons(
  background: Background,
  size: ButtonProps['size'],
  isLoading: boolean
) {
  return VARIANTS.map((variant) =>
    COLORS.map((color) => (
      <Button
        key={`${variant}_${color}`}
        variant={variant}
        // @ts-ignore
        color={isCustomColor(color) ? undefined : color}
        // @ts-ignore
        customColor={isCustomColor(color) ? color : undefined}
        background={background}
        size={size}
        loading={isLoading}
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
        <GlobalNavBackground>
          {renderButtons('globalNav', size, isLoading)}
        </GlobalNavBackground>
        <ContexualNavBackground>
          {renderButtons('contextualNav', size, isLoading)}
        </ContexualNavBackground>
        <PageBackground>
          {renderButtons('page', size, isLoading)}
        </PageBackground>
        <WhiteBackground>
          {renderButtons('white', size, isLoading)}
        </WhiteBackground>
      </Backgrounds>
    </BasicRoot>
  )
}
