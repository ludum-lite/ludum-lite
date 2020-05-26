import DataLoader from 'dataloader'
import PostAPI from './post-api'
import CommentAPI from './comment-api'
import UserAPI from './user-api'
import { Post, User, Comment } from '../__generated__/schema-types'

export type Context = {
  authToken: string | undefined
  dataSources: {
    postApi: PostAPI
    commentApi: CommentAPI
    userApi: UserAPI
  }
  loaders: {
    postLoader: DataLoader<number, Post>
    commentLoader: DataLoader<number, Comment>
    userLoader: DataLoader<number, User>
  }
}
