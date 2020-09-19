import React from 'react'
import { favoritedIdsVar } from 'resolvers'
import { useMe } from 'hooks/useMe'
import useUserLocalStorage from 'hooks/useUserLocalStorage'
import { useLogin } from 'hooks/useLogin'
import { useFeaturedEvent } from 'hooks/useFeaturedEvent'
import { getValidValue } from 'utils'
import useSelectedWidget from 'hooks/useSelectedWidget'

interface Props {
  children: React.ReactElement
}
export default function UserLoadedCheck({ children }: Props) {
  const { isLoggedIn } = useLogin()
  const { featuredEvent, hasLoaded: hasLoadedEvent } = useFeaturedEvent()
  const { hasLoaded: hasLoadedMe } = useMe()

  const [favoritedIds] = useUserLocalStorage('favoritedIds', [])
  const [selectedWidget, setSelectedWidget] = useSelectedWidget()

  React.useEffect(() => {
    if (hasLoadedMe) {
      favoritedIdsVar(favoritedIds)
    }
  }, [favoritedIds, hasLoadedMe])

  React.useEffect(() => {
    if (hasLoadedMe && hasLoadedEvent) {
      const validSelectedWidget = getValidValue(
        {
          countdown: true,
          game: isLoggedIn,
          team:
            typeof (isLoggedIn && featuredEvent?.currentUserGameId) ===
            'number',
        },
        selectedWidget
      )

      setSelectedWidget(validSelectedWidget || 'countdown')
    }
  }, [
    featuredEvent,
    isLoggedIn,
    selectedWidget,
    setSelectedWidget,
    hasLoadedMe,
    hasLoadedEvent,
  ])

  if (!hasLoadedMe || !hasLoadedEvent) {
    return null
  }

  console.log('has loaded me')

  return children
}
