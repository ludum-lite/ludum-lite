import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { BatchHttpLink } from '@apollo/link-batch-http'
import { SingletonHooksContainer } from 'react-singleton-hook'
// import { onError } from '@apollo/link-error'
import { setContext } from '@apollo/link-context'
import { ApolloClient, ApolloProvider, ApolloLink } from '@apollo/client'
import { cache, resolvers, typeDefs } from './resolvers'
import { ThemeMode } from 'utils/types'

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

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     Object.values(graphQLErrors).forEach((error) => {
//       switch (error?.extensions?.code) {
//         case 'UNAUTHENTICATED': {
//           isLoggedInVar(false)
//           window.history.pushState(null, '', '/')
//           localStorage.removeItem('token')
//         }
//       }
//     })
//   }
//   console.log({
//     graphQLErrors,
//     networkError,
//   })
// })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  }
})

const batchHttpLink = new BatchHttpLink({
  uri: 'http://localhost:4000/',
})

const link = ApolloLink.from([authLink, batchHttpLink])

const client = new ApolloClient({
  cache,
  link,
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

declare global {
  interface Window {
    hasNavigatedWithin: boolean
  }
}

/**********/
/* Styles */
/**********/

export type ThemeColors = {
  background: string
  globalNavBackground: string
  contextualNavBackground: string
  loaderBackground: string
  loaderBarBackground: string
  logoBackground: string
  borderColor: string
  error: {
    background: string
  }
  post: {
    backgroundColor: string
  }
  palette: {
    primary: {
      dark: string
      main: string
      light: string
      contrastText: string
    }
  }
}

type Themes = {
  light: ThemeColors
  dark: ThemeColors
}

const borderColor = 'rgba(0, 0, 0, 0.22)'

const styleVariables = {
  prussianBlue: 'rgb(19, 41, 61)',
  indigoDye: 'rgb(0, 69, 103)',
  sapphireBlue: 'rgb(0, 100, 148)',
  greenBlue: 'rgb(5, 142, 217)',
  carolinaBlue: 'rgb(63, 166, 222)',
  bittersweet: 'rgb(248, 112, 96)',
  // greenShade: 'rgb(112, 169, 161)',
  cultured: 'rgb(238, 242, 247)',
  ghostWhite: 'rgb(249, 249, 255)',
  white: 'rgb(253, 255, 255)',
  boxShadow: {
    light: 'rgba(255, 255, 255, 0.25)',
  },
} as const

const lightTheme: ThemeColors = {
  background: styleVariables.cultured,
  globalNavBackground: styleVariables.sapphireBlue,
  contextualNavBackground: styleVariables.greenBlue,
  loaderBackground: 'rgba(0, 0, 0, 0.166)',
  loaderBarBackground: 'rgba(0, 0, 0, 0.166)',
  logoBackground: styleVariables.indigoDye,
  borderColor,
  error: {
    background: styleVariables.bittersweet,
  },
  post: {
    backgroundColor: styleVariables.white,
  },
  palette: {
    primary: {
      dark: styleVariables.sapphireBlue,
      main: styleVariables.greenBlue,
      light: styleVariables.carolinaBlue,
      contrastText: styleVariables.white,
    },
  },
}

const ldStyleVariables = {
  raisinBlack: 'rgb(31, 36, 41)',
  slateGray: 'rgb(111, 121, 132)',
  lightGray: 'rgb(208, 208, 216)',
  cultured: 'rgb(238, 242, 247)',
  darkOrange: 'rgb(247, 145, 34)',
  sunglow: 'rgb(255, 204, 17)',
  portlandOrange: 'rgb(238, 85, 51)',
  blueDeFrance: 'rgb(34, 136, 247)',
  white: 'rgb(253, 255, 255)',
  boxShadow: {
    light: 'rgba(255, 255, 255, 0.25)',
  },
} as const

const darkTheme: ThemeColors = {
  background: ldStyleVariables.cultured,
  globalNavBackground: ldStyleVariables.raisinBlack,
  contextualNavBackground: ldStyleVariables.slateGray,
  loaderBackground: 'rgba(0, 0, 0, 0.166)',
  loaderBarBackground: 'rgba(0, 0, 0, 0.166)',
  logoBackground: ldStyleVariables.raisinBlack,
  borderColor,
  error: {
    background: styleVariables.bittersweet,
  },
  post: {
    backgroundColor: styleVariables.white,
  },
  palette: {
    primary: {
      dark: ldStyleVariables.raisinBlack,
      main: ldStyleVariables.slateGray,
      light: ldStyleVariables.lightGray,
      contrastText: ldStyleVariables.white,
    },
  },
}

const themeColors: Themes = {
  light: lightTheme,
  dark: darkTheme,
} as const

const defaultTheme = createMuiTheme({
  shape: {
    borderRadius: 8,
  },
})

const muiThemeGenerator = ({ themeMode }: { themeMode: ThemeMode }) => {
  const selectedThemeColors = themeColors[themeMode]

  return createMuiTheme({
    ...defaultTheme,
    palette: selectedThemeColors.palette,
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
      MuiButton: {
        disableElevation: true,
      },
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'none',
          transition: 'none',
          // '&:hover': {
          //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
          // },
        },
        contained: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiIconButton: {
        root: {
          transition: 'none',
          color: 'rgba(0, 0, 0, 0.78)',
          borderRadius: defaultTheme.shape.borderRadius,
        },
      },
      MuiListItem: {
        button: {
          transition: 'none',
        },
      },
      MuiLinearProgress: {
        root: {
          height: 112,
          borderRadius: defaultTheme.shape.borderRadius,
          backgroundColor: selectedThemeColors.loaderBackground,
        },
        barColorPrimary: {
          backgroundColor: selectedThemeColors.loaderBarBackground,
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
}

const muiTheme = muiThemeGenerator({ themeMode: 'light' })

const scThemeGenerator = ({
  themeMode,
  selectedMuiTheme,
}: {
  themeMode: ThemeMode
  selectedMuiTheme: Theme
}) => ({
  ...selectedMuiTheme,
  styleVariables,
  ldStyleVariables,
  themeColors: themeColors[themeMode],
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

const scTheme = scThemeGenerator({
  themeMode: 'light',
  selectedMuiTheme: muiTheme,
})

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
    overflow-x: hidden;
  }

  body {
    font-size: 1.4rem;
  }

  hr {
    border-color: ${borderColor};
  }
`

/*********/
/* Entry */
/*********/

const Root = () => {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(
    (localStorage.getItem('themeMode') as ThemeMode) || 'light'
  )

  const toggleTheme = React.useCallback(() => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }, [themeMode])

  const selectedMuiTheme = React.useMemo(
    () => muiThemeGenerator({ themeMode }),
    [themeMode]
  )
  const selectedScTheme = React.useMemo(
    () => scThemeGenerator({ themeMode, selectedMuiTheme }),
    [selectedMuiTheme, themeMode]
  )

  return (
    <ApolloProvider client={client}>
      <Fragment>
        <CssBaseline />
        <GlobalStyle />
        <SingletonHooksContainer />
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={selectedMuiTheme}>
            <ScThemeProvider theme={selectedScTheme}>
              <BrowserRouter>
                <App toggleTheme={toggleTheme} themeMode={themeMode} />
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
