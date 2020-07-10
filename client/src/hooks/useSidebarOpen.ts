import React from 'react'
import { singletonHook } from 'react-singleton-hook'

const init = {
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
} as const

export const useSidebarOpen = singletonHook(init, () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return {
    isSidebarOpen,
    setIsSidebarOpen,
  } as const
})
