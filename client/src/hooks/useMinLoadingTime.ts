import React from 'react'

/**
 * Only show a loading indicator if a request lasts a minimum amount of time (site feels more responsive with
 * fewer indicators shown)
 * If loading indicator is shown, ensure it shows for a minimum amount of time (to prevent flicker)
 */

const TIME_BEFORE_LOADER_SHOWN = 200
const SHOW_LOADER_MIN_DURATION = 400

export const useMinLoadingTime = (isLoading: boolean) => {
  const isLoadingRef = React.useRef<boolean>(isLoading)
  const [forceIsLoading, setForceIsLoading] = React.useState<
    boolean | undefined
  >(undefined)

  if (!isLoadingRef.current && isLoading) {
    setForceIsLoading(false)
  }

  isLoadingRef.current = isLoading

  React.useEffect(() => {
    if (isLoading) {
      setForceIsLoading(false)
      let startedForceLoading = false

      const timeoutId = setTimeout(() => {
        startedForceLoading = true
        setForceIsLoading(true)
        setTimeout(() => {
          setForceIsLoading(undefined)
        }, SHOW_LOADER_MIN_DURATION)
      }, TIME_BEFORE_LOADER_SHOWN)

      return () => {
        clearTimeout(timeoutId)

        if (!startedForceLoading) {
          setForceIsLoading(undefined)
        }
      }
    }
  }, [isLoading])

  // TODO also return a promise so that onComplete handlers can await to show success/failure messages after the loading resolves
  return forceIsLoading === undefined ? isLoading : forceIsLoading
}
