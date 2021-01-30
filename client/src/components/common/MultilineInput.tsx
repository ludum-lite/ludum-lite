/* eslint-disable react/jsx-no-duplicate-props */
import React, { useRef, useEffect } from 'react'

import Input, { Props as InputProps } from './mui/Input'

export default function MultilineInput({ onChange, ...others }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const updateHeight = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    updateHeight()
  }, [])

  return (
    <Input
      onChange={(e) => {
        if (onChange) {
          onChange(e)
        }
        updateHeight()
      }}
      fullWidth
      multiline
      rows="4"
      inputRef={inputRef}
      {...others}
    />
  )
}

MultilineInput.displayName = 'MultilineInput'
