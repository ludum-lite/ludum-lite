import moment, { Moment } from 'moment'
import _ from 'lodash'

export enum EventPhase {
  ThemeSubmission = 'ThemeSubmission',
  ThemeVotingRound1 = 'ThemeVotingRound1',
  ThemeVotingRound2 = 'ThemeVotingRound2',
  ThemeVotingRound3 = 'ThemeVotingRound3',
  ThemeReveal = 'ThemeReveal',
  CompoEnd = 'CompoEnd',
  CompoSubmissionHourEnd = 'CompoSubmissionHourEnd',
  JamEnd = 'JamEnd',
  JamSubmissionHourEnd = 'JamSubmissionHourEnd',
  VotingEnds = 'VotingEnds',
  Results = 'Results',
}

export const EventPhaseToLabel: {
  [key in EventPhase]: string
} = {
  [EventPhase.ThemeSubmission]: 'Theme Submission',
  [EventPhase.ThemeVotingRound1]: 'Theme Voting - Round 1',
  [EventPhase.ThemeVotingRound2]: 'Theme Voting - Round 2',
  [EventPhase.ThemeVotingRound3]: 'Theme Voting - Round 3',
  [EventPhase.ThemeReveal]: 'Theme Reveal',
  [EventPhase.CompoEnd]: 'Compo End',
  [EventPhase.CompoSubmissionHourEnd]: 'Submission Hour End',
  [EventPhase.JamEnd]: 'Jam End',
  [EventPhase.JamSubmissionHourEnd]: 'Submission Hour End',
  [EventPhase.VotingEnds]: 'Voting End',
  [EventPhase.Results]: 'Results',
}

export type Timeline = {
  [key in EventPhase]: Moment
}

export type Event = {
  eventNumber: number
  timeline: Timeline
}

// prettier-ignore
export const events: Event[] = [
  {
    eventNumber: 45,
    timeline: generateTimeline({
      [EventPhase.ThemeSubmission]:   moment.utc('2019-08-19T22:00:00'),
      [EventPhase.ThemeVotingRound1]: moment.utc('2019-08-26T22:00:00'),
      [EventPhase.ThemeVotingRound2]: moment.utc('2019-08-29T22:00:00'),
      [EventPhase.ThemeVotingRound3]: moment.utc('2019-09-01T22:00:00'),
      [EventPhase.ThemeReveal]:       moment.utc('2019-09-04T22:00:00'),
      [EventPhase.CompoEnd]:          moment.utc('2019-09-06T22:00:00'),
      [EventPhase.JamEnd]:            moment.utc('2019-09-07T22:00:00'),
      [EventPhase.VotingEnds]:        moment.utc('2019-09-29T20:00:00'),
      [EventPhase.Results]:           moment.utc('2019-09-29T24:00:00'),
    })
  },
  {
    eventNumber: 46,
    timeline: generateTimeline({
      [EventPhase.ThemeSubmission]:   moment.utc('2020-03-01T01:00:00'),
      [EventPhase.ThemeVotingRound1]: moment.utc('2020-03-11T01:00:00'),
      [EventPhase.ThemeVotingRound2]: moment.utc('2020-03-14T01:00:00'),
      [EventPhase.ThemeVotingRound3]: moment.utc('2020-03-17T01:00:00'),
      [EventPhase.ThemeReveal]:       moment.utc('2020-03-18T01:00:00'),
      [EventPhase.CompoEnd]:          moment.utc('2020-03-20T01:00:00'),
      [EventPhase.JamEnd]:            moment.utc('2020-03-21T01:00:00'),
      [EventPhase.VotingEnds]:        moment.utc('2020-04-12T20:00:00'),
      [EventPhase.Results]:           moment.utc('2020-04-12T24:00:00'),
    })
  },
  {
    eventNumber: 47,
    timeline: generateTimeline({
      [EventPhase.ThemeSubmission]:   moment.utc('2020-10-04T22:00:00'),
      [EventPhase.ThemeVotingRound1]: moment.utc('2020-10-18T22:00:00'),
      [EventPhase.ThemeVotingRound2]: moment.utc('2020-10-21T22:00:00'),
      [EventPhase.ThemeVotingRound3]: moment.utc('2020-10-24T22:00:00'),
      [EventPhase.ThemeReveal]:       moment.utc('2020-10-25T22:00:00'),
      [EventPhase.CompoEnd]:          moment.utc('2020-10-27T22:00:00'),
      [EventPhase.JamEnd]:            moment.utc('2020-10-28T22:00:00'),
      [EventPhase.VotingEnds]:        moment.utc('2020-11-28T20:00:00'),
      [EventPhase.Results]:           moment.utc('2020-11-28T24:00:00'),
    }),
  },
]

export function generateTimeline(
  partialTimeline: Omit<
    Timeline,
    EventPhase.CompoSubmissionHourEnd | EventPhase.JamSubmissionHourEnd
  >
): Timeline {
  return {
    ...partialTimeline,
    [EventPhase.CompoSubmissionHourEnd]: partialTimeline[EventPhase.CompoEnd]
      .clone()
      .add(1, 'hour'),
    [EventPhase.JamSubmissionHourEnd]: partialTimeline[EventPhase.JamEnd]
      .clone()
      .add(1, 'hour'),
  }
}

export function getCurrentEvent(events: Event[]) {
  const now = moment.utc()

  return events.find((event) => event.timeline[EventPhase.Results].isAfter(now))
}

export function getEvent(events: Event[], eventNumber: number) {
  return events.find((event) => event.eventNumber === eventNumber)
}

export function mapTimeline<T extends any>(
  timeline: Timeline,
  fn: (eventPhase: EventPhase, date: Moment) => T
): T[] {
  return _.sortBy(Object.entries(timeline), ([_, date]) =>
    date.format()
  ).map(([eventPhase, date]) => fn(eventPhase as EventPhase, date))
}

export function findNextPhase(
  timeline: Timeline,
  date: Moment
): { eventPhase: EventPhase; date: Moment } | undefined {
  const entry = Object.entries(timeline).find(([_, _date]) =>
    date.isBefore(_date)
  )

  if (entry) {
    return {
      eventPhase: entry[0] as EventPhase,
      date: entry[1],
    }
  }

  return undefined
}
