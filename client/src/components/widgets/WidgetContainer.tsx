import React from 'react'
import styled from 'styled-components/macro'

const Root = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) => theme.themeColors.backgrounds.level2};
  border: 1px solid ${({ theme }) => theme.themeColors.borderColors.level2};
  padding: ${({ theme }) => theme.spacing(2)}px;
`

interface Props {
  children: React.ReactElement
}
export default function WidgetContainer({ children }: Props) {
  return <Root>{children}</Root>
}
