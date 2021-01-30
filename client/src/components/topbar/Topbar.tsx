import { useSidebarOpen } from 'hooks/useSidebarOpen'
import React from 'react'
import styled from 'styled-components/macro'
import { Hidden, Toolbar } from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from 'components/common/mui/IconButton'
import { useWidgetsSidebarOpen } from 'hooks/useWidgetsSidebarOpen'
import Logo from 'components/logo/Logo'
import Link from 'components/common/mui/Link'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1100;
  top: 0;
  right: 0;
  position: sticky;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const StyledAppBar = styled.div`
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.themeColors.borderColors.level1};

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 0px ${({ theme }) => theme.spacing(1)}px;
  }
`

const StyledToolbar = styled(Toolbar)`
  align-items: stretch;
`

const StyledIconButton = styled(IconButton)`
  border-radius: 0px;
  width: 64px;
`

const Separator = styled.div`
  flex: 1 1 0px;
`

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`

export default function Topbar() {
  const { setIsSidebarOpen } = useSidebarOpen()
  const { setIsWidgetsSidebarOpen } = useWidgetsSidebarOpen()

  const onClickLeftIcon = React.useCallback(() => {
    setIsSidebarOpen(true)
  }, [setIsSidebarOpen])

  const onClickRightIcon = React.useCallback(() => {
    setIsWidgetsSidebarOpen(true)
  }, [setIsWidgetsSidebarOpen])

  return (
    <Hidden mdUp>
      <Root>
        <StyledAppBar>
          <StyledToolbar disableGutters>
            <StyledIconButton aria-label="menu" onClick={onClickLeftIcon}>
              <MenuIcon />
            </StyledIconButton>
            <Separator />
            <LogoContainer to="/">
              <Logo />
            </LogoContainer>
            <Separator />
            <StyledIconButton aria-label="menu" onClick={onClickRightIcon}>
              <AppsIcon />
            </StyledIconButton>
          </StyledToolbar>
        </StyledAppBar>
      </Root>
    </Hidden>
  )
}

Topbar.displayName = 'Topbar'
