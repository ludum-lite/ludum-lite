import React, { useEffect, Fragment } from 'react'
import styled, { css } from 'styled-components/macro'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import { borderRadius } from 'polished'

const BORDER_RADIUS = 8
const ACTION_ROW_INNER_HEIGHT = 48
const ACTION_ROW_PADDING = 8
const ACTION_ROW_HEIGHT = ACTION_ROW_INNER_HEIGHT + ACTION_ROW_PADDING * 2
const SHADOW_HEIGHT = 14

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
  background: ${({ theme }) => theme.themeColors.popupPage.actionsBackground};
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
  background: ${({ theme }) => theme.themeColors.popupPage.background};
  border-radius: ${BORDER_RADIUS}px;

  ${({ hasActionRow }) =>
    hasActionRow &&
    css`
      border-top-right-radius: 0;
    `};
`

// interface ActionRowTopProps {
//   hideActionRow: boolean
// }
// const ActionRowTop = styled.div<ActionRowTopProps>`
//   position: sticky;
//   top: ${({ hideActionRow }) => !hideActionRow && `-${BORDER_RADIUS}px`};
//   background: ${({ theme }) => theme.themeColors.popupPage.background};
//   padding: ${({ hideActionRow }) =>
//     hideActionRow ? `${BORDER_RADIUS}px 0 0` : `${BORDER_RADIUS}px 0`};
//   margin-bottom: ${({ hideActionRow }) =>
//     !hideActionRow && `-${BORDER_RADIUS}px`};
//   border-radius: ${BORDER_RADIUS}px ${BORDER_RADIUS}px 0 0;
//   z-index: 3;
// `

// const ActionRow = styled.div`
//   position: sticky;
//   top: ${BORDER_RADIUS}px;
//   background: ${({ theme }) => theme.themeColors.popupPage.background};
//   display: flex;
//   align-items: stretch;
//   z-index: 3;
//   min-height: ${ACTION_ROW_INNER_HEIGHT + ACTION_ROW_PADDING}px;
// `

// const ActionRow = styled.div`
//   flex: 1 1 0px;
//   display: flex;
//   align-items: center;
//   padding-bottom: ${ACTION_ROW_PADDING}px;
// `

// const ActionRowShadow = styled.div`
//   position: sticky;
//   top: ${ACTION_ROW_HEIGHT + 14}px;

//   &:after {
//     content: '';
//     position: absolute;
//     top: -${SHADOW_HEIGHT}px;
//     left: 0;
//     right: 0;
//     height: ${SHADOW_HEIGHT}px;
//     box-shadow: inset 0px 10px ${SHADOW_HEIGHT}px -10px rgba(0, 0, 0, 0.15);
//   }
// `

// const Content = styled.div`
//   flex: 1 1 0px;
//   /* padding: ${({ theme }) =>
//     `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 26px`}; */
//   background: ${({ theme }) => theme.themeColors.popupPage.background};
//   border-radius: 0 0 ${BORDER_RADIUS}px ${BORDER_RADIUS}px;
// `

interface Props {
  children: React.ReactNode
  actionRow?: React.ReactNode
  breadcrumbs?: React.ReactNode
  hideActionRow?: boolean
}
export default function PopupPage({
  children,
  actionRow,
  breadcrumbs,
  hideActionRow = false,
}: Props) {
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
