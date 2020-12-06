import React, { Fragment } from 'react'
import StickyBox from 'react-sticky-box'
import styled from 'styled-components/macro'
import { Typography, Hidden, Drawer } from '@material-ui/core'
import { ReactComponent as LudumLogo } from 'assets/ludum.svg'
import { ReactComponent as DareLogo } from 'assets/dare.svg'

import GlobalNav from './GlobalNav'
import { useSidebarOpen } from 'hooks/useSidebarOpen'

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorDockedLeft {
    border-right: none;
  }
`

const Root = styled(Hidden)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  border-right: 1px solid
    ${({ theme }) => theme.themeColors.borderColors.level1};
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const Body = styled(StickyBox)`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: ${({ theme }) => theme.variables.sidebar.widthPx};
  padding: ${({ theme }) => theme.spacing(2)}px 0;
  padding-top: ${({ theme }) => theme.spacing(8)}px;
`

const LogoContainer = styled.div`
  position: fixed;
  display: flex;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
  z-index: 1000;
  width: ${({ theme }) => theme.variables.sidebar.widthPx};
  padding: 0 ${({ theme }) => theme.spacing(1)}px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: ${({ theme }) => theme.spacing(7)}px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    height: ${({ theme }) => theme.spacing(8)}px;
  }
`

// const ContextualNav = styled.div`
//   display: flex;
//   flex-direction: column;
//   background: ${({ theme }) => theme.themeColors.contextualNavBackground};
//   padding: 0px ${({ theme }) => theme.spacing(2)}px;

//   ${({ theme }) => theme.breakpoints.down('sm')} {
//     width: ${({ theme }) => theme.spacing(30)}px;
//   }

//   ${({ theme }) => theme.breakpoints.up('md')} {
//     width: ${({ theme }) => theme.spacing(34)}px;
//   }
// `

const Title = styled(Typography)`
  flex: 1 1 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid
    ${({ theme }) => theme.themeColors.borderColors.level1};
`

const StyledLudumLogo = styled(LudumLogo)`
  fill: ${({ theme }) => theme.themeColors.logo.ludumBackground};
  height: 30px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

const StyledDareLogo = styled(DareLogo)`
  fill: ${({ theme }) => theme.themeColors.logo.dareBackground};
  height: 30px;
`

const Sidebar = React.memo(() => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarOpen()

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false)
  }, [setIsSidebarOpen])

  return (
    <Fragment>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <StyledDrawer
          anchor="left"
          open={isSidebarOpen}
          onClose={closeSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Root>
            <LogoContainer>
              <Title>
                <StyledLudumLogo />
                <StyledDareLogo />
              </Title>
            </LogoContainer>
            <Body>
              <GlobalNav />
            </Body>
          </Root>
        </StyledDrawer>
      </Hidden>
      <Root smDown implementation="css">
        <LogoContainer>
          <Title>
            <StyledLudumLogo />
            <StyledDareLogo />
          </Title>
        </LogoContainer>
        <Body>
          <GlobalNav />
        </Body>
      </Root>
    </Fragment>
  )
})

export default Sidebar
