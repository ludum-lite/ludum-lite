import { singletonHook } from 'react-singleton-hook'
import { gql } from '@apollo/client'
import { useGetFeaturedEventDataQuery, Event } from '__generated__/client-types'

type UseMeReturnType = {
  featuredEvent: Event | null
  hasLoaded: boolean
}

const init: UseMeReturnType = {
  featuredEvent: null,
  hasLoaded: false,
}

export const useFeaturedEvent = singletonHook(init, () => {
  const { data } = useGetFeaturedEventDataQuery()

  return {
    featuredEvent:
      data?.featuredEvent.__typename === 'Event' ? data.featuredEvent : null,
  }
})

gql`
  query GetFeaturedEventData {
    featuredEvent {
      ... on Event {
        id
        currentUserGameId
      }
    }
  }
`
