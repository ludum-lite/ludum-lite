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
`

const Widgets = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 300px;
`

const StyledCountdownWidget = styled(CountdownWidget)`
  max-height: 600px;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px`};
  border-radius: ${({ theme }) =>
    `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`};
`

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
          </RoutesWithFallback>
        </AppContent>
        <WidgetsContainer>
          <Widgets>
            <StyledCountdownWidget events={events} />
          </Widgets>
        </WidgetsContainer>
        {loginComponent}
      </App>
    )
  }

  return null
}
