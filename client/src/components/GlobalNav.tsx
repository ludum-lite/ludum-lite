import React from 'react'
import styled, { css } from 'styled-components/macro'
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

const Header = styled.div``

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

interface ProfileCircleProps {
  isLoggedIn: boolean
}
const ProfileCircle = styled.div<ProfileCircleProps>`
  height: 24px;
  width: 24px;

  svg {
    fill: ${({ isLoggedIn }) =>
      isLoggedIn ? 'white' : 'rgba(255, 255, 255, 0.47)'};
  }
`

interface ProfileButtonProps {
  isLoggedIn: boolean
}
const ProfileButton = styled(IconButton)<ProfileButtonProps>`
  ${({ isLoggedIn }) =>
    !isLoggedIn &&
    css`
      border: 3px solid rgba(255, 255, 255, 0.47);

      &:hover {
        border-color: white;

        ${ProfileCircle} {
          svg {
            fill: white;
          }
        }
      }
    `}
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

const useGlobalNavData = () => {
  const GET_DATA = React.useMemo(
    () => gql`
      query GetGlobalNavData {
        isLoggedIn @client
      }
    `,
    []
  )

  const { data } = useQuery<Types.GetGlobalNavData>(GET_DATA)

  return {
    isLoggedIn: Boolean(data?.isLoggedIn),
  }
}

const useLogin = () => {
  const [login] = useMutation<Types.Login, Types.LoginVariables>(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login)
      isLoggedInVar(true)
    },
  })

  return login
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

interface Props {}
export default function GlobalNav({}: Props) {
  const { isLoggedIn } = useGlobalNavData()
  const login = useLogin()

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

  return (
    <Root>
      <Header />
      <Body>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Body>
      <Footer>
        <ProfileButton onClick={handleClick} isLoggedIn={isLoggedIn}>
          <ProfileCircle isLoggedIn={isLoggedIn}>
            <UserIcon />
          </ProfileCircle>
        </ProfileButton>
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
