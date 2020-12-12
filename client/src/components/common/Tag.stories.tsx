import React from 'react'
import styled from 'styled-components/macro'
import Tag from './Tag'

export default {
  title: 'Tag',
  component: Tag,
}
const BasicRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Basic = () => {
  return (
    <BasicRoot>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
    </BasicRoot>
  )
}
