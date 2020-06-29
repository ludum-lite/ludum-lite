import React from 'react'
import styled from 'styled-components/macro'
import Countdown from './Countdown'
import moment, { Moment } from 'moment'
import Button from 'components/common/mui/Button'
import Panel from 'components/storybook/Panel'

export default {
  title: 'Countdown',
  component: Countdown,
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
  const [targetDate, setTargetDate] = React.useState<Moment>(
    moment.utc().add(10, 'days')
  )
  return (
    <BasicRoot>
      <Panel layout="row">
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
      </Panel>
      <CountdownBackground>
        <Countdown targetDate={targetDate} />
      </CountdownBackground>
    </BasicRoot>
  )
}

const WideContainerRoot = styled.div`
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
  padding: ${({ theme }) => theme.spacing(2)}px;
  width: 400px;
`

export const WideContainer = () => {
  const [targetDate, setTargetDate] = React.useState<Moment>(
    moment.utc().add(20, 'days')
  )
  return (
    <WideContainerRoot>
      <Countdown targetDate={targetDate} />
    </WideContainerRoot>
  )
}
