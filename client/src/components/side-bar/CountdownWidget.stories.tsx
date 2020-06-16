import React from 'react'
import styled from 'styled-components/macro'
import CountdownWidget from './CountdownWidget'
import moment from 'moment'
import { Timeline, EventPhase, generateTimeline, Event } from 'utils/timeline'

export default {
  title: 'CountdownWidget',
  component: CountdownWidget,
}

const BasicRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`
const CountdownBackground = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
`

export const Basic = () => {
  const event = React.useMemo<Event>(() => {
    const eventDate = moment.utc().add(40, 'days')

    // prettier-ignore
    return {
      eventNumber: 1,
      timeline: generateTimeline({
        [EventPhase.ThemeSubmission]:   eventDate.clone(),
        [EventPhase.ThemeVotingRound1]: eventDate.add(2, 'weeks').clone(),
        [EventPhase.ThemeVotingRound2]: eventDate.add(3, 'days').clone(),
        [EventPhase.ThemeVotingRound3]: eventDate.add(3, 'days').clone(),
        [EventPhase.ThemeReveal]:       eventDate.add(1, 'day').clone(),
        [EventPhase.CompoEnd]:          eventDate.add(48, 'hours').clone(),
        [EventPhase.JamEnd]:            eventDate.add(24, 'hours').clone(),
        [EventPhase.VotingEnds]:        eventDate.add(2, 'weeks').clone(),
        [EventPhase.Results]:           eventDate.add(4, 'hours').clone(),
      })
    }
  }, [])

  return (
    <BasicRoot>
      <CountdownBackground>
        <CountdownWidget events={[event]} />
      </CountdownBackground>
    </BasicRoot>
  )
}
export const ThemeRevealNext = () => {
  const event = React.useMemo<Event>(() => {
    const eventDate = moment.utc().subtract(40, 'days')

    // prettier-ignore
    return {
      eventNumber: 1,
      timeline: generateTimeline({
        [EventPhase.ThemeSubmission]:   eventDate.clone(),
        [EventPhase.ThemeVotingRound1]: eventDate.add(20, 'days').clone(),
        [EventPhase.ThemeVotingRound2]: eventDate.add(3, 'days').clone(),
        [EventPhase.ThemeVotingRound3]: eventDate.add(3, 'days').clone(),
        [EventPhase.ThemeReveal]:       eventDate.add(14, 'days').clone(),
        [EventPhase.CompoEnd]:          eventDate.add(48, 'hours').clone(),
        [EventPhase.JamEnd]:            eventDate.add(24, 'hours').clone(),
        [EventPhase.VotingEnds]:        eventDate.add(2, 'weeks').clone(),
        [EventPhase.Results]:           eventDate.add(4, 'hours').clone(),
      })
    }
  }, [])

  return (
    <BasicRoot>
      <CountdownBackground>
        <CountdownWidget events={[event]} />
      </CountdownBackground>
    </BasicRoot>
  )
}
