import DataLoader from 'dataloader'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import {
  Game,
  AddUserToGameInput,
  AddUserToGameResponse,
  RemoveUserFromGameInput,
  RemoveUserFromGameResponse,
  User,
  EditGameInput,
  EditGameResponse,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'
import { Context } from './context'
import { filterOutErrorsFromResponses } from './utils'

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
  meta: {
    author: number[]
  }
}

function apiGameToGame(game: ApiGameDto): Game {
  return {
    __typename: 'Game',
    id: game.id,
    name: game.name,
    body: game.body,
    authorId: game.author,
    teamUserIds: game.meta.author,
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

  async getTeamUsers(id: number): Promise<Game['teamUsers']> {
    const game = await this.context.loaders.gameLoader.load(id)
    const userResponses = await this.context.loaders.userLoader.loadMany(
      game.teamUserIds
    )
    const users = filterOutErrorsFromResponses<User>(userResponses)
    return users
  }

  async editGame({ id, name, body }: EditGameInput): Promise<EditGameResponse> {
    try {
      await this.post(`vx/node/update/${id}`, {
        name,
        body,
      })
      return {
        __typename: 'EditGameSuccess',
        gameId: id,
        success: true,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }

  async addUserToGame({
    gameId,
    userId,
  }: AddUserToGameInput): Promise<AddUserToGameResponse> {
    try {
      await this.post(`vx/node/link/add/${gameId}/${userId}`, {
        author: null,
      })

      /**
       * Update the game so the last modified date is the most recent possible.
       * Why? When a user has multiple games, the most recently modified is the selected game you are a part of,
       * but adding a team member doesn't update the modified date, so if they created
       * their own game before getting invited, they won't see the team's game unless we do this
       */
      await this.updateLastModified(gameId)

      return {
        __typename: 'AddUserToGameSuccess',
        success: true,
        gameId,
        userId,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }

  private async updateLastModified(id: number) {
    // This is a super hacky way to get `modifiedDate` updated, but I haven't found another way
    const game = await this.getGame(id)
    await this.editGame({
      id,
      body: game.body + ' ',
    })
    await this.editGame({
      id,
      body: game.body,
    })
  }

  async removeUserFromGame({
    gameId,
    userId,
  }: RemoveUserFromGameInput): Promise<RemoveUserFromGameResponse> {
    try {
      await this.post(`vx/node/link/remove/${gameId}/${userId}`, {
        author: null,
      })

      return {
        __typename: 'RemoveUserFromGameSuccess',
        success: true,
        gameId,
        userId,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }
}
