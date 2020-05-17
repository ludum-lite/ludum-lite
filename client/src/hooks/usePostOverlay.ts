import React from 'react'
import { singletonHook } from 'react-singleton-hook'

const init = [false, () => {}] as const

export const usePostOverlayed = singletonHook(init, () => {
  const [postOverlayed, setPostOverlayed] = React.useState(false)

  return [postOverlayed, setPostOverlayed] as const
})
