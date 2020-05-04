import DataLoader from 'dataloader'
import { sortBy } from 'lodash'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import { Post, PostType } from '../__generated__/schema-types'

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
    filters: { postType },
  }: {
    page: number
    limit: number
    filters: { postType: PostType }
  }) {
    const postIdsResponse = await this.get(
      `vx/node/feed/1/all/post${postType === 'news' ? '/news' : ''}`,
      {
        offset: (page - 1) * limit,
        limit,
      }
    )

    const postIds = postIdsResponse.feed.map((p: ApiPostDto) => p.id)

    if (postIds.length > 0) {
      const postsResponse = (await this.context.loaders.postLoader.loadMany(
        postIds
      )) as Post[]

      const posts = sortBy(postsResponse, 'publishedAt').reverse()

      return {
        page,
        limit,
        posts,
      }
    }

    return {
      page,
      limit,
      posts: [],
    }
  }

  async getPost(id: number) {
    return await this.context.loaders.postLoader.load(id)
  }
}
