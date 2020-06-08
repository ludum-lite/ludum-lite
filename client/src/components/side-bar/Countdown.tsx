import React from 'react'
import styled from 'styled-components/macro'
import moment, { Moment, Duration } from 'moment'
import { Typography, Icon } from '@material-ui/core'
import { useTransition, animated } from 'react-spring'

type Event = {
  label: string
  date: Moment
  compoEnd?: boolean
  jamEnd?: boolean
}

interface CountdownParts {
  days: number | null
  hours: number
  minutes: number
  seconds: number | null
}

export const getCountdownParts = (duration: Duration): CountdownParts => {
  const days = Math.floor(duration.asDays())

  return {
    days: days > 1 ? days : null,
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: days < 1 ? duration.seconds() : null,
  }
}

const themeSubmissionStartDate = moment.utc('2020-10-04T22:00:00')
// TODO add in the 3 phases of theme voting
const themeVotingStartDate = themeSubmissionStartDate.clone().add(2, 'weeks')
const themeRevealStartDate = themeVotingStartDate.clone().add(1, 'week')
const compEndDate = themeRevealStartDate.clone().add(48, 'hours')
const jamEndDate = themeRevealStartDate.clone().add(24, 'hours')
const votingEndDate = themeRevealStartDate.clone().add(30, 'days')

const timeline: Event[] = [
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

const themeSubmissionStartDate_test = moment.utc('2020-10-04T22:00:00')
// TODO add in the 3 phases of theme voting
const themeVotingStartDate_test = themeSubmissionStartDate
  .clone()
  .add(2, 'weeks')
const themeRevealStartDate_test = themeVotingStartDate.clone().add(1, 'week')
const compEndDate_test = themeRevealStartDate.clone().add(48, 'hours')
const jamEndDate_test = themeRevealStartDate.clone().add(24, 'hours')
const votingEndDate_test = themeRevealStartDate.clone().add(30, 'days')

const testTimeline: Event[] = [
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

const selectedTimeline = testTimeline

const Root = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`

const ClockDisplay = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ClockInnerIcon = styled((props) => <Icon {...props}>access_timer</Icon>)`
  font-size: 37px;
  margin: -4px;
`

const ClockIcon = styled((props) => (
  <div {...props}>
    <ClockInnerIcon />
  </div>
))`
  position: absolute;
  display: flex;
  color: ${({ theme }) => theme.palette.primary.main};
  background: white;
  top: -12px;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  left: calc(50% - 13px);
  z-index: 1;
`

const ClockSubtitle = styled.div`
  display: flex;
  font-weight: 100;
  color: #ffffffd6;
`

const ClockIndexes = styled.div`
  display: flex;
`

const ClockIndexRoot = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  &:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`

const ClockComponentLabel = styled(Typography)`
  font-weight: 100;
  text-align: center;
`

const ClockIndexDigits = styled.div`
  display: flex;
`

const ClockDigitRoot = styled.div`
  position: relative;
  padding: 4px;
  height: 45px;
  width: 34px;
  color: #000000b5;
  font-size: 25px;
  box-shadow: 0 1px 5px -2px #0000009c;
  &:not(:first-child) {
    margin-left: 4px;
  }
`

type ClockDigitProps = {
  value: number
}

const ClockDigit: React.FC<ClockDigitProps> = ({ value }) => {
  const upperTransitions = useTransition([value], {
    config: {
      tension: 100,
    },
    from: {
      position: 'absolute' as const,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      clipPath: 'polygon(0 0, 100% 0, 100% 51%, 0 51%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backfaceVisibility: 'hidden' as const,
      transform: 'perspective(75px) rotateX(0deg)',
      borderRadius: 4,
    },
    enter: {},
    leave: {
      transform: 'perspective(75px) rotateX(-180deg)',
      zIndex: 1,
    },
  })

  const lowerTransitions = useTransition([value], {
    config: {
      tension: 100,
    },
    initial: {
      position: 'absolute' as const,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgb(218, 224, 230)',
      life: 100,
      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backfaceVisibility: 'hidden' as const,
      borderRadius: 4,
      transform: 'perspective(75px) rotateX(0deg)',
    },
    from: {
      position: 'absolute' as const,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgb(218, 224, 230)',
      life: 100,
      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backfaceVisibility: 'hidden' as const,
      borderRadius: 4,
      transform: 'perspective(75px) rotateX(180deg)',
    },
    enter: {
      transform: 'perspective(75px) rotateX(0deg)',
    },
    leave: {
      life: 0,
    },
  })

  return (
    <>
      <ClockDigitRoot>
        <div>
          {upperTransitions((style, item) => (
            <animated.div style={style}>{item}</animated.div>
          ))}
        </div>
        <div>
          {lowerTransitions((style, item) => (
            <animated.div style={style}>{item}</animated.div>
          ))}
        </div>
      </ClockDigitRoot>
    </>
  )
}

interface ClockIndexProps {
  label: string
  value: number
}

function ClockIndex({ label, value }: ClockIndexProps) {
  const digits = value
    .toString()
    .padStart(2, '0')
    .split('')
    .map((digit: string, index) => {
      return <ClockDigit key={index} value={Number.parseInt(digit)} />
    })

  // TODO use flex grid instead, that's perfect for this
  return (
    <ClockIndexRoot>
      <ClockComponentLabel>{label}</ClockComponentLabel>
      <ClockIndexDigits>{digits}</ClockIndexDigits>
    </ClockIndexRoot>
  )
}

interface Props {
  targetDate: Moment
}
export default function Countdown({ targetDate }: Props) {
  const [time, setTime] = React.useState(moment.utc())
  // const nextEvent = selectedTimeline.find((event) => time.isBefore(event.date))

  // if (!nextEvent) {
  //   return null
  // }

  React.useEffect(() => {
    const int = setInterval(() => {
      setTime(moment.utc())
    }, 1000)

    return () => clearInterval(int)
  }, [])

  const duration = moment.duration(targetDate.diff(time))
  const countdownParts = getCountdownParts(duration)

  return (
    <Root>
      <ClockDisplay>
        <ClockIndexes>
          {countdownParts.days !== null && (
            <ClockIndex label="Days" value={countdownParts.days} />
          )}
          <ClockIndex label="Hours" value={countdownParts.hours} />
          <ClockIndex label="Minutes" value={countdownParts.minutes} />
          {countdownParts.seconds !== null && (
            <ClockIndex label="Seconds" value={countdownParts.seconds} />
          )}
        </ClockIndexes>
        <ClockSubtitle>
          {`${moment.utc(targetDate).local().format('dddd')} at ${moment
            .utc(targetDate)
            .local()
            .format('h:mm A')}`}
        </ClockSubtitle>
      </ClockDisplay>
    </Root>
  )
}
