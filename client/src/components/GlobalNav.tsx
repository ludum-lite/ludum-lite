import React from 'react'
import styled from 'styled-components/macro'
import {
  IconButton as MuiIconButton,
  Menu as MuiMenu,
  MenuItem,
  Fade,
} from '@material-ui/core'
import { isLoggedInVar } from 'resolvers'
import { gql, useQuery, useMutation } from '@apollo/client'
import MuiAddIcon from '@material-ui/icons/Add'
import { ReactComponent as UserIcon } from 'assets/user.svg'
import * as Types from '__generated__/Types'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.spacing(8)}px;
  background: ${({ theme }) => theme.themeColors.globalNavBackground};
`

const Header = styled.div`
  /* flex: 0 0 112px;
  height: 112px;
  display: flex;
  align-items: center; */
`

const IconButton = styled(MuiIconButton)`
  color: ${({ theme }) => theme.white};
  width: 48px;
  height: 48px;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.boxShadow.light};
  }
`

const Body = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.spacing(1)}px;
`

const ProfileCircle = styled.div`
  height: 24px;
  width: 24px;

  svg {
    fill: white;
  }
`

const AddIcon = styled(MuiAddIcon)`
  font-size: 2rem;
`

const Menu = styled(MuiMenu)`
  .MuiPaper-root {
    margin-left: 8px;
    width: 125px;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const useGlobaNavData = () => {
  const GET_DATA = React.useMemo(
    () => gql`
      query GetGlobalNavData {
        isLoggedIn @client
      }
    `,
    []
  )

  const { data } = useQuery<Types.GetGlobalNavData>(GET_DATA)

  return data
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

interface Props {}
export default function GlobalNav({}: Props) {
  const [login] = useMutation<Types.Login, Types.LoginVariables>(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login)
      isLoggedInVar(true)
    },
  })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogin = () => {
    handleClose()
    login({
      variables: {
        email: 'noah.potter@outlook.com',
        password: 'vhvL6YT7kQKRHNwVb3JG',
      },
    })
  }

  const onLogout = () => {
    handleClose()
    localStorage.removeItem('token')
    isLoggedInVar(false)
  }

  const isLoggedIn = data?.isLoggedIn

  return (
    <Root>
      <Header />
      <Body>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Body>
      <Footer>
        <IconButton onClick={handleClick}>
          <ProfileCircle>
            <UserIcon />
          </ProfileCircle>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          marginThreshold={0}
          elevation={0}
          getContentAnchorEl={null}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          {isLoggedIn ? (
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={onLogin}>Login</MenuItem>
          )}
        </Menu>
      </Footer>
    </Root>
  )
}
