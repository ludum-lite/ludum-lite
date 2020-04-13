import BaseAPI from './base-api'
import { NexusGenFieldTypes } from '../ldjam-typegen'

type ApiPostDto = {
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

function postReducer(post: ApiPostDto): NexusGenFieldTypes['Post'] {
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
  }
}

export default class PostAPI extends BaseAPI {
  async getAllPosts() {
    const rawIds = (await this.get('vx/node/feed/1/all/post')).feed.map(
      (p: any) => p.id
    )

    const response = await this.get(
      `vx/node2/get/${rawIds.join('+')}?author&parent&superparent`
    )
    return response.node.map((p: ApiPostDto) => postReducer(p))
  }

  async getPost(postId: string) {
    const response = await this.get(
      `vx/node2/get/${postId}?author&parent&superparent`
    )

    if (response.node.length === 1) {
      return postReducer(response.node[0])
    } else {
      throw new Error(`got different length of nodes. ${response}`)
    }
  }
}
