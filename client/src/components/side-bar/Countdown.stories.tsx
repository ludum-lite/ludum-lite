import React from 'react'
import styled from 'styled-components/macro'
import Countdown from './Countdown'
import moment, { Moment } from 'moment'
import Button from 'components/common/mui/Button'

export default {
  title: 'Countdown',
  component: Countdown,
}

const BasicRoot = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

const CountdownBackground = styled.div`
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
`

export const Basic = () => {
  const [targetDate, setTargetDate] = React.useState<Moment>(
    moment.utc().add(10, 'days')
  )
  return (
    <BasicRoot>
      <CountdownBackground>
        <Countdown targetDate={targetDate} />
      </CountdownBackground>
      <Button
        onClick={() => setTargetDate(moment.utc().add(10, 'day'))}
        color="primary"
        variant="contained"
      >
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
    </BasicRoot>
  )
}
