import {
  objectType,
  queryField,
  intArg,
  arg,
  enumType,
  inputObjectType,
} from '@nexus/schema'
import { User } from './user'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.int('parentId')
    t.int('superparentId')
    t.int('authorId')
    t.string('type', { nullable: true })
    t.string('subtype', { nullable: true })
    t.string('subsubtype', { nullable: true })
    t.string('publishedDate', { nullable: true })
    t.string('createdDate', { nullable: true })
    t.string('modifiedDate', { nullable: true })
    t.string('slug', { nullable: true })
    t.string('name', { nullable: true })
    t.string('body')
    t.string('path', { nullable: true })
    t.int('parentIds', { list: [false] })
    t.int('numLove', { nullable: true })
    t.string('lastLoveChangedDate', { nullable: true })
    t.int('numNotes', { nullable: true })
    t.string('lastNotesChangedDate', { nullable: true })
    t.field('author', {
      type: User,
      nullable: true,
      resolve(root, __, ctx) {
        return ctx.dataSources.userApi.getUser(root.authorId)
      },
    })
  },
})

export const PostType = enumType({
  name: 'PostType',
  members: ['news', 'user'],
})

const SearchPostResponse = objectType({
  name: 'SearchPostResponse',
  definition(t) {
    t.list.field('posts', { type: Post })
    t.int('page')
    t.int('limit')
  },
})

export const searchPosts = queryField('searchPosts', {
  type: SearchPostResponse,
  args: {
    page: intArg({ required: true }),
    limit: intArg({ required: true }),
    filters: arg({
      required: true,
      type: inputObjectType({
        name: 'SearchPostsFiltersInput',
        definition(t) {
          t.field('postType', { type: 'PostType', required: true })
        },
      }),
    }),
  },
  resolve: (_, args, ctx) => ctx.dataSources.postApi.searchPosts(args),
})

export const post = queryField('post', {
  type: Post,
  args: {
    id: intArg({ required: true }),
  },
  resolve: async (_, { id }, ctx) => {
    const post = await ctx.dataSources.postApi.getPost(id)

    return post
  },
})
