import React from 'react'
import { useLocation } from 'react-router'
import { singletonHook } from 'react-singleton-hook'

const init = [false, () => {}] as const

export const useHasNavigatedWithin = singletonHook(init, () => {
  const location = useLocation()
  const initialPathname = React.useRef(location.pathname)
  const [hasNavigatedWithin, setHasNavigatedWithin] = React.useState(false)

  React.useEffect(() => {
    if (location.pathname !== initialPathname.current) {
      setHasNavigatedWithin(true)
    }
  }, [location.pathname])

  return [hasNavigatedWithin, setHasNavigatedWithin] as const
})
