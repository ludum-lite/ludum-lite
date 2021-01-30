import React from 'react'
import styled from 'styled-components/macro'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.themeColors.cardBoxShadow_bottomHeavy};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: auto;
`

interface Props {
  className?: string
  children: React.ReactNode
}
export default function PreviousVoteList({ className, children }: Props) {
  return <Root className={className}>{children}</Root>
}

PreviousVoteList.displayName = 'PreviousVoteList'
