import DataLoader from 'dataloader'
import PostAPI from './post-api'
import UserAPI from './user-api'
import { Post, User } from '../__generated__/schema-types'

export type Context = {
  authToken: string | undefined
  dataSources: {
    postApi: PostAPI
    userApi: UserAPI
  }
  loaders: {
    postLoader: DataLoader<number, Post>
    userLoader: DataLoader<number, User>
  }
}
