import 'react-medium-image-zoom/dist/styles.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { SingletonHooksContainer } from 'react-singleton-hook'
import { setContext } from '@apollo/link-context'
import { ApolloClient, ApolloProvider, ApolloLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

import { cache, resolvers, typeDefs } from './resolvers'

import App from 'components/App'
import * as serviceWorker from './serviceWorker'

import { QueryParamProvider } from 'use-query-params'
import StylesProvider from 'providers/StylesProvider'
import UserLoadedCheck from 'components/UserLoadedCheck'
import 'react-medium-image-zoom/dist/styles.css'

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

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_UPLOAD_LINK,
})

// @ts-ignore
const link = ApolloLink.from([authLink, uploadLink])

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
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

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SingletonHooksContainer />
        <UserLoadedCheck>
          <StylesProvider>
            <SnackbarProvider
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
              }}
            >
              <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                <App />
              </QueryParamProvider>
            </SnackbarProvider>
          </StylesProvider>
        </UserLoadedCheck>
      </BrowserRouter>
    </ApolloProvider>
  )
}

/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
const RouteAdapter = ({ children }: any) => {
  const navigate = useNavigate()
  const location = useLocation()

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location: any) {
        navigate(location, { replace: true, state: location.state })
      },
      push(location: any) {
        navigate(location, { replace: false, state: location.state })
      },
    }),
    [navigate]
  )
  return children({ history: adaptedHistory, location })
}

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
