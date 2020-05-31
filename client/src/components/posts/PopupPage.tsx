import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { IconButton } from '@material-ui/core'
import { useHasNavigatedWithin } from 'hooks/useHasNavigatedWithin'
import { useNavigate } from 'react-router'

const CARD_MARGIN = 16
const BORDER_RADIUS = 8
const ACTION_ROW_INNER_HEIGHT = 48
const ACTION_ROW_PADDING = 8
const ACTION_ROW_HEIGHT = ACTION_ROW_INNER_HEIGHT + ACTION_ROW_PADDING * 2
const SHADOW_HEIGHT = 14

interface RootProps {
  postOverlayed: boolean
}
const Root = styled.div<RootProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
`

const Card = styled.div`
  max-width: 900px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: ${CARD_MARGIN}px;
  padding-left: 0;
  z-index: 1;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
`

const ActionRowTop = styled.div`
  position: sticky;
  top: -${BORDER_RADIUS}px;
  background: ${({ theme }) => theme.themeColors.popupPage.background};
  padding: ${BORDER_RADIUS}px 0;
  margin-bottom: -${BORDER_RADIUS}px;
  border-radius: ${BORDER_RADIUS}px ${BORDER_RADIUS}px 0 0;
  z-index: 1;
`

const ActionRowContainer = styled.div`
  position: sticky;
  top: ${BORDER_RADIUS}px;
  background: ${({ theme }) => theme.themeColors.popupPage.background};
  height: ${ACTION_ROW_HEIGHT - BORDER_RADIUS}px;
  display: flex;
  align-items: flex-end;
  z-index: 1;
`

const ActionRow = styled.div`
  flex: 1 1 0px;
  display: flex;
  align-items: center;
  padding: ${ACTION_ROW_PADDING}px;
`

const ActionRowShadow = styled.div`
  position: sticky;
  top: ${ACTION_ROW_HEIGHT + 14}px;

  &:after {
    content: '';
    position: absolute;
    top: -${SHADOW_HEIGHT}px;
    left: 0;
    right: 0;
    height: ${SHADOW_HEIGHT}px;
    box-shadow: inset 0px 10px ${SHADOW_HEIGHT}px -10px rgba(0, 0, 0, 0.15);
  }
`

const Content = styled.div`
  flex: 1 1 0px;
  /* padding: ${({ theme }) =>
    `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 26px`}; */
  background: ${({ theme }) => theme.themeColors.popupPage.background};
  border-radius: 0 0 20px 20px;
`

interface Props {
  children: React.ReactNode
  actionRow?: React.ReactNode
}
export default function PopupPage({ children, actionRow }: Props) {
  const [postOverlayed, setUsePostOverlay] = usePostOverlayed()
  const [hasNavigatedWithin] = useHasNavigatedWithin()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      setUsePostOverlay(false)
    }
  }, [setUsePostOverlay])

  return (
    <Root postOverlayed={postOverlayed}>
      <Card>
        <ActionRowTop />
        <ActionRowContainer>
          <ActionRow>
            <IconButton
              href="/posts"
              onClick={(e) => {
                if (hasNavigatedWithin) {
                  e.preventDefault()
                  navigate(-1)
                }
              }}
            >
              <ChevronLeft />
            </IconButton>
            {actionRow}
          </ActionRow>
        </ActionRowContainer>
        <ActionRowShadow />
        <Content>{children}</Content>
      </Card>
    </Root>
  )
}
