import { ApolloServer } from 'apollo-server'
import { makeSchema, fieldAuthorizePlugin } from '@nexus/schema'
import path from 'path'
import * as types from './schema'
import { Context } from './data-sources/context'
import PostAPI from './data-sources/post-api'
import UserAPI from './data-sources/user-api'

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, 'ldjam-schema.graphql'),
    typegen: path.join(__dirname, 'ldjam-typegen.ts'),
  },
  plugins: [fieldAuthorizePlugin()],
  typegenAutoConfig: {
    contextType: 'ctx.Context',
    sources: [
      {
        alias: 'ctx',
        source: path.join(__dirname, 'data-sources', 'context.ts'),
      },
    ],
    backingTypeMap: {
      Date: 'Date',
    },
  },
  prettierConfig: path.join(__dirname, '../../.prettierrc'),
})

new ApolloServer({
  schema,
  context: ({ req: { headers } }) => new Context(headers),
  dataSources: () => ({
    postApi: new PostAPI(),
    userApi: new UserAPI(),
  }),
})
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
