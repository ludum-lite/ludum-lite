import React from 'react'
import styled, { css } from 'styled-components/macro'
import {
  IconButton as MuiIconButton,
  Menu as MuiMenu,
  MenuItem,
  Fade,
} from '@material-ui/core'
import { isLoggedInVar } from 'resolvers'
import { gql, useQuery } from '@apollo/client'
import MuiAddIcon from '@material-ui/icons/Add'
import MuiLightBrightnessIcon from '@material-ui/icons/Brightness4'
import MuiDarkBrightnessIcon from '@material-ui/icons/Brightness4Outlined'
import { ReactComponent as UserIcon } from 'assets/user.svg'
import * as Types from '__generated__/Types'
import { ThemeMode } from 'utils/types'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.spacing(8)}px;
  background: ${({ theme }) => theme.themeColors.globalNavBackground};
`

const Header = styled.div``

const IconButton = styled(MuiIconButton)`
  color: white;
  width: 48px;
  height: 48px;
  padding: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
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
      &:hover {
        ${ProfileCircle} {
          svg {
            fill: white;
          }
        }
      }
    `}
`

const AddIcon = styled(MuiAddIcon)`
  font-size: 3.3rem;
`

const Menu = styled(MuiMenu)`
  .MuiPaper-root {
    margin-left: 8px;
    width: 125px;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;

  & > * {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
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

interface Props {
  setPromptLogin: (value: boolean) => void
  toggleTheme: () => void
  themeMode: ThemeMode
}
export default function GlobalNav({
  setPromptLogin,
  toggleTheme,
  themeMode,
}: Props) {
  const { isLoggedIn } = useGlobalNavData()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogin = () => {
    handleClose()
    setPromptLogin(true)
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    isLoggedInVar(false)
    window.location.reload()
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
        <IconButton>
          {themeMode === 'light' ? (
            <MuiLightBrightnessIcon onClick={toggleTheme} />
          ) : (
            <MuiDarkBrightnessIcon onClick={toggleTheme} />
          )}
        </IconButton>
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
