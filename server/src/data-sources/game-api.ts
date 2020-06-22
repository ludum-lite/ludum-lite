import DataLoader from 'dataloader'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import {
  Game,
  EditGameNameResponse,
  EditGameNameInput,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'
import { Context } from './context'

export type ApiGameDto = {
  id: number
  name: string
  body: string
  author: number
  created: string
  modified: string | null
  published: string | null
  love: number
  notes: number
  parent: number
  parents: number[]
  path: string
  slug: string
  subsubtype: string
  subtype: string
  superparent: number
  type: 'item'
  version: number
}

function apiGameToGame(game: ApiGameDto): Game {
  return {
    __typename: 'Game',
    id: game.id,
    name: game.name,
    body: game.body,
    authorId: game.author,
    createdDate: game.created,
    modifiedDate: game.modified,
    publishedDate: game.published,
    numLove: game.love,
    numNotes: game.notes,
    eventId: game.parent,
    slug: game.slug,
  }
}

export default class GameAPI extends BaseAPI {
  constructor() {
    super()
  }

  initialize(config: DataSourceConfig<Context>) {
    super.initialize(config)

    if (!config.context.loaders.gameLoader) {
      config.context.loaders.gameLoader = new DataLoader(async (keys) => {
        const results = await this.get(`vx/node2/get/${keys.join('+')}`)

        return sort(keys, results.node.map(apiGameToGame))
      })
    }
  }

  async getGame(id: number): Promise<Game> {
    return this.context.loaders.gameLoader.load(id)
  }

  async editGameName({
    id,
    name,
  }: EditGameNameInput): Promise<EditGameNameResponse> {
    try {
      await this.post(`vx/node/update/${id}`, {
        name,
      })
      return {
        __typename: 'EditGameNameResponseSuccess',
        success: true,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }
}
