import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './side-bar/Sidebar'
import RoutesWithFallback from './common/RoutesWithFallback'
import PostsPage from 'components/posts/PostsPage'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import PostPage from './posts/PostPage'
import { useLogin } from 'hooks/useLogin'
import { useHasNavigatedWithin } from 'hooks/useHasNavigatedWithin'
import { useMe } from 'hooks/useMe'

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
        {loginComponent}
      </App>
    )
  }

  return null
}
