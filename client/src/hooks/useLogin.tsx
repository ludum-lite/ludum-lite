import React from 'react'
import { singletonHook } from 'react-singleton-hook'
import { gql } from '@apollo/client'
import { isLoggedInVar } from 'resolvers'
import { Drawer } from '@material-ui/core'
import LoginForm from 'components/login/LoginForm'
import {
  useLoginMutation,
  useGlobalIsLoggedInQuery,
} from '__generated__/client-types'

type UseLoginReturnType = {
  login: ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => void
  promptLogin: () => void
  isPromptingLogin: boolean
  loginComponent: React.ReactNode
  isLoggedIn: boolean
}

const init: UseLoginReturnType = {
  login: () => {},
  promptLogin: () => {},
  isPromptingLogin: false,
  loginComponent: null,
  isLoggedIn: false,
}

export const useLogin = singletonHook(init, () => {
  const { data } = useGlobalIsLoggedInQuery()
  const [isPromptingLogin, setIsPromptingLogin] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loginMutation] = useLoginMutation({
    onCompleted: ({ login }) => {
      console.log('logged in')
      if (login.__typename === 'LoginSuccess') {
        const { token } = login
        localStorage.setItem('token', token)
        window.location.reload()
      } else if (login.__typename === 'LoginFailure') {
        setError(login.message)
        isLoggedInVar(false)
      }
    },
  })

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
        open={isPromptingLogin}
        anchor="left"
        onClose={() => setIsPromptingLogin(false)}
      >
        <LoginForm login={login} error={error} />
      </Drawer>
    )
  }, [isPromptingLogin, login, error])

  const promptLogin = React.useCallback(() => {
    setIsPromptingLogin(true)
  }, [])

  return {
    login,
    promptLogin,
    isPromptingLogin,
    loginComponent,
    isLoggedIn: data?.isLoggedIn || false,
  }
})

gql`
  query GlobalIsLoggedIn {
    isLoggedIn @client
  }

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
