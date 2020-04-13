import PostAPI from './post-api'
import UserAPI from './user-api'

export class Context {
  dataSources!: {
    postApi: PostAPI
    userApi: UserAPI
  }
}
