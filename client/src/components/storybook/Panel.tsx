import React from 'react'
import styled, { css } from 'styled-components/macro'

interface RootProps {
  layout: 'row' | 'column'
}
const Root = styled.div<RootProps>`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  background: ${({ theme }) => theme.themeColors.popupPage.background};

  ${({ layout, theme }) => {
    if (layout === 'row') {
      return css`
        flex-direction: row;

        & > * {
          margin-right: ${({ theme }) => theme.spacing(1)}px;
        }
      `
    } else if (layout === 'column') {
      return css`
        flex-direction: column;

        & > * {
          margin-bottom: ${({ theme }) => theme.spacing(1)}px;
        }
      `
    }
  }}
`

interface Props {
  layout?: 'row' | 'column'
  className?: string
  children: React.ReactNode
}
export default function Panel({ className, children, layout = 'row' }: Props) {
  return (
    <Root className={className} layout={layout}>
      {children}
    </Root>
  )
}
