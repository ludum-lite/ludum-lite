import React from 'react'
import { singletonHook } from 'react-singleton-hook'

const init = {
  activePostId: null,
  setActivePostId: () => {},
  resetActivePostId: () => {},
} as const

export const useActivePostId = singletonHook(init, () => {
  const [activePostId, setActivePostId] = React.useState<null | number>(null)

  const resetActivePostId = React.useCallback(() => {
    setActivePostId(null)
  }, [])

  return {
    activePostId,
    setActivePostId,
    resetActivePostId,
  } as const
})
