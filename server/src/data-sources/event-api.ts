import DataLoader from 'dataloader'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import { maxBy } from 'lodash'
import {
  Event,
  JoinEventResponse,
  EventPhase,
  VotingPhase,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'
import { filterOutErrorsFromResponses } from './utils'

export type ApiEventDto = {
  id: number
  name: string
  body: string
  slug: string
  created: string
  meta: {
    'theme-mode': string
    'event-theme': string
    'event-start': string
    'event-end': string
    'theme-idea-limit': string
    'theme-page-mode-1': string
    'theme-page-mode-2': string
    'theme-page-mode-3': string
    'theme-page-mode-4': string
    'theme-page-mode-5': string
  }
}

function apiEventToEvent(event: ApiEventDto): Event {
  console.log(event)
  return {
    __typename: 'Event',
    id: event.id,
    name: event.name,
    body: event.body,
    slug: event.slug,
    theme: event.meta['event-theme'],
    createdDate: event.created,
    eventPhase: parseInt(event.meta['theme-mode']) as EventPhase,
    startDate: event.meta['event-start'],
    endDate: event.meta['event-end'],
    eventIdeaLimit: parseInt(event.meta['theme-idea-limit']),
    themeVotingPhase1: parseInt(event.meta['theme-page-mode-1']) as VotingPhase,
    themeVotingPhase2: parseInt(event.meta['theme-page-mode-2']) as VotingPhase,
    themeVotingPhase3: parseInt(event.meta['theme-page-mode-3']) as VotingPhase,
    themeVotingPhase4: parseInt(event.meta['theme-page-mode-4']) as VotingPhase,
    themeVotingPhase5: parseInt(event.meta['theme-page-mode-5']) as VotingPhase,
  }
}

export default class EventAPI extends BaseAPI {
  constructor() {
    super()
  }

  initialize(config: DataSourceConfig<Context>) {
    super.initialize(config)

    if (!config.context.loaders.eventLoader) {
      config.context.loaders.eventLoader = new DataLoader(async (keys) => {
        const results = await this.get(`vx/node2/get/${keys.join('+')}`)

        return sort(keys, results.node.map(apiEventToEvent))
      })
    }
  }

  async getFeaturedEvent(): Promise<Event> {
    const rootNodeResponse = await this.get(`vx/node2/get/1`)
    const eventId = parseInt(rootNodeResponse.node[0].meta.featured)

    return this.context.loaders.eventLoader.load(eventId)
  }

  async getEvent(id: number): Promise<Event> {
    return this.context.loaders.eventLoader.load(id)
  }

  async joinEvent(): Promise<JoinEventResponse> {
    const event = await this.getFeaturedEvent()

    if (event.__typename === 'Event') {
      try {
        const joinEventResponse = await this.post(
          `vx/node/add/${event.id}/item/game`
        )
        const gameId = joinEventResponse.id

        return {
          __typename: 'JoinEventSuccess',
          success: true,
          gameId,
        }
      } catch (e) {
        console.error(e)
        return unauthorizedResponse
      }
    }

    return unauthorizedResponse
  }

  async getCurrentUserGameId(): Promise<Event['currentUserGameId']> {
    const event = await this.getFeaturedEvent()

    if (event.__typename === 'Event') {
      const response = await this.get(`vx/node/what/${event.id}`)

      if (response.what.length === 1) {
        return response.what[0] || null
      } else {
        const games = await this.context.loaders.gameLoader.loadMany(
          response.what
        )
        const lastGameModified = maxBy(
          filterOutErrorsFromResponses(games),
          'modifiedDate'
        )

        return lastGameModified?.id || null
      }
    }

    return null
  }
}
