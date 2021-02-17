/* eslint-disable react/jsx-no-duplicate-props */
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/macro'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import '@webscopeio/react-textarea-autocomplete/style.css'

const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    overflow: hidden;
  }
`

interface Props {}
export type MutlilineTextFieldProps = Props & TextFieldProps
const MultilineTextField = React.forwardRef(
  ({ onChange, value, ...others }: MutlilineTextFieldProps, ref) => {
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
        inputRef={(_ref) => {
          myInputRef.current = _ref

          if (typeof ref === 'function') {
            // @ts-ignore
            ref(_ref)
          } else {
            // @ts-ignore
            ref.current = _ref
          }
        }}
        {...others}
      />
    )
  }
)

MultilineTextField.displayName = 'MultilineTextField'

export default MultilineTextField
