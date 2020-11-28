import React from 'react'
import styled, { css } from 'styled-components/macro'
import { events } from 'utils'
import CountdownWidget from '../sidebar/CountdownWidget'
import TeamWidget from '../team-widget/TeamWidget'
import GameWidget from '../game-widget/GameWidget'
import StickyBox from 'react-sticky-box'

const WidgetsContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

const Widgets = styled(StickyBox)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 277px;
  width: 277px;
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
`

interface CommonWidgetProps {
  hide?: boolean
  hasTabs?: boolean
}
const widgetContainerStyles = ({ hide, hasTabs }: CommonWidgetProps) => css`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
  display: ${hide && 'none'};
  border-top-left-radius: ${hasTabs && 0};
`

const StyledCountdownWidget = styled(CountdownWidget)<CommonWidgetProps>`
  max-height: 600px;
  ${widgetContainerStyles}
`

const StyledGameWidget = styled(GameWidget)<CommonWidgetProps>`
  ${widgetContainerStyles}
`

const StyledTeamWidget = styled(TeamWidget)<CommonWidgetProps>`
  ${widgetContainerStyles}
`

interface Props {}
export default function WidgetsSidebar({}: Props) {
  return (
    <WidgetsContainer>
      <Widgets>
        <StyledCountdownWidget events={events} />
        <StyledGameWidget />
        <StyledTeamWidget />
      </Widgets>
    </WidgetsContainer>
  )
}
