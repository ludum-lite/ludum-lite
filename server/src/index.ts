import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { Context } from './data-sources/context'
import CommentAPI from './data-sources/comment-api'
import EventAPI from './data-sources/event-api'
import GameAPI from './data-sources/game-api'
import PostAPI from './data-sources/post-api'
import UserAPI from './data-sources/user-api'
import { typeDefs } from './schema'
import { Resolvers } from './__generated__/schema-types'

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
    featuredEvent(_, __, context) {
      return context.dataSources.eventApi.getFeaturedEvent()
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
    loveComment(_, { input: { id } }, context) {
      return context.dataSources.commentApi.loveComment(id)
    },
    unloveComment(_, { input: { id } }, context) {
      return context.dataSources.commentApi.unloveComment(id)
    },
    addComment(_, { input }, context) {
      return context.dataSources.commentApi.addComment(input)
    },
    editComment(_, { input }, context) {
      return context.dataSources.commentApi.editComment(input)
    },
    joinEvent(_, __, context) {
      return context.dataSources.eventApi.joinEvent()
    },
    editGameName(_, { input }, context) {
      return context.dataSources.gameApi.editGameName(input)
    },
    addUserToGame(_, { input }, context) {
      return context.dataSources.gameApi.addUserToGame(input)
    },
    removeUserFromGame(_, { input }, context) {
      return context.dataSources.gameApi.removeUserFromGame(input)
    },
  },
  Post: {
    author(post, __, context) {
      return context.dataSources.userApi.getUser(post.authorId)
    },
    comments(post, __, context) {
      return context.dataSources.commentApi.getCommentsForPost(post.id)
    },
    myCommentLove(post, __, context) {
      return context.dataSources.commentApi.getMyLovedCommentsForPost(post.id)
    },
  },
  Comment: {
    author(comment, __, context) {
      return context.dataSources.userApi.getUser(comment.authorId)
    },
  },
  Event: {
    currentUserGameId(_, __, context) {
      return context.dataSources.eventApi.getCurrentUserGameId()
    },
    async currentUserGame(event, __, context) {
      const gameId = await context.dataSources.eventApi.getCurrentUserGameId()

      if (gameId) {
        return context.dataSources.gameApi.getGame(gameId)
      }

      return null
    },
  },
  Me: {
    lovedPosts(_, __, context) {
      return context.dataSources.userApi.getMyLovedPosts()
    },
    userIdsImFollowing(_, __, context) {
      return context.dataSources.userApi.getUserIdsImFollowing()
    },
    async usersImFollowing(_, __, context) {
      return context.dataSources.userApi.getUsers(
        await context.dataSources.userApi.getUserIdsImFollowing()
      )
    },
    userIdsFollowingMe(_, __, context) {
      return context.dataSources.userApi.getUserIdsFollowingMe()
    },
    async usersFollowingMe(_, __, context) {
      return context.dataSources.userApi.getUsers(
        await context.dataSources.userApi.getUserIdsFollowingMe()
      )
    },
  },
  Game: {
    author(game, __, context) {
      return context.dataSources.userApi.getUser(game.authorId)
    },
    teamUsers(game, __, context) {
      return context.dataSources.gameApi.getTeamUsers(game.id)
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
  LoveCommentSuccess: {
    post(response, __, context) {
      return context.dataSources.postApi.getPost(response.comment.postId)
    },
  },
  UnloveCommentSuccess: {
    post(response, __, context) {
      return context.dataSources.postApi.getPost(response.comment.postId)
    },
  },
  JoinEventSuccess: {
    featuredEvent(_, __, context) {
      return context.dataSources.eventApi.getFeaturedEvent()
    },
  },
  EventPhase: {
    ThemeSelection: 1,
    ThemeSlaughter: 2,
    ThemeVoting: 4,
    EventRunning: 5,
    GameVoting: 6,
    Results: 7,
  },
  AddUserToGameResponseSuccess: {
    game(response, __, context) {
      return context.dataSources.gameApi.getGame(response.gameId)
    },
    user(response, __, context) {
      return context.dataSources.userApi.getUser(response.userId)
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
    commentApi: new CommentAPI(),
    userApi: new UserAPI(),
    eventApi: new EventAPI(),
    gameApi: new GameAPI(),
  }),
  engine: {
    apiKey: 'service:ldjam:S8IzjK8QYWQyOeLhjtuFvA',
  },
})
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
