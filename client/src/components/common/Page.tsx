import React, { useEffect } from 'react'
import styled, { css } from 'styled-components/macro'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import { borderRadius } from 'polished'

interface RootProps {
  postOverlayed: boolean
}
const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: column;
  z-index: 200;
  margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(4)}px`};
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* height: 36px; */
`

const BreadcrumbContainer = styled.div`
  flex: 1 1 auto;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  margin-right: ${({ theme }) => theme.spacing(3)}px;
`

const ActionRowContainer = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: flex-end;
`

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)}px;
  ${({ theme }) => borderRadius('top', theme.shape.borderRadius)};
  background: white;
  /* margin-bottom: ${({ theme }) => -theme.shape.borderRadius}px; */
  /* padding-bottom: ${({ theme }) => theme.shape.borderRadius}px; */
  background: ${({ theme }) => theme.themeColors.page.actionsBackground};
  box-shadow: inset 0 -9px 8px -8px rgb(0, 0, 0, 0.22);
`

interface CardProps {
  hasActionRow: boolean
}
const Card = styled.div<CardProps>`
  max-width: 900px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background: ${({ theme }) => theme.themeColors.page.background};
  border-radius: ${({ theme }) => theme.spacing(1)}px;

  ${({ hasActionRow }) =>
    hasActionRow &&
    css`
      border-top-right-radius: 0;
    `};
`
interface Props {
  children: React.ReactNode
  actionRow?: React.ReactNode
  breadcrumbs?: React.ReactNode
}
export default function Page({ children, actionRow, breadcrumbs }: Props) {
  const [postOverlayed, setUsePostOverlay] = usePostOverlayed()

  useEffect(() => {
    return () => {
      setUsePostOverlay(false)
    }
  }, [setUsePostOverlay])

  return (
    <Root postOverlayed={postOverlayed}>
      <TopRow>
        <BreadcrumbContainer>{breadcrumbs}</BreadcrumbContainer>
        {actionRow && (
          <ActionRowContainer>
            <ActionRow>{actionRow}</ActionRow>
          </ActionRowContainer>
        )}
      </TopRow>
      <Card hasActionRow={Boolean(actionRow)}>{children}</Card>
    </Root>
  )
}
