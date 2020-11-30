import React, { Fragment } from 'react'
import { useTheme } from 'hooks/useTheme'
import { ThemeProvider as ScThemeProvider } from 'styled-components/macro'
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider as MuiStyledProvider,
  CssBaseline,
} from '@material-ui/core'

interface StyledProviderProps {
  children: React.ReactNode
}
export default function StylesProvider({ children }: StyledProviderProps) {
  const { scTheme, muiTheme, GlobalStyle } = useTheme()

  if (!muiTheme) return null

  return (
    <Fragment>
      <GlobalStyle />
      <MuiStyledProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <ScThemeProvider theme={scTheme}>{children}</ScThemeProvider>
        </MuiThemeProvider>
      </MuiStyledProvider>
    </Fragment>
  )
}
