import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    me: MeResponse!
    post(input: IdInput!): Post!
    searchPosts(
      filters: SearchPostsFiltersInput!
      limit: Int!
      page: Int!
    ): SearchPostResponse!
    user(input: IdInput!): User!
    featuredEvent: FeaturedEventResponse!
  }

  type Mutation {
    login(input: LoginInput!): LoginResponse!
    lovePost(input: IdInput!): LovePostResponse!
    unlovePost(input: IdInput!): UnlovePostResponse!
    loveComment(input: IdInput!): LoveCommentResponse!
    unloveComment(input: IdInput!): UnloveCommentResponse!
    addComment(input: AddCommentInput!): AddCommentResponse!
    editComment(input: EditCommentInput!): EditCommentResponse!
    joinEvent: JoinEventResponse!
  }

  #########
  # General
  #########

  interface MutationResponse {
    success: Boolean!
  }

  type UnauthorizedResponse {
    code: String!
  }

  input IdInput {
    id: Int!
  }

  ######
  # User
  ######

  interface BaseUser {
    avatarPath: String
    createdDate: String!
    id: Int!
    modifiedDate: String!
    name: String!
    numGames: Int!
    numPosts: Int!
    profilePath: String!
    type: String!
  }

  type User implements BaseUser {
    avatarPath: String
    createdDate: String!
    id: Int!
    modifiedDate: String!
    name: String!
    numGames: Int!
    numPosts: Int!
    profilePath: String!
    type: String!
  }

  type Me implements BaseUser {
    avatarPath: String
    createdDate: String!
    id: Int!
    modifiedDate: String!
    name: String!
    numGames: Int!
    numPosts: Int!
    profilePath: String!
    type: String!
    lovedPosts: [Int!]!
  }

  union MeResponse = Me | UnauthorizedResponse

  input LoginInput {
    email: String!
    password: String!
  }

  #######
  # Login
  #######

  type LoginFailure implements MutationResponse {
    success: Boolean!
    message: String!
  }

  type LoginSuccess implements MutationResponse {
    success: Boolean!
    token: String!
  }

  union LoginResponse = LoginFailure | LoginSuccess

  ######
  # Post
  ######

  enum PostType {
    All
    News
    Favorites
  }

  type Post {
    author: User
    authorId: Int!
    body: String!
    createdDate: String
    id: Int!
    lastLoveChangedDate: String
    lastNotesChangedDate: String
    modifiedDate: String
    name: String!
    numLove: Int!
    numNotes: Int!
    parentId: Int!
    parentIds: [Int!]!
    path: String
    publishedDate: String
    slug: String
    subsubtype: String
    subtype: String
    superparentId: Int!
    type: String
    comments: [Comment!]
    myCommentLove: [Int!]
  }

  type LovePostSuccess implements MutationResponse {
    success: Boolean!
    post: Post!
    me: MeResponse
  }

  union LovePostResponse = LovePostSuccess | UnauthorizedResponse

  type UnlovePostSuccess implements MutationResponse {
    success: Boolean!
    post: Post!
    me: MeResponse
  }

  union UnlovePostResponse = UnlovePostSuccess | UnauthorizedResponse

  type SearchPostResponse {
    limit: Int!
    page: Int!
    posts: [Post!]!
  }

  input SearchPostsFiltersInput {
    postType: PostType!
    favoritedIds: [Int!]
  }

  #########
  # Comment
  #########

  type Comment {
    id: Int!
    authorId: Int!
    author: User
    createdDate: String!
    modifiedDate: String
    post: Post
    postId: Int!
    currentUserHasLoved: Boolean!
    body: String!
    numLove: Int!
  }

  # Love comment
  type LoveCommentSuccess implements MutationResponse {
    success: Boolean!
    comment: Comment!
    post: Post
  }

  union LoveCommentResponse = LoveCommentSuccess | UnauthorizedResponse

  # Unlove comment
  type UnloveCommentSuccess implements MutationResponse {
    success: Boolean!
    comment: Comment!
    post: Post
  }

  union UnloveCommentResponse = UnloveCommentSuccess | UnauthorizedResponse

  # Add comment
  input AddCommentInput {
    postId: Int!
    body: String!
  }

  type AddCommentSuccess implements MutationResponse {
    success: Boolean!
    comment: Comment!
  }

  union AddCommentResponse = AddCommentSuccess | UnauthorizedResponse

  # Edit comment
  input EditCommentInput {
    id: Int!
    postId: Int!
    body: String!
  }

  type EditCommentSuccess implements MutationResponse {
    success: Boolean!
    comment: Comment!
  }

  union EditCommentResponse = EditCommentSuccess | UnauthorizedResponse

  #########
  # Event
  #########

  type Event {
    id: Int!
    name: String!
    body: String!
    slug: String!
    createdDate: String!
    currentUserGameId: Int
    eventPhase: EventPhase!
  }

  enum EventPhase {
    ThemeSelection
    ThemeSlaughter
    ThemeVoting
    EventRunning
    GameVoting
    Results
  }

  union FeaturedEventResponse = Event | UnauthorizedResponse

  type JoinEventSuccess implements MutationResponse {
    success: Boolean!
    featuredEvent: Event
    gameId: Int!
  }

  union JoinEventResponse = JoinEventSuccess | UnauthorizedResponse
`
