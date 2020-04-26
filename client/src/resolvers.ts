import { Resolvers, gql } from '@apollo/client'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`

export const resolvers: Resolvers = {
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
  Query: {},
  // Mutation: {
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
  // },
}
