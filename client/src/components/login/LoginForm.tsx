import React from 'react'
import styled from 'styled-components/macro'
import { useForm } from 'react-hook-form'
import Button from 'components/common/mui/Button'
import { TextField as MuiTextField, Typography } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: stretch;
`

const Form = styled.form`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px ${({ theme }) => theme.spacing(3)}px;
`

const Title = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

const Error = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) => theme.themeColors.error.background};
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

const TextField = styled(MuiTextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

type Inputs = {
  username: string
  password: string
}

interface Props {
  login: ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => void
  error?: string
}
export default function LoginForm({ login, error }: Props) {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit = handleSubmit(login)

  return (
    <Root>
      <Form onSubmit={onSubmit}>
        <Title variant="h5">Login</Title>
        {error && (
          <Error>
            <Typography variant="body2">{error}</Typography>
          </Error>
        )}
        <TextField
          name="username"
          id="username"
          label="Username"
          inputRef={register}
          fullWidth
        />
        <TextField
          name="password"
          id="password"
          type="password"
          label="Password"
          inputRef={register}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disableElevation
        >
          Login
        </Button>
      </Form>
    </Root>
  )
}
