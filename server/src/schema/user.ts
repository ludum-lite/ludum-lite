import {
  stringArg,
  mutationField,
  objectType,
  queryField,
  intArg,
} from '@nexus/schema'

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
    t.string('avatarPath', { nullable: true })
  },
})

export const me = queryField('me', {
  type: User,
  resolve: (_, __, ctx) => ctx.dataSources.userApi.me(),
})

export const user = queryField('user', {
  type: User,
  args: {
    id: intArg({ required: true }),
  },
  resolve: (_, { id }, ctx) => ctx.dataSources.userApi.getUser(id),
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
