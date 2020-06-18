import DataLoader from 'dataloader'
import PostAPI from './post-api'
import CommentAPI from './comment-api'
import UserAPI from './user-api'
import EventAPI from './event-api'
import { Post, User, Comment, Event } from '../__generated__/schema-types'

export type Context = {
  authToken: string | undefined
  dataSources: {
    postApi: PostAPI
    commentApi: CommentAPI
    userApi: UserAPI
    eventApi: EventAPI
  }
  loaders: {
    postLoader: DataLoader<number, Post>
    commentLoader: DataLoader<number, Comment>
    userLoader: DataLoader<number, User>
    eventLoader: DataLoader<number, Event>
  }
}
