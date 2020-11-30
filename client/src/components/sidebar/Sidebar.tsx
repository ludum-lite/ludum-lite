import React, { Fragment } from 'react'
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

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: ${({ theme }) => theme.variables.sidebar.widthPx};
  border-right: 1px solid ${({ theme }) => theme.themeColors.borderColor};
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const DesktopSidebar = styled.div`
  position: sticky;
  top: 0px;
`

const Body = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)}px 0;
`

const LogoContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.borderColor};
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  padding-right: ${({ theme }) => theme.spacing(1)}px;
  padding-left: ${({ theme }) => theme.spacing(2)}px;

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
`

const StyledLudumLogo = styled(LudumLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.portlandOrange};
  height: 30px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

const StyledDareLogo = styled(DareLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.darkOrange};
  height: 30px;
`

const Sidebar = React.memo(() => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarOpen()

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false)
  }, [setIsSidebarOpen])

  const content = React.useMemo(() => {
    return (
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
    )
  }, [])

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
          {content}
        </StyledDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <DesktopSidebar>{content}</DesktopSidebar>
      </Hidden>
    </Fragment>
  )
})

export default Sidebar
