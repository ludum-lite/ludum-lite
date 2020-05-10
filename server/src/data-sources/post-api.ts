import DataLoader from 'dataloader'
import { sortBy, isNil } from 'lodash'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import {
  Post,
  PostType,
  LovePostResponse,
  UnlovePostResponse,
  QuerySearchPostsArgs,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'
import { delegateToSchema } from 'apollo-server'

export type ApiPostDto = {
  id: number
  parent: number
  superparent: number
  author: number
  type: string
  subtype: string
  subsubtype: string
  published: string
  created: string
  modified: string
  slug: string
  name: string
  body: string
  path: string
  parents: number[]
  love: number
  ['love-timestamp']: string
  notes: number
  ['notes-timestamp']: string
}

function apiPostToPost(post: ApiPostDto): Post {
  return {
    id: post.id,
    parentId: post.parent,
    superparentId: post.superparent,
    authorId: post.author,
    type: post.type,
    subtype: post.subtype,
    subsubtype: post.subsubtype,
    publishedDate: post.published,
    createdDate: post.created,
    modifiedDate: post.modified,
    slug: post.slug,
    name: post.name,
    body: post.body,
    path: post.path,
    parentIds: post.parents,
    numLove: post.love,
    lastLoveChangedDate: post['love-timestamp'],
    numNotes: post.notes,
    lastNotesChangedDate: post['notes-timestamp'],
    author: null,
  }
}

export default class PostAPI extends BaseAPI {
  constructor() {
    super()
  }

  initialize(config: DataSourceConfig<Context>) {
    super.initialize(config)

    if (!config.context.loaders.postLoader) {
      config.context.loaders.postLoader = new DataLoader(async (keys) => {
        const results = await this.get(`vx/node2/get/${keys.join('+')}`)

        return sort(keys, results.node.map(apiPostToPost))
      })
    }
  }

  async searchPosts({
    page,
    limit,
    filters: { postType, favoritedIds },
  }: QuerySearchPostsArgs) {
    if (postType === PostType.All || postType === PostType.News) {
      const postIdsResponse = await this.get(
        `vx/node/feed/1/all/post${postType === 'news' ? '/news' : ''}`,
        {
          offset: page * limit,
          limit,
        }
      )

      const postIds = postIdsResponse.feed.map((p: ApiPostDto) => p.id)

      const postsResponse = (await this.context.loaders.postLoader.loadMany(
        postIds
      )) as Post[]

      const posts = sortBy(postsResponse, 'publishedAt')

      return {
        page,
        limit,
        posts,
      }
    } else if (postType === PostType.Favorites) {
      // Assume oldest favorites are at the front of the list, reverse to oldest are last
      const sortedFavoriteIds = favoritedIds?.reverse()

      const offset = page * limit

      const ids = sortedFavoriteIds?.slice(offset, offset + limit) || []

      const posts = (await this.context.loaders.postLoader.loadMany(
        ids
      )) as Post[]

      return {
        page,
        limit,
        posts,
      }
    }
  }

  async getPost(id: number) {
    return await this.context.loaders.postLoader.load(id)
  }

  async lovePost(id: number): Promise<LovePostResponse> {
    try {
      const post = await this.context.loaders.postLoader.load(id)
      await this.get(`vx/node/love/add/${id}`)

      // The api caches the feed, so we need to manually update the amount of love on the post
      post.numLove = isNil(post.numLove) ? 0 : post.numLove + 1

      return {
        __typename: 'LovePostSuccess',
        success: true,
        post,
      }
    } catch (e) {
      return unauthorizedResponse
    }
  }

  async unlovePost(id: number): Promise<UnlovePostResponse> {
    try {
      const post = await this.context.loaders.postLoader.load(id)
      await this.get(`vx/node/love/remove/${id}`)

      // The api caches the feed, so we need to manually update the amount of love on the post
      post.numLove = Math.max(isNil(post.numLove) ? 0 : post.numLove - 1, 0)

      return {
        __typename: 'UnlovePostSuccess',
        success: true,
        post,
      }
    } catch (e) {
      return unauthorizedResponse
    }
  }
}
