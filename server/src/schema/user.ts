import { stringArg, mutationField, objectType, queryField } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('createdDate')
    t.string('modifiedDate')
    t.int('numGames')
    t.int('numPosts')
    t.string('name')
    t.string('profilePath')
    t.string('type')
    t.string('avatarPath')
  },
})

export const me = queryField('me', {
  type: User,
  resolve: (_, __, ctx) => ctx.dataSources.userApi.me(),
})

export const login = mutationField('login', {
  type: 'String',
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  resolve: (_, { email, password }, ctx) =>
    ctx.dataSources.userApi.login(email, password),
})
