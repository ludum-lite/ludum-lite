import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { Context } from './data-sources/context'
import PostAPI from './data-sources/post-api'
import UserAPI from './data-sources/user-api'
import { Resolvers } from './__generated__/schema-types'
import { typeDefs } from './schema'

const resolvers: Resolvers<Context> = {
  Query: {
    me(_, __, context) {
      return context.dataSources.userApi.me()
    },
    user(_, { input: { id } }, context) {
      return context.dataSources.userApi.getUser(id)
    },
    post(_, { input: { id } }, context) {
      return context.dataSources.postApi.getPost(id)
    },
    searchPosts(_, args, context) {
      return context.dataSources.postApi.searchPosts(args)
    },
  },
  Mutation: {
    login(_, { input: { email, password } }, context) {
      return context.dataSources.userApi.login(email, password)
    },
    lovePost(_, { input: { id } }, context) {
      return context.dataSources.postApi.lovePost(id)
    },
    unlovePost(_, { input: { id } }, context) {
      return context.dataSources.postApi.unlovePost(id)
    },
  },
  Post: {
    author(post, __, context) {
      return context.dataSources.userApi.getUser(post.authorId)
    },
  },
  Me: {
    lovedPosts(_, __, context) {
      return context.dataSources.userApi.getMyLovedPosts()
    },
  },
  LovePostSuccess: {
    me(_, __, context) {
      return context.dataSources.userApi.me()
    },
  },
  UnlovePostSuccess: {
    me(_, __, context) {
      return context.dataSources.userApi.me()
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

new ApolloServer({
  schema,
  context: ({ req: { headers } }): Context =>
    (({
      authToken: headers.authorization,
      loaders: {
        postLoader: undefined,
      },
    } as any) as Context),
  dataSources: () => ({
    postApi: new PostAPI(),
    userApi: new UserAPI(),
  }),
  engine: {
    apiKey: 'service:ldjam:S8IzjK8QYWQyOeLhjtuFvA',
  },
})
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
