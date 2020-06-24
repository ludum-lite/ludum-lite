import { singletonHook } from 'react-singleton-hook'
import { gql } from '@apollo/client'
import { isLoggedInVar } from 'resolvers'
import { useGetMeDataQuery, Me } from '__generated__/client-types'
import { useEffect } from 'react'

type UseMeReturnType = {
  me: Me | null
  hasLoaded: boolean
}

const init: UseMeReturnType = {
  me: null,
  hasLoaded: false,
}

export const useMe = singletonHook(init, () => {
  const { data, loading } = useGetMeDataQuery({
    onCompleted(data) {
      if (data.me.__typename === 'UnauthorizedResponse') {
        isLoggedInVar(false)
        localStorage.removeItem('token')
      }
    },
  })

  useEffect(() => {
    if (data?.me.__typename === 'Me') {
      console.log(`Welcome - ${data.me.name}`)
    }
  }, [data])

  return {
    me: data?.me.__typename === 'Me' ? data.me : null,
    hasLoaded: !loading,
  }
})

gql`
  query GetMeData {
    me {
      ... on Me {
        id
        name
      }
    }
  }
`
