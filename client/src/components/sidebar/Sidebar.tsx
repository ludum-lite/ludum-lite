import React, { Fragment } from 'react'
import styled from 'styled-components/macro'
import {
  List,
  ListItem as MuiListItem,
  ListItemText,
  Typography,
  Hidden,
  Drawer,
} from '@material-ui/core'
import { ReactComponent as LudumLogo } from 'assets/ludum.svg'
import { ReactComponent as DareLogo } from 'assets/dare.svg'

import { Link as RouterLink, useParams } from 'react-router-dom'
import GlobalNav from './GlobalNav'
import { useSidebarOpen } from 'hooks/useSidebarOpen'

const Root = styled.div`
  display: flex;
  height: 100%;
`

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorDockedLeft {
    border-right: none;
  }
`

const ContextualNav = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
  padding: 0px ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: ${({ theme }) => theme.spacing(30)}px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: ${({ theme }) => theme.spacing(34)}px;
  }
`

const Title = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: ${({ theme }) => theme.spacing(4)}px 0px;
`

const ListItem = styled(MuiListItem)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  transition: none;
  color: white;

  &.Mui-selected {
    background: ${({ theme }) => theme.themeColors.globalNavBackground};

    &:hover {
      background: ${({ theme }) => theme.themeColors.globalNavBackground};
    }
  }

  &:not(.Mui-selected) {
    &:hover {
      background: rgba(255, 255, 255, 0.24);
    }
  }
` as typeof MuiListItem

const StyledLudumLogo = styled(LudumLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.portlandOrange};
  height: 35px;
`

const StyledDareLogo = styled(DareLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.darkOrange};
  height: 35px;
  margin-top: 10px;
`
const paths = [
  {
    url: 'posts',
    text: 'Feed',
  },
  {
    url: 'games',
    text: 'Games',
  },
  {
    url: 'events',
    text: 'Events',
  },
]

const Sidebar = React.memo(() => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarOpen()

  const { basePath } = useParams()

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false)
  }, [setIsSidebarOpen])

  const content = React.useMemo(() => {
    return (
      <Root>
        <GlobalNav closeSidebar={closeSidebar} />
        <ContextualNav>
          <Title>
            <StyledLudumLogo />
            <StyledDareLogo />
          </Title>
          <List disablePadding>
            {paths.map((path) => (
              <ListItem
                key={path.url}
                button
                selected={basePath === path.url}
                component={RouterLink}
                to={`/${path.url}`}
                onClick={() => {
                  closeSidebar()
                }}
              >
                <ListItemText primary={path.text} />
              </ListItem>
            ))}
          </List>
        </ContextualNav>
      </Root>
    )
  }, [basePath, closeSidebar])

  return (
    <Fragment>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <StyledDrawer
          // variant="temporary"
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
        <StyledDrawer variant="permanent" open>
          {content}
        </StyledDrawer>
      </Hidden>
    </Fragment>
  )
})

export default Sidebar
