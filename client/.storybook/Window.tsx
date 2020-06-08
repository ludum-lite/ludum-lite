import React from 'react'
import styled from 'styled-components/macro'
import { useTheme } from '../src/hooks/useTheme'
import MuiLightBrightnessIcon from '@material-ui/icons/Brightness4'
import MuiDarkBrightnessIcon from '@material-ui/icons/Brightness4Outlined'
import { IconButton } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

const Toolbar = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  background: white;
  padding: ${({ theme }) => theme.spacing(1)}px;
`

const ToolbarButton = styled(IconButton)`
  .MuiIconButton-label {
    font-size: 24px;
  }
`

const Content = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 16px;
`

interface Props {
  children: React.ReactNode
}
export default function Window({ children }: Props) {
  const { themeMode, toggleTheme } = useTheme()

  return (
    <Root>
      <Toolbar>
        <ToolbarButton onClick={toggleTheme} size="small">
          {themeMode === 'light' ? (
            <MuiLightBrightnessIcon />
          ) : (
            <MuiDarkBrightnessIcon />
          )}
        </ToolbarButton>
      </Toolbar>
      <Content>{children}</Content>
    </Root>
  )
}
