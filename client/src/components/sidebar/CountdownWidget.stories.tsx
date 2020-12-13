import React from 'react'
import styled from 'styled-components/macro'
import CountdownWidget from './CountdownWidget'
import moment from 'moment'
import {
  EventPhase,
  generateTimeline,
  Event,
  getEvent,
  events,
  getCurrentEvent,
} from 'utils/timeline'

export default {
  title: 'CountdownWidget',
  component: CountdownWidget,
}

const BasicRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 500px;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Basic = () => {
  const event = React.useMemo<Event>(() => {
    const themeRevealDate = moment.utc().add(50, 'days')

    // prettier-ignore
    return {
      eventNumber: 1,
      timeline: generateTimeline({
        [EventPhase.ThemeSubmission]:   themeRevealDate.clone().subtract(5, 'weeks'),
        [EventPhase.ThemeSlaughter]:    themeRevealDate.clone().subtract(2, 'weeks'),
        [EventPhase.ThemeVotingRound1]: themeRevealDate.clone().subtract(7, 'days'),
        [EventPhase.ThemeVotingRound2]: themeRevealDate.clone().subtract(5, 'days'),
        [EventPhase.ThemeVotingRound3]: themeRevealDate.clone().subtract(3, 'days'),
        [EventPhase.ThemeVotingFinal]:  themeRevealDate.clone().subtract(2, 'days'),
        [EventPhase.ThemeReveal]:       themeRevealDate.clone(),
        [EventPhase.CompoEnd]:          themeRevealDate.clone().add(48, 'hours'),
        [EventPhase.JamEnd]:            themeRevealDate.clone().add(72, 'hours'),
        [EventPhase.VotingEnds]:        themeRevealDate.clone().add(2, 'weeks'),
        [EventPhase.Results]:           themeRevealDate.clone().add(2, 'weeks').add(4, 'hours'),
      })
    }
  }, [])

  const [selectedEventNum, setSelectedEventNum] = React.useState(
    getCurrentEvent([event])?.eventNumber
  )
  const selectedEvent = selectedEventNum
    ? getEvent([event], selectedEventNum)
    : undefined

  return (
    <BasicRoot>
      <CountdownWidget
        events={[event]}
        selectedEvent={selectedEvent}
        onChangeSelectedEventNum={setSelectedEventNum}
      />
    </BasicRoot>
  )
}

export const ThemeRevealNext = () => {
  const event = React.useMemo<Event>(() => {
    const themeRevealDate = moment.utc().add(1, 'days')

    // prettier-ignore
    return {
      eventNumber: 1,
      timeline: generateTimeline({
        [EventPhase.ThemeSubmission]:   themeRevealDate.clone().subtract(5, 'weeks'),
        [EventPhase.ThemeSlaughter]:    themeRevealDate.clone().subtract(2, 'weeks'),
        [EventPhase.ThemeVotingRound1]: themeRevealDate.clone().subtract(7, 'days'),
        [EventPhase.ThemeVotingRound2]: themeRevealDate.clone().subtract(5, 'days'),
        [EventPhase.ThemeVotingRound3]: themeRevealDate.clone().subtract(3, 'days'),
        [EventPhase.ThemeVotingFinal]:  themeRevealDate.clone().subtract(2, 'days'),
        [EventPhase.ThemeReveal]:       themeRevealDate.clone(),
        [EventPhase.CompoEnd]:          themeRevealDate.clone().add(48, 'hours'),
        [EventPhase.JamEnd]:            themeRevealDate.clone().add(72, 'hours'),
        [EventPhase.VotingEnds]:        themeRevealDate.clone().add(2, 'weeks'),
        [EventPhase.Results]:           themeRevealDate.clone().add(2, 'weeks').add(4, 'hours'),
      })
    }
  }, [])

  const [selectedEventNum, setSelectedEventNum] = React.useState(
    getCurrentEvent([event])?.eventNumber
  )
  const selectedEvent = selectedEventNum
    ? getEvent([event], selectedEventNum)
    : undefined

  return (
    <BasicRoot>
      <CountdownWidget
        events={[event]}
        selectedEvent={selectedEvent}
        onChangeSelectedEventNum={setSelectedEventNum}
      />
    </BasicRoot>
  )
}

