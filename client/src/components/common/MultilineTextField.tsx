/* eslint-disable react/jsx-no-duplicate-props */
import React, { useRef, useEffect } from 'react'

import TextField, { TextFieldProps } from '@material-ui/core/TextField'

interface Props {}
export type MutlilineTextFieldProps = Props & TextFieldProps
export default function MultilineTextField({
  onChange,
  ...others
}: MutlilineTextFieldProps) {
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
    <TextField
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
