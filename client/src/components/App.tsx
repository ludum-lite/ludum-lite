import React from 'react'
import styled from 'styled-components/macro'
import { Routes, Route } from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Drawer } from '@material-ui/core'
import { isLoggedInVar } from 'resolvers'
import Sidebar from './Sidebar'
import RoutesWithFallback from './RoutesWithFallback'
import PostsPage from 'components/posts/PostsPage'
import LoginForm from './login/LoginForm'
import * as Types from '__generated__/Types'
import { ThemeMode } from 'utils/types'
import LoginContext from 'components/contexts/LoginContext'

const App = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.themeColors.background};
`

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing(42)}px;
  flex: 1 1 auto;
`

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ... on LoginSuccess {
        token
      }
      ... on LoginFailure {
        message
      }
    }
  }
`

const useLoginComponent = () => {
  const [promptLogin, setPromptLogin] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loginMutation] = useMutation<Types.Login, Types.LoginVariables>(
    LOGIN,
    {
      onCompleted: ({ login }) => {
        if (login.__typename === 'LoginSuccess') {
          const { token } = login
          localStorage.setItem('token', token)
          setPromptLogin(false)
          isLoggedInVar(true)
          window.location.reload()
        } else if (login.__typename === 'LoginFailure') {
          setError(login.message)
          isLoggedInVar(false)
        }
      },
    }
  )

  const login = React.useCallback(
    ({ username, password }: { username: string; password: string }) => {
      setError('')

      loginMutation({
        variables: {
          input: {
            email: username,
            password: password,
          },
        },
      })
    },
    [loginMutation]
  )

  const loginComponent = React.useMemo(() => {
    return (
      <Drawer
        open={promptLogin}
        anchor="left"
        onClose={() => setPromptLogin(false)}
      >
        <LoginForm login={login} error={error} />
      </Drawer>
    )
  }, [promptLogin, login, error])

  return {
    login,
    promptLogin,
    setPromptLogin,
    loginComponent,
  }
}

const GET_APP_DATA = gql`
  query GetAppData {
    me {
      ... on Me {
        id
      }
    }
  }
`

interface Props {
  toggleTheme: () => void
  themeMode: ThemeMode
}
export default function Root({ toggleTheme, themeMode }: Props) {
  const [hasLoadedUser, setHasLoadedUser] = React.useState(false)
  const { setPromptLogin, loginComponent } = useLoginComponent()

  useQuery<Types.GetAppData>(GET_APP_DATA, {
    onCompleted(data) {
      if (data.me.__typename === 'UnauthorizedResponse') {
        isLoggedInVar(false)
        localStorage.removeItem('token')
      }

      setHasLoadedUser(true)
    },
  })

  const promptLogin = React.useCallback(() => {
    setPromptLogin(true)
  }, [setPromptLogin])

  if (hasLoadedUser) {
    return (
      <App>
        <Routes>
          <Route
            path="/:basePath*"
            element={
              <Sidebar
                setPromptLogin={setPromptLogin}
                toggleTheme={toggleTheme}
                themeMode={themeMode}
              />
            }
          />
        </Routes>
        <LoginContext.Provider value={{ promptLogin }}>
          <AppContent>
            <RoutesWithFallback>
              <Route path="/posts" element={<PostsPage />} />
            </RoutesWithFallback>
          </AppContent>
        </LoginContext.Provider>
        {loginComponent}
      </App>
    )
  }

  return null
}
