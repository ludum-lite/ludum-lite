import DataLoader from 'dataloader'
import PostAPI from './post-api'
import CommentAPI from './comment-api'
import UserAPI from './user-api'
import EventAPI from './event-api'
import EventIdeaAPI from './event-idea-api'
import GameAPI from './game-api'
import ImageAPI from './image-api'
import { Post, User, Comment, Event, Game } from '../__generated__/schema-types'

export type Context = {
  authToken: string | undefined
  dataSources: {
    postApi: PostAPI
    commentApi: CommentAPI
    userApi: UserAPI
    eventApi: EventAPI
    eventIdeaApi: EventIdeaAPI
    gameApi: GameAPI
    imageApi: ImageAPI
  }
  loaders: {
    postLoader: DataLoader<number, Post>
    commentLoader: DataLoader<number, Comment>
    userLoader: DataLoader<number, User>
    eventLoader: DataLoader<number, Event>
    gameLoader: DataLoader<number, Game>
  }
}
