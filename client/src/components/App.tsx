import React from 'react'
import styled from 'styled-components/macro'
import { useMutation, gql, useQuery } from '@apollo/client'
import { isLoggedInVar } from 'cache'
import { Routes, Route } from 'react-router-dom'
import * as LoginTypes from './__generated__/Login'
import * as GetAppDataTypes from './__generated__/GetAppData'
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

const TallContent = styled.div`
  height: 1800px;
`

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const GET_DATA = gql`
  query GetAppData {
    isLoggedIn @client
  }
`

interface Props {}
export default function Root({}: Props) {
  const [login] = useMutation<LoginTypes.Login, LoginTypes.LoginVariables>(
    LOGIN,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login)
        isLoggedInVar(true)
      },
    }
  )

  const { data } = useQuery<GetAppDataTypes.GetAppData>(GET_DATA)

  return (
    <App>
      <Routes>
        <Route path="/:basePath*" element={<Sidebar />} />
      </Routes>
      <AppContent>
        <RoutesWithFallback>
          <Route path="/posts" element={<PostsPage />} />
          <Route
            path="/games"
            element={
              <TallContent>
                <button
                  onClick={() =>
                    login({
                      variables: {
                        email: 'noah.potter@outlook.com',
                        password: 'vhvL6YT7kQKRHNwVb3JG',
                      },
                    })
                  }
                >
                  Games {data?.isLoggedIn ? 'logged in' : 'logged out'}
                </button>
              </TallContent>
            }
          />
        </RoutesWithFallback>
      </AppContent>
    </App>
  )
}
