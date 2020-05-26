import DataLoader from 'dataloader'
import { sortBy, isNil } from 'lodash'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import {
  Comment,
  PostType,
  LovePostResponse,
  UnlovePostResponse,
  QuerySearchPostsArgs,
  IdInput,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'
import { delegateToSchema } from 'apollo-server'

export type ApiCommentDto = {
  id: number
  author: number
  created: string
  modified: string
  nodeId: number
  nodeType: string
  body: string
  love: number
}

function apiCommentToComment(comment: ApiCommentDto): Comment {
  return {
    id: comment.id,
    authorId: comment.author,
    createdDate: comment.created,
    modifiedDate: comment.modified,
    postId: comment.nodeId,
    currentUserHasLoved: false,
    body: comment.body,
    numLove: comment.love,
  }
}

export default class ComementAPI extends BaseAPI {
  constructor() {
    super()
  }

  initialize(config: DataSourceConfig<Context>) {
    super.initialize(config)

    if (!config.context.loaders.commentLoader) {
      config.context.loaders.commentLoader = new DataLoader(async (keys) => {
        const results = await this.get(`vx/node2/get/${keys.join('+')}`)

        return sort(keys, results.node.map(apiCommentToComment))
      })
    }
  }

  async getCommentsForPost(id: number) {
    const commentsResponse = await this.get(`vx/comment/getbynode/${id}`)

    return commentsResponse.note.map(apiCommentToComment)
  }

  // async searchPosts({
  //   page,
  //   limit,
  //   filters: { postType, favoritedIds },
  // }: QuerySearchPostsArgs) {
  //   if (postType === PostType.All || postType === PostType.News) {
  //     const postIdsResponse = await this.get(
  //       `vx/node/feed/1/all/post${postType === 'news' ? '/news' : ''}`,
  //       {
  //         offset: page * limit,
  //         limit,
  //       }
  //     )

  //     const postIds = postIdsResponse.feed.map((p: ApiCommentDto) => p.id)

  //     const postsResponse = (await this.context.loaders.commentLoader.loadMany(
  //       postIds
  //     )) as Comment[]

  //     const posts = sortBy(postsResponse, 'publishedAt')

  //     return {
  //       page,
  //       limit,
  //       posts,
  //     }
  //   } else if (postType === PostType.Favorites) {
  //     // Assume oldest favorites are at the front of the list, reverse to oldest are last
  //     const sortedFavoriteIds = favoritedIds?.reverse()

  //     const offset = page * limit

  //     const ids = sortedFavoriteIds?.slice(offset, offset + limit) || []

  //     const posts = (await this.context.loaders.commentLoader.loadMany(
  //       ids
  //     )) as Comment[]

  //     return {
  //       page,
  //       limit,
  //       posts,
  //     }
  //   }
  // }

  // async lovePost(id: number): Promise<LovePostResponse> {
  //   try {
  //     const post = await this.context.loaders.commentLoader.load(id)

  //     // The api caches the feed, so we need to manually update the amount of love on the post
  //     post.numLove = isNil(post.numLove) ? 0 : post.numLove + 1

  //     await this.get(`vx/node/love/add/${id}`)

  //     return {
  //       __typename: 'LovePostSuccess',
  //       success: true,
  //       post,
  //     }
  //   } catch (e) {
  //     return unauthorizedResponse
  //   }
  // }

  // async unlovePost(id: number): Promise<UnlovePostResponse> {
  //   try {
  //     const post = await this.context.loaders.commentLoader.load(id)
  //     console.log(post.numLove)

  //     // The api caches the feed, so we need to manually update the amount of love on the post
  //     post.numLove = Math.max(isNil(post.numLove) ? 0 : post.numLove - 1, 0)

  //     await this.get(`vx/node/love/remove/${id}`)

  //     return {
  //       __typename: 'UnlovePostSuccess',
  //       success: true,
  //       post,
  //     }
  //   } catch (e) {
  //     return unauthorizedResponse
  //   }
  // }
}
