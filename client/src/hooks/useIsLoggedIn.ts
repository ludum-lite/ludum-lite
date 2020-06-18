import { singletonHook } from 'react-singleton-hook'
import { gql } from '@apollo/client'
import { useGlobalIsLoggedInQuery } from '__generated__/client-types'

const init = false as const

export const useIsLoggedIn = singletonHook(init, () => {
  const { data } = useGlobalIsLoggedInQuery()

  return data?.isLoggedIn || false
})

gql`
  query GlobalIsLoggedIn {
    isLoggedIn @client
  }
`
