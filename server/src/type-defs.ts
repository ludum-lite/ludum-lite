import { gql } from 'apollo-server'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export default gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # type User {

  # }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    id: Int
    parent: Int
    superparent: Int
    # author: User
    type: String
    subtype: String
    subsubtype: String
    published: String
    created: String
    modified: String
    version: Int
    slug: String
    name: String
    body: String
    path: String
    parents: [Int]!
    love: Int
    loveTimestamp: String
    # was love-timestamp
    notes: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    posts: [Post]
  }

  type Mutation {
    login(email: String, password: String): String
    me: String
  }
`
