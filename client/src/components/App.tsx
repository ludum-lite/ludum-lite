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

interface AppProps {
  showingOverlay: boolean
}
const App = styled.div<AppProps>`
  display: flex;
  min-height: 100vh;

  ${({ showingOverlay }) =>
    showingOverlay &&
    css`
      height: 100vh;
      overflow: hidden;
    `}
`

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing(42)}px;
  flex: 1 1 auto;
  position: relative;
  max-width: 700px;
`

const WidgetsContainer = styled.div`
  display: flex;
  position: relative;
  min-width: 277px;
  width: 277px;
`

const Widgets = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: inherit;

  & > * {
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;

    &:first-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &:not(:first-child) {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

const StyledCountdownWidget = styled(CountdownWidget)`
  max-height: 600px;
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
export default function Root({}: Props) {
  useHasNavigatedWithin()
  const [postOverlayed] = usePostOverlayed()
  const { loginComponent } = useLogin()
  const { hasLoaded } = useMe()

  if (hasLoaded) {
    return (
      <App showingOverlay={postOverlayed}>
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
            <GameWidget />
            <TeamWidget />
          </Widgets>
        </WidgetsContainer>
        {loginComponent}
      </App>
    )
  }

  return null
}
