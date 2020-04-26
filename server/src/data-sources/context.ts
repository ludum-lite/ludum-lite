import PostAPI from './post-api'
import UserAPI from './user-api'
import { IncomingHttpHeaders } from 'http'

export class Context {
  dataSources!: {
    postApi: PostAPI
    userApi: UserAPI
  }

  authToken: string | undefined

  constructor(headers: IncomingHttpHeaders) {
    this.authToken = headers.authorization
  }
}
