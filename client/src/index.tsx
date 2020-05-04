import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { BatchHttpLink } from '@apollo/link-batch-http'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache, resolvers, typeDefs } from './resolvers'

import {
  createGlobalStyle,
  ThemeProvider as ScThemeProvider,
} from 'styled-components/macro'

import App from 'components/App'
import * as serviceWorker from './serviceWorker'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  StylesProvider,
  Theme,
  fade,
} from '@material-ui/core'

/*****************/
/* Apollo Client */
/*****************/

const client = new ApolloClient({
  cache,
  link: new BatchHttpLink({
    uri: 'http://localhost:4000/',
  }),
  typeDefs,
  resolvers,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
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
  carolinaBlue: 'rgb(63, 166, 222)',
  // bittersweet: 'rgb(248, 112, 96)',
  // greenShade: 'rgb(112, 169, 161)',
  cultured: 'rgb(234, 235, 237)',
  ghostWhite: 'rgb(249, 249, 255)',
  white: 'rgb(253, 255, 255)',
  boxShadow: {
    light: 'rgba(255, 255, 255, 0.25)',
  },
} as const

export type ThemeColors = {
  background: string
  globalNavBackground: string
  contextualNavBackground: string
  loaderBackground: string
  loaderBarBackground: string
  post: {
    backgroundColor: string
  }
}

type Themes = {
  light: ThemeColors
  dark: ThemeColors
}

const themeColors: Themes = {
  light: {
    background: styleVariables.greenBlue,
    globalNavBackground: styleVariables.sapphireBlue,
    contextualNavBackground: styleVariables.greenBlue,
    loaderBackground: styleVariables.white,
    loaderBarBackground: styleVariables.cultured,
    post: {
      backgroundColor: styleVariables.white,
    },
  },
  dark: {
    background: styleVariables.greenBlue,
    globalNavBackground: styleVariables.prussianBlue,
    contextualNavBackground: styleVariables.greenBlue,
    loaderBackground: styleVariables.white,
    loaderBarBackground: styleVariables.cultured,
    post: {
      backgroundColor: styleVariables.white,
    },
  },
} as const

type Mode = 'light' | 'dark'

const defaultTheme = createMuiTheme()

const muiThemeGenerator = ({ mode }: { mode: Mode }) =>
  createMuiTheme({
    palette: {
      primary: {
        dark: styleVariables.sapphireBlue,
        main: styleVariables.greenBlue,
        light: styleVariables.carolinaBlue,
        contrastText: styleVariables.white,
      },
    },
    typography: {
      htmlFontSize: 10,
      fontFamily: [
        // 'Ubuntu',
        // 'Roboto',
        // 'Mukta',
        'Oxygen',
        '"Baloo Paaji 2"',
      ].join(','),
    },
    props: {
      MuiTextField: {
        variant: 'filled',
        InputProps: {
          disableUnderline: true,
        },
      },
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'none',
        },
      },
      MuiIconButton: {
        root: {
          transition: 'none',
        },
      },
      MuiListItem: {
        button: {
          transition: 'none',
        },
      },
      MuiInput: {
        root: {
          border: '1px solid #e2e2e1',
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: '#fcfcfb',
          transition: defaultTheme.transitions.create([
            'border-color',
            'box-shadow',
          ]),
          '&:hover': {
            backgroundColor: '#fff',
          },
          '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${fade(
              defaultTheme.palette.primary.main,
              0.25
            )} 0 0 0 2px`,
            borderColor: defaultTheme.palette.primary.main,
          },
        },
      },
      MuiFilledInput: {
        root: {
          borderRadius: defaultTheme.shape.borderRadius,
        },
        input: {
          paddingTop: 21,
          paddingBottom: 8,
          paddingRight: 27,
        },
      },
      MuiInputLabel: {
        filled: {
          fontSize: '1.4rem',
          transform: 'translate(12px, 17px) scale(1)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(12px, 8px) scale(0.7)',
          },
        },
      },
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

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
`

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
