import React from 'react'
import styled from 'styled-components/macro'

const Root = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) => theme.themeColors.backgrounds.level2};
  box-shadow: ${({ theme }) => theme.themeColors.cardBoxShadow_bottomHeavy};
  padding: ${({ theme }) => theme.spacing(2)}px;
`

interface Props {
  children: React.ReactElement
}
export default function WidgetContainer({ children }: Props) {
  return <Root>{children}</Root>
}
