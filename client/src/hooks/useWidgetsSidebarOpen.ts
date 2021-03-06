import React from 'react'
import { singletonHook } from 'react-singleton-hook'

const init = {
  isWidgetsSidebarOpen: false,
  setIsWidgetsSidebarOpen: () => {},
} as const

export const useWidgetsSidebarOpen = singletonHook(init, () => {
  const [isWidgetsSidebarOpen, setIsWidgetsSidebarOpen] = React.useState(false)

  return {
    isWidgetsSidebarOpen,
    setIsWidgetsSidebarOpen,
  } as const
})
