import { objectType, queryField } from '@nexus/schema'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id', { nullable: true })
    t.int('parentId', { nullable: true })
    t.int('superparentId', { nullable: true })
    t.int('authorId', { nullable: true })
    t.string('type', { nullable: true })
    t.string('subtype', { nullable: true })
    t.string('subsubtype', { nullable: true })
    t.string('publishedDate', { nullable: true })
    t.string('createdDate', { nullable: true })
    t.string('modifiedDate', { nullable: true })
    t.string('slug', { nullable: true })
    t.string('name', { nullable: true })
    t.string('body', { nullable: true })
    t.string('path', { nullable: true })
    t.int('parentIds', { list: [false] })
    t.int('numLove', { nullable: true })
    t.string('lastLoveChangedDate', { nullable: true })
    t.int('numNotes', { nullable: true })
    t.string('lastNotesChangedDate', { nullable: true })
  },
})

export const posts = queryField('posts', {
  type: Post,
  list: true,
  resolve: (_, __, ctx) => ctx.dataSources.postApi.getAllPosts(),
})
