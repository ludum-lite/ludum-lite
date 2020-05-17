import React from 'react'
import { singletonHook } from 'react-singleton-hook'

const init = [false, () => {}] as const

export const useHasNavigatedWithin = singletonHook(init, () => {
  const [hasNavigatedWithin, setHasNavigatedWithin] = React.useState(false)

  React.useEffect(() => {
    document.body.onclick = function (e) {
      let node: HTMLElement | null = e.target as HTMLElement
      let linkElement: HTMLAnchorElement | null = null

      while (node) {
        if (node.localName === 'a') {
          linkElement = node as HTMLAnchorElement
          node = null
        } else {
          node = node.parentNode as HTMLElement
        }
      }

      if (linkElement) {
        setHasNavigatedWithin(true)
      }

      return true // handle other clicks
    }
  }, [])

  return [hasNavigatedWithin, setHasNavigatedWithin] as const
})
