import { Duration } from 'moment'

interface CountdownParts {
  days: number | null
  hours: number
  minutes: number
  seconds: number | null
}

/*
  >1 day = days, hours minutes
  <1 day = hours minutes seconds

*/

export const getCountdown = (duration: Duration): CountdownParts => {
  const days = Math.floor(duration.asDays())

  return {
    days: days > 1 ? days : null,
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: days < 1 ? duration.seconds() : null,
  }
}
