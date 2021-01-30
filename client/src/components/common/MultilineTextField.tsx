/* eslint-disable react/jsx-no-duplicate-props */
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/macro'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    overflow: hidden;
  }
`

interface Props {}
export type MutlilineTextFieldProps = Props & TextFieldProps
export default function MultilineTextField({
  onChange,
  inputRef,
  value,
  ...others
}: MutlilineTextFieldProps) {
  const myInputRef = useRef<HTMLInputElement>()

  const updateHeight = () => {
    if (myInputRef && myInputRef.current) {
      myInputRef.current.style.height = 'auto'
      myInputRef.current.style.height = myInputRef.current.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    updateHeight()
  }, [value])

  return (
    <StyledTextField
      onChange={(e) => {
        if (onChange) {
          onChange(e)
        }

        if (value === undefined) {
          updateHeight()
        }
      }}
      fullWidth
      multiline
      rows="4"
      value={value}
      inputRef={(ref) => {
        if (inputRef) {
          // @ts-ignore
          inputRef.current = ref
        }

        myInputRef.current = ref
      }}
      {...others}
    />
  )
}

MultilineTextField.displayName = 'MultilineTextField'
