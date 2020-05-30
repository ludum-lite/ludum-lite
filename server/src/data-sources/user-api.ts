import DataLoader from 'dataloader'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import { unauthorizedResponse } from './const'
import { User, LoginResponse, Me } from '../__generated__/schema-types'

export type ApiUserDto = {
  id: number
  created: string
  modified: string
  games: number
  posts: number
  name: string
  type: string
  path: string
  meta: {
    avatar: string
  }
}

function apiUserToUser(user: ApiUserDto): User {
  return {
    __typename: 'User',
    id: user.id,
    createdDate: user.created,
    modifiedDate: user.modified,
    numGames: user.games,
    numPosts: user.posts,
    name: user.name,
    type: user.type,
    profilePath: user.path,
    avatarPath: user.meta?.avatar,
  }
}

function generateId(length: number) {
  let result = ''
  const characters = 'Aabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default class UserAPI extends BaseAPI {
  initialize(config: DataSourceConfig<Context>) {
    super.initialize(config)

    if (!config.context.loaders.userLoader) {
      config.context.loaders.userLoader = new DataLoader(async (keys) => {
        const results = await this.get(`vx/node2/get/${keys.join('+')}`)

        return sort(keys, results.node.map(apiUserToUser))
      })
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const token = generateId(26)

      // Make sure this token is used in the cookies on request
      this.context.authToken = token

      await this.post('vx/user/login', `login=${email}&pw=${password}`, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          includeHeaders: 'true',
        },
        credentials: 'include',
      })

      return {
        __typename: 'LoginSuccess',
        success: true,
        token,
      }
    } catch (e) {
      return {
        __typename: 'LoginFailure',
        success: false,
        message: 'The given username/password is incorrect.',
      }
    }
  }

  async me() {
    try {
      return {
        ...apiUserToUser((await this.get('vx/user/get')).node),
        __typename: 'Me',
      } as Me
    } catch (e) {
      return unauthorizedResponse
    }
  }

  async getMyLovedPosts() {
    const response = await this.get('vx/node/love/getmy')
    const lovedPosts = response['my-love']

    return lovedPosts
  }

  async getUser(id: number) {
    return await this.context.loaders.userLoader.load(id)
  }
}
