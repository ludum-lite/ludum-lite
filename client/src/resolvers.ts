import { Resolvers, ApolloCache, gql, InMemoryCache } from '@apollo/client'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    favoritedIds: [Int!]
  }
`

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar()
        },
        favoritedIds() {
          return favoritedIdsVar()
        },
      },
    },
  },
})

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any

interface ResolverMap {
  [field: string]: ResolverFn
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}

export const resolvers: AppResolvers = {
  Query: {},
  Mutation: {},
  // Launch: {
  //   isInCart: (launch: LaunchTileTypes.LaunchTile, _, { cache }): boolean => {
  //     const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({
  //       query: GET_CART_ITEMS,
  //     })
  //     if (queryResult) {
  //       return queryResult.cartItems.includes(launch.id)
  //     }
  //     return false
  //   },
  // },
  //   addOrRemoveFromCart: (_, { id }: { id: string }, { cache }): string[] => {
  //     const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({
  //       query: GET_CART_ITEMS,
  //     })
  //     if (queryResult) {
  //       const { cartItems } = queryResult
  //       const data = {
  //         cartItems: cartItems.includes(id)
  //           ? cartItems.filter((i) => i !== id)
  //           : [...cartItems, id],
  //       }
  //       cache.writeQuery({ query: GET_CART_ITEMS, data })
  //       return data.cartItems
  //     }
  //     return []
  //   },
}

export const isLoggedInVar = cache.makeVar<boolean>(
  !!localStorage.getItem('token')
)

export const favoritedIdsVar = cache.makeVar<number[]>(
  JSON.parse(localStorage.getItem('favoritedIds') || '[]')
)
