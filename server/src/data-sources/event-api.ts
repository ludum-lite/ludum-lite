import BaseAPI from './base-api'
import {
  Event,
  JoinEventResponse,
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
    __typename: 'Event',
    id: event.id,
    name: event.name,
    body: event.body,
    slug: event.slug,
    createdDate: event.created,
    eventPhase: parseInt(event.meta['theme-mode']) as EventPhase,
  }
}

export default class EventAPI extends BaseAPI {
  constructor() {
    super()
  }

  async getFeaturedEvent(): Promise<Event> {
    const rootNodeResponse = await this.get(`vx/node2/get/1`)
    const eventId = parseInt(rootNodeResponse.node[0].meta.featured)
    const eventResponse = await this.get(`vx/node2/get/${eventId}`)
    const event = apiEventToEvent(eventResponse.node[0])

    return event
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

    console.log(event)
    return unauthorizedResponse
  }

  async getCurrentUserGameId(): Promise<Event['currentUserGameId']> {
    const event = await this.getFeaturedEvent()

    if (event.__typename === 'Event') {
      const response = await this.get(`vx/node/what/${event.id}`)
      console.log(response)

      return response.what[0] || null
    }

    return null
  }
}
