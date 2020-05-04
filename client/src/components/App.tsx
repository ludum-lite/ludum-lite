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
      ... on LoginSuccessResponse {
        token
      }
      ... on LoginFailureResponse {
        message
      }
    }
  }
`

const useLogin = ({ onCompleted }: { onCompleted: () => void }) => {
  const [login] = useMutation<Types.Login, Types.LoginVariables>(LOGIN, {
    onCompleted({ login }) {
      if (login.__typename === 'LoginSuccessResponse') {
        const { token } = login
        localStorage.setItem('token', token)
        isLoggedInVar(true)
      } else if (login.__typename === 'LoginFailureResponse') {
        isLoggedInVar(false)
      }

      onCompleted()
    },
  })

  console.log(login)

  return login
}

const useLoginComponent = () => {
  const [promptLogin, setPromptLogin] = React.useState(false)
  const loginMutation = useLogin({
    onCompleted: () => {
      setPromptLogin(false)
    },
  })

  const login = React.useCallback(
    ({ username, password }: { username: string; password: string }) => {
      loginMutation({
        variables: {
          input: {
            email: username || 'noah.potter@outlook.com',
            password: password || 'vhvL6YT7kQKRHNwVb3JG',
          },
        },
      })
    },
    [loginMutation, setPromptLogin]
  )

  const loginComponent = React.useMemo(() => {
    return (
      <Drawer
        open={promptLogin}
        anchor="left"
        onClose={() => setPromptLogin(false)}
      >
        <LoginForm login={login} />
      </Drawer>
    )
  }, [promptLogin])

  return {
    login,
    promptLogin,
    setPromptLogin,
    loginComponent,
  }
}

interface Props {}
export default function Root({}: Props) {
  const { setPromptLogin, loginComponent } = useLoginComponent()

  return (
    <App>
      <Routes>
        <Route
          path="/:basePath*"
          element={<Sidebar setPromptLogin={setPromptLogin} />}
        />
      </Routes>
      <AppContent>
        <RoutesWithFallback>
          <Route path="/posts" element={<PostsPage />} />
        </RoutesWithFallback>
      </AppContent>
      {loginComponent}
    </App>
  )
}