export const EventRunning = () => {
  const event = React.useMemo<Event>(() => {
    const themeRevealDate = moment.utc()

    // prettier-ignore
    return {
      eventNumber: 1,
      timeline: generateTimeline({
        [EventPhase.ThemeSubmission]:   themeRevealDate.clone().subtract(5, 'weeks'),
        [EventPhase.ThemeSlaughter]:    themeRevealDate.clone().subtract(2, 'weeks'),
        [EventPhase.ThemeVotingRound1]: themeRevealDate.clone().subtract(7, 'days'),
        [EventPhase.ThemeVotingRound2]: themeRevealDate.clone().subtract(5, 'days'),
        [EventPhase.ThemeVotingRound3]: themeRevealDate.clone().subtract(3, 'days'),
        [EventPhase.ThemeVotingFinal]:  themeRevealDate.clone().subtract(2, 'days'),
        [EventPhase.ThemeReveal]:       themeRevealDate.clone(),
        [EventPhase.CompoEnd]:          themeRevealDate.clone().add(48, 'hours'),
        [EventPhase.JamEnd]:            themeRevealDate.clone().add(72, 'hours'),
        [EventPhase.VotingEnds]:        themeRevealDate.clone().add(2, 'weeks'),
        [EventPhase.Results]:           themeRevealDate.clone().add(2, 'weeks').add(4, 'hours'),
      })
    }
  }, [])

  const [selectedEventNum, setSelectedEventNum] = React.useState(
    getCurrentEvent([event])?.eventNumber
  )
  const selectedEvent = selectedEventNum
    ? getEvent([event], selectedEventNum)
    : undefined

  return (
    <BasicRoot>
      <CountdownWidget
        events={[event]}
        selectedEvent={selectedEvent}
        onChangeSelectedEventNum={setSelectedEventNum}
      />
    </BasicRoot>
  )
}

export const WithTheme = () => {
  const event = React.useMemo<Event>(() => {
    const themeRevealDate = moment.utc().add(50, 'days')

    // prettier-ignore
    return {
      eventNumber: 1,
      timeline: generateTimeline({
        [EventPhase.ThemeSubmission]:   themeRevealDate.clone().subtract(5, 'weeks'),
        [EventPhase.ThemeSlaughter]:    themeRevealDate.clone().subtract(2, 'weeks'),
        [EventPhase.ThemeVotingRound1]: themeRevealDate.clone().subtract(7, 'days'),
        [EventPhase.ThemeVotingRound2]: themeRevealDate.clone().subtract(5, 'days'),
        [EventPhase.ThemeVotingRound3]: themeRevealDate.clone().subtract(3, 'days'),
        [EventPhase.ThemeVotingFinal]:  themeRevealDate.clone().subtract(2, 'days'),
        [EventPhase.ThemeReveal]:       themeRevealDate.clone(),
        [EventPhase.CompoEnd]:          themeRevealDate.clone().add(48, 'hours'),
        [EventPhase.JamEnd]:            themeRevealDate.clone().add(72, 'hours'),
        [EventPhase.VotingEnds]:        themeRevealDate.clone().add(2, 'weeks'),
        [EventPhase.Results]:           themeRevealDate.clone().add(2, 'weeks').add(4, 'hours'),
      })
    }
  }, [])

  const [selectedEventNum, setSelectedEventNum] = React.useState(
    getCurrentEvent([event])?.eventNumber
  )
  const selectedEvent = selectedEventNum
    ? getEvent([event], selectedEventNum)
    : undefined

  return (
    <BasicRoot>
      <CountdownWidget
        events={[event]}
        selectedEvent={selectedEvent}
        onChangeSelectedEventNum={setSelectedEventNum}
        theme="Forgotten Worlds of the Sky People"
      />
    </BasicRoot>
  )
}
