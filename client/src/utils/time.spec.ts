import { getCountdown } from './time'
import moment from 'moment'

describe('getCountdown', () => {
  test('more than 1 day duration', () => {
    const duration = moment.duration({
      days: 2,
    })

    expect(getCountdown(duration)).toMatchObject({
      days: 2,
      hours: 0,
      minutes: 0,
      seconds: null,
    })
  })

  test('more than 1 day duration with hours and minutes and seconds', () => {
    const duration = moment.duration({
      days: 2,
      hours: 2,
      minutes: 2,
      seconds: 2,
    })

    expect(getCountdown(duration)).toMatchObject({
      days: 2,
      hours: 2,
      minutes: 2,
      seconds: null,
    })
  })

  test('less than 1 day duration doesnt return the day', () => {
    const duration = moment.duration({
      days: 0,
      hours: 2,
      minutes: 2,
      seconds: 2,
    })

    expect(getCountdown(duration)).toMatchObject({
      days: null,
      hours: 2,
      minutes: 2,
      seconds: 2,
    })
  })

  test('works for periods greater than 4 weeks', () => {
    const duration = moment.duration({
      days: 120,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    expect(getCountdown(duration)).toMatchObject({
      days: 120,
      hours: 0,
      minutes: 0,
      seconds: null,
    })
  })

  test('displays days when on an interval of 31 days (day = 0 when using .days())', () => {
    const duration = moment.duration({
      days: 31,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    expect(getCountdown(duration)).toMatchObject({
      days: 31,
      hours: 0,
      minutes: 0,
      seconds: null,
    })
  })
})
