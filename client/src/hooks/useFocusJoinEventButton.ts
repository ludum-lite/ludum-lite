import React from 'react'
import { singletonHook } from 'react-singleton-hook'

type UseFocusJoinEventButtonReturnType = [boolean, (value: boolean) => void]

const init: UseFocusJoinEventButtonReturnType = [false, () => {}]

export const useFocusJoinEventButton = singletonHook(init, () => {
  const [isFocused, setIsJoinEventButtonFocused] = React.useState(false)

  return [
    isFocused,
    setIsJoinEventButtonFocused,
  ] as UseFocusJoinEventButtonReturnType
})
