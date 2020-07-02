import React from 'react'

/**
 * Only show a loading indicator if a request lasts a minimum amount of time (site feels more responsive with
 * fewer indicators shown)
 * If loading indicator is shown, ensure it shows for a minimum amount of time (to prevent flicker)
 */

type Options = {
  timeBeforeLoaderShown?: number
  showLoaderMinDuration?: number
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useMinLoadingTime<T extends (...args: any) => any>(
  fn: T,
  { timeBeforeLoaderShown = 200, showLoaderMinDuration = 400 }: Options = {}
): {
  fn: T
  isLoading: boolean
} {
  const [isLoading, setIsLoading] = React.useState(false)

  const wrappedFn = (React.useCallback(
    (...args) => {
      return new Promise((resolve, reject) => {
        let hasFinished = false
        let failed = false
        let startedForceLoading = false
        let doneForceLoading = false
        let resolvedData: ReturnType<T>

        fn(...args)
          .then((data: ReturnType<T>) => {
            resolvedData = data
            if (!startedForceLoading || doneForceLoading) {
              setIsLoading(false)
              resolve(resolvedData)
            }
          })
          .catch((e: any) => {
            failed = true
            setIsLoading(false)
            reject(e)
          })
          .finally(() => {
            hasFinished = true
          })

        sleep(timeBeforeLoaderShown).then(() => {
          startedForceLoading = true
          if (!hasFinished) {
            setIsLoading(true)
            sleep(showLoaderMinDuration).then(() => {
              doneForceLoading = true
              if (!failed && hasFinished) {
                setIsLoading(false)
                resolve(resolvedData)
              }
            })
          }
        })
      })
    },
    [fn, timeBeforeLoaderShown, showLoaderMinDuration]
  ) as unknown) as T

  return {
    fn: wrappedFn,
    isLoading,
  }
}
