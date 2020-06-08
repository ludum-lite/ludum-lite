import React from 'react'
import styled, { css } from 'styled-components/macro'
import {
  IconButton as MuiIconButton,
  Menu as MuiMenu,
  MenuItem,
  Fade,
} from '@material-ui/core'
import { isLoggedInVar } from 'resolvers'
import MuiAddIcon from '@material-ui/icons/Add'
import MuiLightBrightnessIcon from '@material-ui/icons/Brightness4'
import MuiDarkBrightnessIcon from '@material-ui/icons/Brightness4Outlined'
import { ReactComponent as UserIcon } from 'assets/user.svg'
import { useLogin } from 'hooks/useLogin'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import { useTheme } from 'hooks/useTheme'

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
const ProfileButton = styled(IconButton).withConfig({
  shouldForwardProp: (prop) => !['isLoggedIn'].includes(prop),
})<ProfileButtonProps>`
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
  font-size: 2.125rem;
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

interface Props {}
export default function GlobalNav({}: Props) {
  const isLoggedIn = useIsLoggedIn()
  const { themeMode, toggleTheme } = useTheme()
  const { promptLogin } = useLogin()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
      promptLogin()
      return
    }

    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
        <IconButton onClick={toggleTheme}>
          {themeMode === 'light' ? (
            <MuiLightBrightnessIcon />
          ) : (
            <MuiDarkBrightnessIcon />
          )}
        </IconButton>
        <ProfileButton onClick={handleProfileClick} isLoggedIn={isLoggedIn}>
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
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Footer>
    </Root>
  )
}
