import React from 'react'
import styled from 'styled-components/macro'
import CountdownWidget, { Timeline } from './CountdownWidget'
import moment, { Moment } from 'moment'
import Button from 'components/common/mui/Button'
import Panel from 'components/storybook/Panel'

export default {
  title: 'CountdownWidget',
  component: CountdownWidget,
}

const themeSubmissionStartDate_test = moment.utc('2020-10-04T22:00:00')
// TODO add in the 3 phases of theme voting
const themeVotingStartDate_test = themeSubmissionStartDate_test
  .clone()
  .add(2, 'weeks')
const themeRevealStartDate_test = themeVotingStartDate_test
  .clone()
  .add(1, 'week')
const compEndDate_test = themeRevealStartDate_test.clone().add(48, 'hours')
const jamEndDate_test = compEndDate_test.clone().add(24, 'hours')
const votingEndDate_test = jamEndDate_test.clone().add(30, 'days')

const timeline: Timeline = [
  {
    label: 'Theme Submission',
    date: themeSubmissionStartDate_test,
  },
  {
    label: 'Theme Voting',
    date: themeVotingStartDate_test,
  },
  {
    label: 'Theme Reveal',
    date: themeRevealStartDate_test,
  },
  {
    label: 'Compo End',
    compoEnd: true,
    date: compEndDate_test,
  },
  {
    label: 'Jam End',
    jamEnd: true,
    date: jamEndDate_test,
  },
  {
    label: 'Voting Ends',
    date: votingEndDate_test,
  },
]

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
  // const [targetDate, setTargetDate] = React.useState<Moment>(
  //   moment.utc().add(10, 'days')
  // )
  return (
    <BasicRoot>
      {/* <Panel layout="row">
        <Button onClick={() => setTargetDate(moment.utc().add(200, 'days'))}>
          In 200 days
        </Button>
        <Button onClick={() => setTargetDate(moment.utc().add(10, 'day'))}>
          In 10 days
        </Button>
        <Button onClick={() => setTargetDate(moment.utc().add(1, 'day'))}>
          In 1 day
        </Button>
        <Button onClick={() => setTargetDate(moment.utc().add(12, 'hours'))}>
          In 12 hours
        </Button>
        <Button onClick={() => setTargetDate(moment.utc().add(1, 'hour'))}>
          In 1 hour
        </Button>
        <Button onClick={() => setTargetDate(moment.utc().add(2, 'seconds'))}>
          In 2 seconds
        </Button>
      </Panel> */}
      <CountdownBackground>
        <CountdownWidget timeline={timeline} />
      </CountdownBackground>
    </BasicRoot>
  )
}
