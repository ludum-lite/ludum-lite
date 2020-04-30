import DataLoader from 'dataloader'
import PostAPI from './post-api'
import UserAPI from './user-api'
import { NexusGenFieldTypes } from '../ldjam-typegen'

export type Context = {
  authToken: string | undefined
  dataSources: {
    postApi: PostAPI
    userApi: UserAPI
  }
  loaders: {
    postLoader: DataLoader<number, NexusGenFieldTypes['Post']>
    userLoader: DataLoader<number, NexusGenFieldTypes['User']>
  }
}
