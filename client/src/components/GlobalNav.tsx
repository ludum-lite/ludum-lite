import React from 'react'
import styled from 'styled-components/macro'
import {
  IconButton as MuiIconButton,
  List,
  Menu as MuiMenu,
  MenuItem,
  Popover,
  Fade,
} from '@material-ui/core'
import MuiAddIcon from '@material-ui/icons/Add'
import { ReactComponent as UserIcon } from 'assets/user.svg'

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

interface Props {}
export default function GlobalNav({}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
        <IconButton onClick={handleClick}>
          <ProfileCircle>
            <UserIcon />
          </ProfileCircle>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          keepMounted
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
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
          <MenuItem>Login</MenuItem>
        </Menu>
      </Footer>
    </Root>
  )
}
