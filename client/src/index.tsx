import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useNavigate } from 'react-router-dom'

import { ApolloClient, HttpLink, ApolloProvider } from '@apollo/client'
import { cache } from './cache'
import {
  createGlobalStyle,
  ThemeProvider as ScThemeProvider,
} from 'styled-components/macro'
import { typeDefs } from './resolvers'

import App from 'components/App'
import * as serviceWorker from './serviceWorker'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  StylesProvider,
  Theme,
} from '@material-ui/core'

/*****************/
/* Apollo Client */
/*****************/

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  typeDefs,
})

/**********/
/* Styles */
/**********/

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {}

  interface ThemeOptions {}
}

const styleVariables = {
  prussianBlue: 'rgb(19, 41, 61)',
  sapphireBlue: 'rgb(0, 100, 148)',
  greenBlue: 'rgb(5, 142, 217)',
  bittersweet: 'rgb(248, 112, 96)',
  // greenShade: 'rgb(112, 169, 161)',
  ghostWhite: 'rgb(249, 249, 255)',
  white: 'rgb(253, 255, 255)',
} as const

export type ThemeColors = {
  background: string
  globalNavBackground: string
  contextualNavBackground: string
  posts: {
    separatorColor: string
  }
}

const themeColors = {
  light: {
    background: styleVariables.white,
    globalNavBackground: styleVariables.sapphireBlue,
    contextualNavBackground: styleVariables.greenBlue,
    posts: {
      separatorColor: 'rgba(0, 0, 0, 0.15)',
    },
  } as ThemeColors,
  dark: {
    background: styleVariables.white,
    globalNavBackground: styleVariables.prussianBlue,
    contextualNavBackground: styleVariables.greenBlue,
    posts: {
      separatorColor: 'rgba(0, 0, 0, 0.15)',
    },
  } as ThemeColors,
} as const

type Mode = 'light' | 'dark'

const muiThemeGenerator = ({ mode }: { mode: Mode }) =>
  createMuiTheme({
    typography: {
      fontFamily: [
        // 'Ubuntu',
        // 'Roboto',
        // 'Mukta',
        'Oxygen',
        '"Baloo Paaji 2"',
      ].join(','),
    },
  })

const muiTheme = muiThemeGenerator({ mode: 'light' })

const scThemeGenerator = ({
  mode,
  selectedMuiTheme,
}: {
  mode: Mode
  selectedMuiTheme: Theme
}) => ({
  ...selectedMuiTheme,
  ...styleVariables,
  themeColors: themeColors[mode],
  // prettier-ignore
  layout: {
    1: '0.125rem',   // 2
    2: '0.25rem',    // 4
    3: '0.5rem',     // 8
    4: '0.75rem',    // 12
    5: '1rem',       // 16
    6: '1.5rem',     // 24
    7: '2rem',       // 32
    8: '2.5rem',     // 40
    9: '3rem',       // 48
  } as const
})

const scTheme = scThemeGenerator({ mode: 'light', selectedMuiTheme: muiTheme })

type ScThemeType = typeof scTheme

declare module 'styled-components/macro' {
  export interface DefaultTheme extends ScThemeType {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends ScThemeType {}
}

const GlobalStyle = createGlobalStyle``

/*********/
/* Entry */
/*********/

const Root = () => {
  const mode: Mode = (localStorage.getItem('themeMode') as Mode) || 'light'

  const selectedMuiTheme = React.useMemo(() => muiThemeGenerator({ mode }), [
    mode,
  ])
  const selectedScTheme = React.useMemo(
    () => scThemeGenerator({ mode, selectedMuiTheme }),
    [selectedMuiTheme, mode]
  )

  return (
    <ApolloProvider client={client}>
      <Fragment>
        <CssBaseline />
        <GlobalStyle />
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={selectedMuiTheme}>
            <ScThemeProvider theme={selectedScTheme}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ScThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Fragment>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
