import React from 'react'
import styled from 'styled-components/macro'
import { useForm } from 'react-hook-form'
import Button from 'components/common/mui/Button'
import { TextField as MuiTextField, Typography } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
`

const Form = styled.form`
  flex: 0 1 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
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
}
export default function LoginForm({ login }: Props) {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>()
  const onSubmit = handleSubmit(login)

  return (
    <Root>
      <Form onSubmit={onSubmit}>
        <Title variant="h5">Login</Title>
        <TextField name="username" label="Username" inputRef={register} />
        <TextField
          name="password"
          type="password"
          label="Password"
          inputRef={register}
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
