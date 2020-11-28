import React from 'react'
import styled from 'styled-components/macro'
import { isLoggedInVar } from 'resolvers'
import {
  Menu as MuiMenu,
  MenuItem,
  Fade,
  // Tooltip,
  List,
  ListItem as MuiListItem,
  ListItemText,
} from '@material-ui/core'
import MuiAddIcon from '@material-ui/icons/Add'
import MuiLightBrightnessIcon from '@material-ui/icons/Brightness4'
import MuiDarkBrightnessIcon from '@material-ui/icons/Brightness4Outlined'
import ViewWeekIcon from '@material-ui/icons/ViewWeek'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import LocalPlayIcon from '@material-ui/icons/LocalPlay'
// import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import ListItemIcon from 'components/common/mui/ListItemIcon'
import { ReactComponent as UserIcon } from 'assets/user.svg'
import { useLogin } from 'hooks/useLogin'
import { useTheme } from 'hooks/useTheme'
import { gql } from '@apollo/client'
// import Link from 'components/common/mui/Link'
import { useSidebarOpen } from 'hooks/useSidebarOpen'
import { Link as RouterLink, useParams } from 'react-router-dom'

const Root = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
`

// const StyledIconButton = styled(IconButton)`
//   width: 48px;
//   height: 48px;
//   padding: 0;
// `

// const Body = styled.div`
//   flex: 1 1 0px;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   padding-top: ${({ theme }) => theme.spacing(1)}px;
// `

const StyledViewWeekIcon = styled(ViewWeekIcon)`
  transform: rotate(90deg) translate(1px, 0px);
`

const Separator = styled.div`
  flex: 1 1 0px;
`

// interface ProfileCircleProps {
//   isLoggedIn: boolean
// }
// const ProfileCircle = styled.div<ProfileCircleProps>`
//   height: 24px;
//   width: 24px;

//   svg {
//     fill: ${({ isLoggedIn }) =>
//       isLoggedIn ? 'white' : 'rgba(255, 255, 255, 0.47)'};
//   }
// `

// interface ProfileButtonProps {
//   isLoggedIn: boolean
// }
// const ProfileButton = styled(StyledIconButton).withConfig({
//   shouldForwardProp: (prop) => !['isLoggedIn'].includes(prop),
// })<ProfileButtonProps>`
//   ${({ isLoggedIn }) =>
//     !isLoggedIn &&
//     css`
//       &:hover {
//         ${ProfileCircle} {
//           svg {
//             fill: white;
//           }
//         }
//       }
//     `}
// `

// const AddIcon = styled(MuiAddIcon)`
//   font-size: 2.125rem;
// `

const Menu = styled(MuiMenu)`
  .MuiPaper-root {
    margin-left: 8px;
    width: 125px;
  }
`

// const Footer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: ${({ theme }) => theme.spacing(1)}px;

//   & > * {
//     margin-top: ${({ theme }) => theme.spacing(1)}px;
//   }
// `

const ListItem = styled(MuiListItem)`
  transition: none;
  color: ${({ theme }) => theme.themeColors.sidebar.item.color};

  &.Mui-selected {
    background: ${({ theme }) =>
      theme.themeColors.sidebar.item.activeBackground};
    color: ${({ theme }) => theme.themeColors.sidebar.item.activeColor};
    border-right: 6px solid
      ${({ theme }) => theme.themeColors.sidebar.item.activeBorderColor};

    &:hover {
      background: ${({ theme }) =>
        theme.themeColors.sidebar.item.activeBackground};
      color: ${({ theme }) => theme.themeColors.sidebar.item.activeColor};
    }
  }

  &:not(.Mui-selected) {
    &:hover {
      background: ${({ theme }) =>
        theme.themeColors.sidebar.item.activeBackground};
      color: ${({ theme }) => theme.themeColors.sidebar.item.activeColor};
    }
  }
` as typeof MuiListItem

interface Props {}
export default function GlobalNav() {
  const { themeMode, toggleTheme } = useTheme()
  const { promptLogin, isLoggedIn } = useLogin()

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

  const { setIsSidebarOpen } = useSidebarOpen()

  const { basePath } = useParams()

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false)
  }, [setIsSidebarOpen])

  return (
    <Root>
      <List disablePadding>
        <ListItem
          button
          component={RouterLink}
          to="/posts/new"
          onClick={() => {
            closeSidebar()
          }}
        >
          <ListItemIcon compactPadding>
            <Icon icon={MuiAddIcon} />
          </ListItemIcon>
          <ListItemText primary="Create Post" />
        </ListItem>
        <ListItem
          button
          selected={basePath === 'posts'}
          component={RouterLink}
          to="/posts"
          onClick={() => {
            closeSidebar()
          }}
        >
          <ListItemIcon compactPadding>
            <Icon icon={StyledViewWeekIcon} />
          </ListItemIcon>
          <ListItemText primary="Feed" />
        </ListItem>
        <ListItem
          button
          selected={basePath === 'games'}
          component={RouterLink}
          to="/games"
          onClick={() => {
            closeSidebar()
          }}
        >
          <ListItemIcon compactPadding>
            <Icon icon={VideogameAssetIcon} />
          </ListItemIcon>
          <ListItemText primary="Games" />
        </ListItem>
        <ListItem
          button
          selected={basePath === 'events'}
          component={RouterLink}
          to="/events"
          onClick={() => {
            closeSidebar()
          }}
        >
          <ListItemIcon compactPadding>
            <Icon icon={LocalPlayIcon} />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
      </List>
      <Separator />
      <List disablePadding>
        <ListItem
          button
          onClick={() => {
            toggleTheme()
          }}
        >
          <ListItemIcon compactPadding>
            <Icon
              icon={
                themeMode === 'light'
                  ? MuiLightBrightnessIcon
                  : MuiDarkBrightnessIcon
              }
            />
          </ListItemIcon>
          <ListItemText primary="Toggle Theme" />
        </ListItem>
        {/* <ListItem
          button
          onClick={(e) => {
            // @ts-ignore
            handleProfileClick(e)
          }}
        >
          <ListItemIcon compactPadding>
            <Icon
              icon={() => (
                <ProfileCircle isLoggedIn={isLoggedIn}>
                  <UserIcon />
                </ProfileCircle>
              )}
            />
          </ListItemIcon>
          <ListItemText primary={isLoggedIn ? 'Account' : 'Login'} />
        </ListItem> */}
      </List>
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
    </Root>
  )
}
