import React from 'react'
import styled from 'styled-components/macro'

type Variant = 'primary' | 'secondary'

interface RootProps {
  variant: Variant
}
const Root = styled.div<RootProps>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 3px ${({ theme }) => theme.spacing(1.5)}px;
  background: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.themeColors.tag.primaryBackground
      : theme.themeColors.tag.secondaryBackground};
  color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.themeColors.tag.primaryColor
      : theme.themeColors.tag.secondaryColor};
`

interface Props {
  variant: Variant
  children: React.ReactNode
}
export default function Tag({ variant, children }: Props) {
  return <Root variant={variant}>{children}</Root>
}
