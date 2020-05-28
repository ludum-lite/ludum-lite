import { singletonHook } from 'react-singleton-hook'
import { gql, useQuery } from '@apollo/client'
import * as Types from '__generated__/Types'

const init = false as const

export const useIsLoggedIn = singletonHook(init, () => {
  const { data } = useQuery<Types.GlobalIsLoggedIn>(GET_GLOBAL_DATA)

  return data?.isLoggedIn || false
})

const GET_GLOBAL_DATA = gql`
  query GlobalIsLoggedIn {
    isLoggedIn @client
  }
`
