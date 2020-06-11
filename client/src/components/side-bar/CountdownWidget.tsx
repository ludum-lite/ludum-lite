import React from 'react'
import styled from 'styled-components/macro'
import Countdown from './Countdown'
import moment, { Moment } from 'moment'
import { Typography, Icon as MuiIcon } from '@material-ui/core'
import Button from 'components/common/mui/Button'
import Icon from 'components/common/mui/Icon'
import ExpandMore from '@material-ui/icons/ExpandMore'
import IconButton from 'components/common/mui/IconButton'

type Event = {
  label: string
  date: Moment
  compoEnd?: boolean
  jamEnd?: boolean
}

export type Timeline = Event[]

const themeSubmissionStartDate = moment.utc('2020-10-04T22:00:00')
// TODO add in the 3 phases of theme voting
const themeVotingStartDate = themeSubmissionStartDate.clone().add(2, 'weeks')
const themeRevealStartDate = themeVotingStartDate.clone().add(1, 'week')
const compEndDate = themeRevealStartDate.clone().add(48, 'hours')
const jamEndDate = themeRevealStartDate.clone().add(24, 'hours')
const votingEndDate = themeRevealStartDate.clone().add(30, 'days')

const ldTimeline: Timeline = [
  {
    label: 'Theme Submission',
    date: themeSubmissionStartDate,
  },
  {
    label: 'Theme Voting',
    date: themeVotingStartDate,
  },
  {
    label: 'Theme Reveal',
    date: themeRevealStartDate,
  },
  {
    label: 'Compo End',
    compoEnd: true,
    date: compEndDate,
  },
  {
    label: 'Jam End',
    jamEnd: true,
    date: jamEndDate,
  },
  {
    label: 'Voting Ends',
    date: votingEndDate,
  },
]

// const selectedTimeline = testTimeline

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  color: ${({ theme }) => theme.themeColors.countdown.titleColor};
`

const Title = styled(Typography)`
  font-weight: bold;
`

const Subtitle = styled(Typography)`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.themeColors.countdown.fadedTextColor};
`

const ExpandButton = styled(Button)`
  margin-top: 4px;
`

interface Props {
  timeline: Timeline
}
export default function CountdownWidget({ timeline }: Props) {
  const [time, setTime] = React.useState(moment.utc())

  const nextEvent = timeline.find((event) => time.isBefore(event.date))

  if (!nextEvent) {
    return null
  }

  return (
    <Root>
      <TitleButton
        fullWidth
        endIcon={<Icon icon={ExpandMore} />}
        background="contextualNav"
      >
        <Title variant="h5">Ludum Dare 47</Title>
      </TitleButton>
      <Countdown targetDate={nextEvent.date} />
      <ExpandButton
        fullWidth
        startIcon={<Icon icon={ExpandMore} />}
        endIcon={<Icon icon={ExpandMore} />}
        background="contextualNav"
      >
        <Subtitle variant="body1">until Theme Submission</Subtitle>
      </ExpandButton>
    </Root>
  )
}
