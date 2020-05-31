import React from 'react'
import { singletonHook } from 'react-singleton-hook'
import { gql, useMutation } from '@apollo/client'
import { isLoggedInVar } from 'resolvers'
import * as Types from '__generated__/Types'
import { Drawer } from '@material-ui/core'
import LoginForm from 'components/login/LoginForm'

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
}

const init: UseLoginReturnType = {
  login: () => {},
  promptLogin: () => {},
  isPromptingLogin: false,
  loginComponent: null,
}

export const useLogin = singletonHook(init, () => {
  const [isPromptingLogin, setIsPromptingLogin] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loginMutation] = useMutation<Types.Login, Types.LoginVariables>(
    LOGIN,
    {
      onCompleted: ({ login }) => {
        if (login.__typename === 'LoginSuccess') {
          console.log(login)
          const { token } = login
          localStorage.setItem('token', token)
          setIsPromptingLogin(false)
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
  }
})
