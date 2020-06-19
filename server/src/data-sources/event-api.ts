// import DataLoader from 'dataloader'
// import { DataSourceConfig } from 'apollo-datasource'
import BaseAPI from './base-api'
// import { Context } from './context'
import {
  Event,
  JoinEventResponse,
  FeaturedEventResponse,
  EventPhase,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'

export type ApiEventDto = {
  id: number
  name: string
  body: string
  slug: string
  created: string
  meta: {
    'theme-mode': string
  }
}

function apiEventToEvent(event: ApiEventDto): Event {
  return {
    id: event.id,
    name: event.name,
    body: event.body,
    slug: event.slug,
    createdDate: event.created,
    eventPhase: parseInt(event.meta['theme-mode']) as EventPhase,
  }
}

export default class CommentAPI extends BaseAPI {
  constructor() {
    super()
  }

  // initialize(config: DataSourceConfig<Context>) {
  //   super.initialize(config)

  //   if (!config.context.loaders.eventLoader) {
  //     config.context.loaders.eventLoader = new DataLoader(async (keys) => {
  //       const results = await this.get(`vx/comment/get/${keys.join('+')}`)

  //       return sort(keys, results.comment.map(apiEventToEvent))
  //     })
  //   }
  // }

  async getFeaturedEvent(): Promise<FeaturedEventResponse> {
    try {
      const rootNodeResponse = await this.get(`vx/node2/get/1`)
      const eventId = parseInt(rootNodeResponse.node[0].meta.featured)
      const eventResponse = await this.get(`vx/node2/get/${eventId}`)
      const event = apiEventToEvent(eventResponse.node[0])

      console.log('got event', event)
      return {
        __typename: 'Event',
        ...event,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
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

  async getCurrentUserGameId(): Promise<number> {
    const event = await this.getFeaturedEvent()

    if (event.__typename === 'Event') {
      const response = await this.get(`vx/node/what/${event.id}`)

      return response.what[0]
    }

    console.error('Unauthorized')
    return -1
  }
}
