import React from 'react'
import styled from 'styled-components/macro'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import RoutesWithFallback from './RoutesWithFallback'
import PostsPage from 'components/posts/PostsPage'

const App = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.themeColors.background};
`

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing(42)}px;
  flex: 1 1 auto;
`

interface Props {}
export default function Root({}: Props) {
  return (
    <App>
      <Routes>
        <Route path="/:basePath*" element={<Sidebar />} />
      </Routes>
      <AppContent>
        <RoutesWithFallback>
          <Route path="/posts" element={<PostsPage />} />
        </RoutesWithFallback>
      </AppContent>
    </App>
  )
}
