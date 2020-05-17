import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Routes, Route } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { isLoggedInVar } from 'resolvers'
import Sidebar from './side-bar/Sidebar'
import RoutesWithFallback from './common/RoutesWithFallback'
import PostsPage from 'components/posts/PostsPage'
import * as Types from '__generated__/Types'
import { ThemeMode } from 'utils/types'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import PostPage from './posts/PostPage'
import { useLogin } from 'hooks/useLogin'
import { useHasNavigatedWithin } from 'hooks/useHasNavigatedWithin'

interface AppProps {
  showingOverlay: boolean
}
const App = styled.div<AppProps>`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.themeColors.background};

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

const GET_APP_DATA = gql`
  query GetAppData {
    me {
      ... on Me {
        id
      }
    }
  }
`

interface Props {
  toggleTheme: () => void
  themeMode: ThemeMode
}
export default function Root({ toggleTheme, themeMode }: Props) {
  useHasNavigatedWithin()
  const [postOverlayed] = usePostOverlayed()
  const [hasLoadedUser, setHasLoadedUser] = React.useState(false)
  const { loginComponent } = useLogin()

  useQuery<Types.GetAppData>(GET_APP_DATA, {
    onCompleted(data) {
      if (data.me.__typename === 'UnauthorizedResponse') {
        isLoggedInVar(false)
        localStorage.removeItem('token')
      }

      setHasLoadedUser(true)
    },
  })

  if (hasLoadedUser) {
    return (
      <App showingOverlay={postOverlayed}>
        <Routes>
          <Route
            path="/:basePath*"
            element={
              <Sidebar toggleTheme={toggleTheme} themeMode={themeMode} />
            }
          />
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
