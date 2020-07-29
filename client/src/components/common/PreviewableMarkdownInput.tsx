import React from 'react'
import styled from 'styled-components/macro'
import MarkdownInput from 'components/common/MarkdownInput'
import Markdown from './Markdown'

const Root = styled.div``

interface Props {
  state: 'write' | 'preview'
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  value?: string
  className?: string
}
export default function PreviewableMarkdownInput({
  state,
  onChange,
  onBlur,
  value,
  className,
}: Props) {
  return (
    <Root className={className}>
      {state === 'write' ? (
        <MarkdownInput
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="Body"
        />
      ) : (
        <Markdown source={value || '-- No Body --'} />
      )}
    </Root>
  )
}
