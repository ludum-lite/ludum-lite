import BaseAPI from './base-api'
import { NexusGenFieldTypes } from '../ldjam-typegen'

type ApiUserDto = {
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

function apiUserToUser(user: ApiUserDto): NexusGenFieldTypes['User'] {
  return {
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

function getCookieValue(cookies: string, a: string) {
  var b = cookies.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)')
  return b ? b.pop() : ''
}

export default class UserAPI extends BaseAPI {
  async login(email: string, password: string) {
    const response = await this.post(
      'vx/user/login',
      `login=${email}&pw=${password}`,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          includeHeaders: 'true',
        },
        credentials: 'include',
      }
    )

    const cookies = response._headers.get('set-cookie')

    return getCookieValue(cookies, 'SIDS') || ''
  }

  async me() {
    return apiUserToUser((await this.get('vx/user/get')).node)
  }

  async getUser(id: number) {
    return apiUserToUser((await this.get(`vx/node2/get/${id}`)).node[0])
  }
}
