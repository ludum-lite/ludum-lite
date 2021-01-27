import DataLoader from 'dataloader'
import { DataSourceConfig } from 'apollo-datasource'
import sort from '../utils/dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import {
  Comment,
  LoveCommentResponse,
  UnloveCommentResponse,
  AddCommentInput,
  AddCommentResponse,
  EditCommentInput,
  EditCommentResponse,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'

export type ApiCommentDto = {
  id: number
  author: number
  created: string
  modified: string
  node: number
  nodeType: string
  body: string
  love: number
}

function apiCommentToComment(comment: ApiCommentDto): Comment {
  return {
    __typename: 'Comment',
    id: comment.id,
    authorId: comment.author,
    createdDate: comment.created,
    modifiedDate: comment.modified,
    postId: comment.node,
    currentUserHasLoved: false,
    body: comment.body,
    numLove: comment.love,
  }
}

export default class CommentAPI extends BaseAPI {
  constructor() {
    super()
  }

  initialize(config: DataSourceConfig<Context>) {
    super.initialize(config)

    if (!config.context.loaders.commentLoader) {
      config.context.loaders.commentLoader = new DataLoader(async (keys) => {
        const results = await this.get(`vx/comment/get/${keys.join('+')}`)

        return sort(keys, results.comment.map(apiCommentToComment))
      })
    }
  }

  async getComment(id: number) {
    return this.context.loaders.commentLoader.load(id)
  }

  async getCommentsForPost(id: number) {
    const commentsResponse = await this.get(`vx/comment/getbynode/${id}`)

    return commentsResponse.note.map(apiCommentToComment)
  }

  async getMyLovedCommentsForPost(id: number) {
    const commentsResponse = await this.get(`vx/comment/love/getmy/${id}`)

    return commentsResponse['my-love']?.map((n: any) => n.note) || []
  }

  async loveComment(id: number): Promise<LoveCommentResponse> {
    try {
      await this.get(`vx/comment/love/add/${id}`)

      return {
        __typename: 'LoveCommentSuccess',
        success: true,
        comment: await this.getComment(id),
      }
    } catch (e) {
      return unauthorizedResponse
    }
  }

  async unloveComment(id: number): Promise<UnloveCommentResponse> {
    try {
      await this.get(`vx/comment/love/remove/${id}`)

      return {
        __typename: 'UnloveCommentSuccess',
        success: true,
        comment: await this.getComment(id),
      }
    } catch (e) {
      return unauthorizedResponse
    }
  }

  async addComment(input: AddCommentInput): Promise<AddCommentResponse> {
    try {
      const response = await this.post(`vx/comment/add/${input.postId}`, {
        parent: 0,
        body: input.body,
      })

      return {
        __typename: 'AddCommentSuccess',
        success: true,
        comment: await this.getComment(response.note),
      }
    } catch (e) {
      return unauthorizedResponse
    }
  }

  async editComment(input: EditCommentInput): Promise<EditCommentResponse> {
    try {
      await this.post(`vx/comment/update/${input.id}`, {
        node: input.postId,
        body: input.body,
      })

      return {
        __typename: 'EditCommentSuccess',
        success: true,
        comment: await this.getComment(input.id),
      }
    } catch (e) {
      return unauthorizedResponse
    }
  }
}
