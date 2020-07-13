import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import RoutesWithFallback from './common/RoutesWithFallback'
import PostsPage from 'components/posts/PostsPage'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import PostPage from './posts/PostPage'
import { useLogin } from 'hooks/useLogin'
import { useHasNavigatedWithin } from 'hooks/useHasNavigatedWithin'
import { useMe } from 'hooks/useMe'
import CountdownWidget from './sidebar/CountdownWidget'
import { events } from 'utils'
import TeamWidget from './team-widget/TeamWidget'
import GameWidget from './game-widget/GameWidget'
import InvitePage from './team-widget/InvitePage'
import AcceptedInvitePage from './team-widget/AcceptedInvitePage'
import ConfirmInviteAndAddToTeamPage from './team-widget/ConfirmInviteAndAddToTeamPage'
import { AppBar, Toolbar, Hidden } from '@material-ui/core'
import IconButton from 'components/common/mui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useSidebarOpen } from 'hooks/useSidebarOpen'

const Root = styled.div``

interface AppProps {
  showingOverlay: boolean
}
const AppBody = styled.div<AppProps>`
  display: flex;
  min-height: 100vh;

  ${({ showingOverlay }) =>
    showingOverlay &&
    css`
      height: 100vh;
      overflow: hidden;
    `}

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column-reverse;
  }
`

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-left: ${({ theme }) => theme.spacing(42)}px;
    max-width: 700px;
  }
`

const WidgetsContainer = styled.div`
  display: flex;
  position: relative;
  min-width: 277px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 0 ${({ theme }) => theme.spacing(4)}px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
    width: 277px;
  }
`

const Widgets = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  width: inherit;
  overflow: hidden;
  margin-bottom: -${({ theme }) => theme.spacing(1)}px;
  margin-top: -${({ theme }) => theme.shape.borderRadius}px;
  margin-right: -${({ theme }) => theme.shape.borderRadius}px;

  & > * {
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    overflow: hidden;
    margin-right: ${({ theme }) => theme.spacing(1)}px;
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;

    /* This makes sure a single widget won't be too wide. If there's more than
    one widget, they'll take up enough space so that an explicit max width isn't necessary */
    &:first-child:last-child {
      max-width: 400px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: center;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    flex-direction: column;
  }
`

const widgetContainerStyles = css`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex: 1 0 auto;
  }
`

const StyledCountdownWidget = styled(CountdownWidget)`
  max-height: 600px;
  ${widgetContainerStyles}
`

const StyledGameWidget = styled(GameWidget)`
  ${widgetContainerStyles}
`

const StyledTeamWidget = styled(TeamWidget)`
  ${widgetContainerStyles}
`

const StyledAppBar = styled(AppBar)`
  background: ${({ theme }) => theme.themeColors.appBar.background};
`

const StyledLeftIcon = styled(IconButton)`
  margin: 6px;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    margin: 2px;
  }
`

// const NotificationBar = styled.div`
//   background: ${({ theme }) => theme.themeColors.globalNavBackground};
//   display: flex;
//   align-items: center;
//   padding: 0 ${({ theme }) => theme.spacing(2)}px;
//   height: ${({ theme }) => theme.spacing(8)}px;
//   color: white;
// `

interface Props {}
export default function App({}: Props) {
  useHasNavigatedWithin()
  const { setIsSidebarOpen } = useSidebarOpen()
  const [postOverlayed] = usePostOverlayed()
  const { loginComponent } = useLogin()
  const { hasLoaded } = useMe()

  const onClickLeftIcon = React.useCallback(() => {
    setIsSidebarOpen(true)
  }, [setIsSidebarOpen])

  if (hasLoaded) {
    return (
      <Root>
        <Hidden mdUp>
          <StyledAppBar position="sticky">
            <Toolbar disableGutters>
              <StyledLeftIcon
                aria-label="menu"
                background="globalNav"
                onClick={onClickLeftIcon}
              >
                <MenuIcon />
              </StyledLeftIcon>
            </Toolbar>
          </StyledAppBar>
        </Hidden>
        <AppBody showingOverlay={postOverlayed}>
          <Routes>
            <Route path="/:basePath*" element={<Sidebar />} />
          </Routes>
          <AppContent>
            {/* <NotificationBar>
              <Typography variant="h6">Theme Suggestions are open!</Typography>
            </NotificationBar> */}
            <RoutesWithFallback>
              <Route path="/posts" element={<PostsPage />} />
              {postOverlayed ? (
                <Route
                  path="/posts/:id"
                  element={
                    <>
                      <PostsPage />
                      <PostPage />
                    </>
                  }
                />
              ) : (
                <Route path="/posts/:id" element={<PostPage />} />
              )}
              <Route path="/posts/:id/edit" element={<PostPage isEditing />} />
              <Route path="/invite/:userId" element={<InvitePage />} />
              <Route
                path="/accepted-invite/:userId"
                element={<AcceptedInvitePage />}
              />
              <Route
                path="/confirm-invite/:userId"
                element={<ConfirmInviteAndAddToTeamPage />}
              />
            </RoutesWithFallback>
          </AppContent>
          <WidgetsContainer>
            <Widgets>
              <StyledCountdownWidget events={events} />
              <StyledGameWidget />
              <StyledTeamWidget />
            </Widgets>
          </WidgetsContainer>
          {loginComponent}
        </AppBody>
      </Root>
    )
  }

  return null
}
