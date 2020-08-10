import React, { useEffect, Fragment } from 'react'
import styled from 'styled-components/macro'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Icon from 'components/common/mui/Icon'
import IconButton from 'components/common/mui/IconButton'
import { useHasNavigatedWithin } from 'hooks/useHasNavigatedWithin'
import { useNavigate } from 'react-router'
import Link from 'components/common/mui/Link'

const CARD_MARGIN = 32
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
`

const Card = styled.div`
  max-width: 900px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: ${CARD_MARGIN}px;
  z-index: 1;
`

interface ActionRowTopProps {
  hideActionRow: boolean
}
const ActionRowTop = styled.div<ActionRowTopProps>`
  position: sticky;
  top: ${({ hideActionRow }) => !hideActionRow && `-${BORDER_RADIUS}px`};
  background: ${({ theme }) => theme.themeColors.popupPage.background};
  padding: ${({ hideActionRow }) =>
    hideActionRow ? `${BORDER_RADIUS}px 0 0` : `${BORDER_RADIUS}px 0`};
  margin-bottom: ${({ hideActionRow }) =>
    !hideActionRow && `-${BORDER_RADIUS}px`};
  border-radius: ${BORDER_RADIUS}px ${BORDER_RADIUS}px 0 0;
  z-index: 1;
`

const ActionRowContainer = styled.div`
  position: sticky;
  top: ${BORDER_RADIUS}px;
  background: ${({ theme }) => theme.themeColors.popupPage.background};
  display: flex;
  align-items: flex-end;
  z-index: 1;
`

const ActionRow = styled.div`
  flex: 1 1 0px;
  display: flex;
  padding: ${ACTION_ROW_PADDING}px;
  padding-top: 0;
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
  border-radius: 0 0 ${BORDER_RADIUS}px ${BORDER_RADIUS}px;
`

interface Props {
  children: React.ReactNode
  actionRow?: React.ReactNode
  previousPath?: string
  hideActionRow?: boolean
}
export default function PopupPage({
  children,
  actionRow,
  previousPath,
  hideActionRow = false,
}: Props) {
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
        <ActionRowTop hideActionRow={hideActionRow} />
        {!hideActionRow && (
          <Fragment>
            <ActionRowContainer>
              <ActionRow>
                {previousPath && (
                  <IconButton
                    component={Link}
                    // @ts-ignore
                    to={previousPath}
                    onClick={(e: any) => {
                      if (hasNavigatedWithin) {
                        e.preventDefault()
                        navigate(-1)
                      }
                    }}
                  >
                    <Icon icon={ChevronLeft} />
                  </IconButton>
                )}
                {actionRow}
              </ActionRow>
            </ActionRowContainer>
            <ActionRowShadow />
          </Fragment>
        )}
        <Content>{children}</Content>
      </Card>
    </Root>
  )
}
