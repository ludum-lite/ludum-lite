import React from 'react'
import styled from 'styled-components/macro'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import RoutesWithFallback from './common/RoutesWithFallback'
import PostsPage from 'components/posts/PostsPage'
import GamesPage from 'components/games/GamesPage'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import PostPage from './posts/PostPage'
import { useLogin } from 'hooks/useLogin'
import { useHasNavigatedWithin } from 'hooks/useHasNavigatedWithin'
import { useMe } from 'hooks/useMe'
import InvitePage from './team-widget/InvitePage'
import AcceptedInvitePage from './team-widget/AcceptedInvitePage'
import ConfirmInviteAndAddToTeamPage from './team-widget/ConfirmInviteAndAddToTeamPage'
import EventPage from './events/EventPage'
import { ROUTES } from './routes/routes'
import NewPostPage from './posts/NewPostPage'
import Topbar from './topbar/Topbar'
import WidgetsSidebar from './widgets-sidebar/WidgetsSidebar'
import { useNotificationBar } from 'hooks/useNotificationBar'

const Root = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`

const AppContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0px;
  position: relative;
  max-width: 1100px;
`

const MiddleContent = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
`

export default function App() {
  useHasNavigatedWithin()
  const [postOverlayed] = usePostOverlayed()
  const { loginComponent } = useLogin()
  const { hasLoaded } = useMe()
  const { notificationBar } = useNotificationBar()

  if (hasLoaded) {
    return (
      <Root>
        <AppContent>
          <Routes>
            <Route path="/:basePath*" element={<Sidebar />} />
          </Routes>
          <MiddleContent>
            {notificationBar}
            {/* <NotificationBar /> */}
            <Topbar />
            <RoutesWithFallback>
              <Route path={ROUTES.EVENT.SINGLE_BASE} element={<EventPage />} />
              <Route path={ROUTES.EVENT.SINGLE} element={<EventPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/games" element={<GamesPage />} />
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
              <Route path="/posts/new" element={<NewPostPage />} />
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
          </MiddleContent>
          <WidgetsSidebar />
        </AppContent>
        {/* <Hidden mdUp>
          Move to Sidebar
          <MobileWidgetContainer>
            {isLoggedIn && (
              <WidgetSelector>
                <WidgetSelectorButton
                  active={selectedWidget === 'countdown'}
                  onClick={() => setSelectedWidget('countdown')}
                >
                  <Icon icon={QueryBuilderIcon} />
                </WidgetSelectorButton>
                <WidgetSelectorButton
                  active={selectedWidget === 'game'}
                  onClick={() => setSelectedWidget('game')}
                >
                  <Icon icon={VideogameAssetIcon} />
                </WidgetSelectorButton>
                {featuredEvent?.currentUserGameId && (
                  <WidgetSelectorButton
                    active={selectedWidget === 'team'}
                    onClick={() => setSelectedWidget('team')}
                  >
                    <Icon icon={PeopleAltIcon} />
                  </WidgetSelectorButton>
                )}
              </WidgetSelector>
            )}
            <Widgets>
              {isLoggedIn ? (
                <Fragment>
                  <StyledCountdownWidget
                    hide={selectedWidget !== 'countdown'}
                    events={events}
                    hasTabs
                  />
                  <StyledGameWidget
                    hide={selectedWidget !== 'game'}
                    hasTabs
                  />
                  <StyledTeamWidget
                    hide={selectedWidget !== 'team'}
                    hasTabs
                  />
                </Fragment>
              ) : (
                <StyledCountdownWidget events={events} />
              )}
            </Widgets>
          </MobileWidgetContainer>
        </Hidden> */}
        {loginComponent}
      </Root>
    )
  }

  return <div />
}

App.displayName = 'App'
