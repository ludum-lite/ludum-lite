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

const DIGIT_MIN_WIDTH = 28
const DIGIT_MAX_WIDTH = 34
const DIGIT_INNER_PADDING = 4

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
  justify-content: center;
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
  margin-bottom: 4px;
`

const ClockIndexDigits = styled.div`
  display: flex;
`

const ClockDigitRoot = styled.div`
  position: relative;
  height: 45px;
  min-width: ${DIGIT_MIN_WIDTH}px;
  max-width: ${DIGIT_MAX_WIDTH}px;
  color: ${({ theme }) => theme.themeColors.countdown.digitColor};
  flex: 1 1 0px;
  font-size: 25px;
  /* box-shadow: 0 1px 5px -2px #0000009c; */
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: 1px solid
    ${({ theme }) => theme.themeColors.countdown.digitBoxOutlineColor};
  overflow: hidden;
  &:not(:first-child) {
    margin-left: ${DIGIT_INNER_PADDING}px;
  }
`

const ClockDigitTop = styled(animated.div)`
  background: ${({ theme }) => theme.themeColors.countdown.digitTopBackground};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  clip-path: polygon(0 0, 100% 0, 100% 51%, 0 51%);
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
`

const ClockDigitBottom = styled(animated.div)`
  background: ${({ theme }) =>
    theme.themeColors.countdown.digitBottomBackground};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
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
      transform: 'perspective(75px) rotateX(0deg)',
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
      life: 100,
      transform: 'perspective(75px) rotateX(0deg)',
    },
    from: {
      life: 100,
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
        <ClockDigitTop style={style}>{item}</ClockDigitTop>
      ))}
      {lowerTransitions((style, item) => (
        <ClockDigitBottom style={style}>{item}</ClockDigitBottom>
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
    <ClockIndexRoot
      style={{
        flex: `${digits.length} 0 0px`,
        maxWidth:
          digits.length * DIGIT_MAX_WIDTH +
          (digits.length - 1) * DIGIT_INNER_PADDING,
      }}
    >
      <ClockLabel>{label}</ClockLabel>
      <ClockIndexDigits>{digits}</ClockIndexDigits>
    </ClockIndexRoot>
  )
}

interface Props {
  targetDate: Moment
  onReachedTargetDate?: () => void
  className?: string
}
export default function Countdown({
  targetDate,
  onReachedTargetDate,
  className,
}: Props) {
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
    <Root className={className}>
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

Countdown.displayName = 'Countdown'
