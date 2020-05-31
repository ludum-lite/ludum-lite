import { singletonHook } from 'react-singleton-hook'
import { gql, useQuery } from '@apollo/client'
import * as Types from '__generated__/Types'
import { isLoggedInVar } from 'resolvers'

const GET_ME_DATA = gql`
  query GetMeData {
    me {
      ... on Me {
        id
      }
    }
  }
`

type UseMeReturnType = {
  me: Types.GetMeData_me_Me | null
  hasLoaded: boolean
}

const init: UseMeReturnType = {
  me: null,
  hasLoaded: false,
}

export const useMe = singletonHook(init, () => {
  const { data, loading } = useQuery<Types.GetMeData>(GET_ME_DATA, {
    onCompleted(data) {
      if (data.me.__typename === 'UnauthorizedResponse') {
        isLoggedInVar(false)
        localStorage.removeItem('token')
      }
    },
  })

  return {
    me: data?.me.__typename === 'Me' ? data.me : null,
    hasLoaded: !loading,
  }
})
