import { ApolloServer } from 'apollo-server'
import { makeSchema, fieldAuthorizePlugin } from '@nexus/schema'
import path from 'path'
import * as types from './schema'
import { Context } from './data-sources/context'
import PostAPI from './data-sources/post-api'
import UserAPI from './data-sources/user-api'
// ;['debug', 'log', 'warn', 'error'].forEach((methodName) => {
//   const originalLoggingMethod = console[methodName]
//   console[methodName] = (firstArgument, ...otherArguments) => {
//     const originalPrepareStackTrace = Error.prepareStackTrace
//     Error.prepareStackTrace = (_, stack) => stack
//     const callee = new Error().stack[1]
//     Error.prepareStackTrace = originalPrepareStackTrace
//     const relativeFileName = path.relative(process.cwd(), callee.getFileName())
//     const prefix = `${relativeFileName}:${callee.getLineNumber()}:`
//     if (typeof firstArgument === 'string') {
//       originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments)
//     } else {
//       originalLoggingMethod(prefix, firstArgument, ...otherArguments)
//     }
//   }
// })

// ;['log', 'warn', 'error'].forEach((methodName) => {
//   const originalMethod = console[methodName]
//   console[methodName] = (...args) => {
//     let initiator = 'unknown place'
//     try {
//       throw new Error()
//     } catch (e) {
//       if (typeof e.stack === 'string') {
//         let isFirst = true
//         for (const line of e.stack.split('\n')) {
//           const matches = line.match(/^\s+at\s+(.*)/)
//           if (matches) {
//             if (!isFirst) {
//               // first line - current function
//               // second line - caller (what we are looking for)
//               initiator = matches[1]
//               break
//             }
//             isFirst = false
//           }
//         }
//       }
//     }
//     originalMethod.apply(console, [...args, '\n', `  at ${initiator}`])
//   }
// })

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
