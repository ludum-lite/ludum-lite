import React from 'react'
import styled from 'styled-components/macro'
import moment, { Moment, Duration } from 'moment'
import { Typography } from '@material-ui/core'
import { useTransition, animated } from 'react-spring'

interface CountdownParts {
  days: number | null
  hours: number
  minutes: number
  seconds: number | null
}

function getCountdownParts(duration: Duration): CountdownParts {
  if (duration.asSeconds() < 0) {
    return {
      days: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  const days = Math.floor(duration.asDays())

  return {
    days: days >= 1 ? days : null,
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: days < 1 ? duration.seconds() : null,
  }
}

const Root = styled.div`
  display: flex;
`

const ClockIndexRoot = styled.div`
  flex: 1 1 0px;

  &:not(:first-child) {
    margin-left: 12px;
  }
`

const ClockLabel = styled(Typography)`
  font-weight: 100;
  text-align: center;
  color: ${({ theme }) => theme.themeColors.countdown.fadedTextColor};
  margin-bottom: 4px;
`

const ClockIndexDigits = styled.div`
  display: flex;
`

const ClockDigitRoot = styled.div`
  position: relative;
  height: 45px;
  max-width: 34px;
  min-width: 28px;
  flex: 1 1 0px;
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
    <ClockDigitRoot>
      {upperTransitions((style, item) => (
        <animated.div style={style}>{item}</animated.div>
      ))}
      {lowerTransitions((style, item) => (
        <animated.div style={style}>{item}</animated.div>
      ))}
    </ClockDigitRoot>
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

  return (
    <ClockIndexRoot style={{ flex: `${digits.length} 0 0px` }}>
      <ClockLabel>{label}</ClockLabel>
      <ClockIndexDigits>{digits}</ClockIndexDigits>
    </ClockIndexRoot>
  )
}

interface Props {
  targetDate: Moment
  onReachedTargetDate?: () => void
}
export default function Countdown({ targetDate, onReachedTargetDate }: Props) {
  const [time, setTime] = React.useState(moment.utc())

  React.useEffect(() => {
    const int = setInterval(() => {
      const date = moment.utc()

      if (targetDate.isSameOrAfter(date) && onReachedTargetDate) {
        onReachedTargetDate()
        clearInterval(int)
      }

      setTime(date)
    }, 1000)

    return () => clearInterval(int)
  }, [targetDate, onReachedTargetDate])

  const duration = moment.duration(targetDate.diff(time))
  const countdownParts = getCountdownParts(duration)

  return (
    <Root>
      {countdownParts.days !== null && (
        <ClockIndex label="Days" value={countdownParts.days} />
      )}
      <ClockIndex label="Hours" value={countdownParts.hours} />
      <ClockIndex label="Minutes" value={countdownParts.minutes} />
      {countdownParts.seconds !== null && (
        <ClockIndex label="Seconds" value={countdownParts.seconds} />
      )}
    </Root>
  )
}
