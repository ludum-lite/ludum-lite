import React, { Fragment } from 'react'
import StickyBox from 'react-sticky-box'
import styled from 'styled-components/macro'
import { Hidden, Drawer } from '@material-ui/core'

import GlobalNav from './GlobalNav'
import { useSidebarOpen } from 'hooks/useSidebarOpen'
import Logo from 'components/logo/Logo'
import Link from 'components/common/mui/Link'

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorDockedLeft {
    border-right: none;
  }
`

const StyledHidden = styled(Hidden)`
  height: 100%;
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};

  ${({ theme }) => theme.breakpoints.up('md')} {
    border-right: 1px solid
      ${({ theme }) => theme.themeColors.borderColors.level1};
  }
`

const Body = styled(StickyBox)`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: ${({ theme }) => theme.variables.sidebar.widthPx};
  padding: ${({ theme }) => theme.spacing(2)}px 0;
  padding-top: ${({ theme }) => theme.spacing(10)}px;
`

const LogoContainer = styled(Link)`
  position: fixed;
  display: flex;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
  z-index: 1000;
  width: ${({ theme }) => theme.variables.sidebar.widthPx};
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
  height: ${({ theme }) => theme.spacing(7)}px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: ${({ theme }) => theme.spacing(8)}px;
  }
`

const StyledLogo = styled(Logo)`
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.themeColors.borderColors.level1};
`

const Sidebar = React.memo(() => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarOpen()

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false)
  }, [setIsSidebarOpen])

  return (
    <Fragment>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="js">
        <StyledDrawer
          anchor="left"
          open={isSidebarOpen}
          onClose={closeSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Root>
            <LogoContainer to="/">
              <StyledLogo />
            </LogoContainer>
            <Body>
              <GlobalNav />
            </Body>
          </Root>
        </StyledDrawer>
      </Hidden>
      <StyledHidden smDown implementation="css">
        <Root>
          <LogoContainer to="/">
            <StyledLogo />
          </LogoContainer>
          <Body>
            <GlobalNav />
          </Body>
        </Root>
      </StyledHidden>
    </Fragment>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
