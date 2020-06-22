import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename: 'Query'
  favoritedIds: Array<Scalars['Int']>
  featuredEvent: Event
  isLoggedIn: Scalars['Boolean']
  me: MeResponse
  post: Post
  searchPosts: SearchPostResponse
  user: User
}

export type QueryPostArgs = {
  input: IdInput
}

export type QuerySearchPostsArgs = {
  filters: SearchPostsFiltersInput
  limit: Scalars['Int']
  page: Scalars['Int']
}

export type QueryUserArgs = {
  input: IdInput
}

export type Mutation = {
  __typename: 'Mutation'
  login: LoginResponse
  lovePost: LovePostResponse
  unlovePost: UnlovePostResponse
  loveComment: LoveCommentResponse
  unloveComment: UnloveCommentResponse
  addComment: AddCommentResponse
  editComment: EditCommentResponse
  joinEvent: JoinEventResponse
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationLovePostArgs = {
  input: IdInput
}

export type MutationUnlovePostArgs = {
  input: IdInput
}

export type MutationLoveCommentArgs = {
  input: IdInput
}

export type MutationUnloveCommentArgs = {
  input: IdInput
}

export type MutationAddCommentArgs = {
  input: AddCommentInput
}

export type MutationEditCommentArgs = {
  input: EditCommentInput
}

export type MutationResponse = {
  success: Scalars['Boolean']
}

export type UnauthorizedResponse = {
  __typename: 'UnauthorizedResponse'
  code: Scalars['String']
}

export type IdInput = {
  id: Scalars['Int']
}

export type BaseUser = {
  avatarPath?: Maybe<Scalars['String']>
  createdDate: Scalars['String']
  id: Scalars['Int']
  modifiedDate: Scalars['String']
  name: Scalars['String']
  numGames: Scalars['Int']
  numPosts: Scalars['Int']
  profilePath: Scalars['String']
  type: Scalars['String']
}

export type User = BaseUser & {
  __typename: 'User'
  avatarPath?: Maybe<Scalars['String']>
  createdDate: Scalars['String']
  id: Scalars['Int']
  modifiedDate: Scalars['String']
  name: Scalars['String']
  numGames: Scalars['Int']
  numPosts: Scalars['Int']
  profilePath: Scalars['String']
  type: Scalars['String']
}

export type Me = BaseUser & {
  __typename: 'Me'
  avatarPath?: Maybe<Scalars['String']>
  createdDate: Scalars['String']
  id: Scalars['Int']
  modifiedDate: Scalars['String']
  name: Scalars['String']
  numGames: Scalars['Int']
  numPosts: Scalars['Int']
  profilePath: Scalars['String']
  type: Scalars['String']
  lovedPosts: Array<Scalars['Int']>
}

export type MeResponse = Me | UnauthorizedResponse

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginFailure = MutationResponse & {
  __typename: 'LoginFailure'
  success: Scalars['Boolean']
  message: Scalars['String']
}

export type LoginSuccess = MutationResponse & {
  __typename: 'LoginSuccess'
  success: Scalars['Boolean']
  token: Scalars['String']
}

export type LoginResponse = LoginFailure | LoginSuccess

export enum PostType {
  All = 'All',
  News = 'News',
  Favorites = 'Favorites',
}

export type Post = {
  __typename: 'Post'
  author?: Maybe<User>
  authorId: Scalars['Int']
  body: Scalars['String']
  createdDate?: Maybe<Scalars['String']>
  id: Scalars['Int']
  lastLoveChangedDate?: Maybe<Scalars['String']>
  lastNotesChangedDate?: Maybe<Scalars['String']>
  modifiedDate?: Maybe<Scalars['String']>
  name: Scalars['String']
  numLove: Scalars['Int']
  numNotes: Scalars['Int']
  parentId: Scalars['Int']
  parentIds: Array<Scalars['Int']>
  path?: Maybe<Scalars['String']>
  publishedDate?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  subsubtype?: Maybe<Scalars['String']>
  subtype?: Maybe<Scalars['String']>
  superparentId: Scalars['Int']
  type?: Maybe<Scalars['String']>
  comments?: Maybe<Array<Comment>>
  myCommentLove?: Maybe<Array<Scalars['Int']>>
}

export type LovePostSuccess = MutationResponse & {
  __typename: 'LovePostSuccess'
  success: Scalars['Boolean']
  post: Post
  me?: Maybe<MeResponse>
}

export type LovePostResponse = LovePostSuccess | UnauthorizedResponse

export type UnlovePostSuccess = MutationResponse & {
  __typename: 'UnlovePostSuccess'
  success: Scalars['Boolean']
  post: Post
  me?: Maybe<MeResponse>
}

export type UnlovePostResponse = UnlovePostSuccess | UnauthorizedResponse

export type SearchPostResponse = {
  __typename: 'SearchPostResponse'
  limit: Scalars['Int']
  page: Scalars['Int']
  posts: Array<Post>
}

export type SearchPostsFiltersInput = {
  postType: PostType
  favoritedIds?: Maybe<Array<Scalars['Int']>>
}

export type Comment = {
  __typename: 'Comment'
  id: Scalars['Int']
  authorId: Scalars['Int']
  author?: Maybe<User>
  createdDate: Scalars['String']
  modifiedDate?: Maybe<Scalars['String']>
  post?: Maybe<Post>
  postId: Scalars['Int']
  currentUserHasLoved: Scalars['Boolean']
  body: Scalars['String']
  numLove: Scalars['Int']
}

export type LoveCommentSuccess = MutationResponse & {
  __typename: 'LoveCommentSuccess'
  success: Scalars['Boolean']
  comment: Comment
  post?: Maybe<Post>
}

export type LoveCommentResponse = LoveCommentSuccess | UnauthorizedResponse

export type UnloveCommentSuccess = MutationResponse & {
  __typename: 'UnloveCommentSuccess'
  success: Scalars['Boolean']
  comment: Comment
  post?: Maybe<Post>
}

export type UnloveCommentResponse = UnloveCommentSuccess | UnauthorizedResponse

export type AddCommentInput = {
  postId: Scalars['Int']
  body: Scalars['String']
}

export type AddCommentSuccess = MutationResponse & {
  __typename: 'AddCommentSuccess'
  success: Scalars['Boolean']
  comment: Comment
}

export type AddCommentResponse = AddCommentSuccess | UnauthorizedResponse

export type EditCommentInput = {
  id: Scalars['Int']
  postId: Scalars['Int']
  body: Scalars['String']
}

export type EditCommentSuccess = MutationResponse & {
  __typename: 'EditCommentSuccess'
  success: Scalars['Boolean']
  comment: Comment
}

export type EditCommentResponse = EditCommentSuccess | UnauthorizedResponse

export type Event = {
  __typename: 'Event'
  id: Scalars['Int']
  name: Scalars['String']
  body: Scalars['String']
  slug: Scalars['String']
  createdDate: Scalars['String']
  currentUserGameId?: Maybe<Scalars['Int']>
  eventPhase: EventPhase
}

export enum EventPhase {
  ThemeSelection = 'ThemeSelection',
  ThemeSlaughter = 'ThemeSlaughter',
  ThemeVoting = 'ThemeVoting',
  EventRunning = 'EventRunning',
  GameVoting = 'GameVoting',
  Results = 'Results',
}

export type JoinEventSuccess = MutationResponse & {
  __typename: 'JoinEventSuccess'
  success: Scalars['Boolean']
  featuredEvent?: Maybe<Event>
  gameId: Scalars['Int']
}

export type JoinEventResponse = JoinEventSuccess | UnauthorizedResponse

export type GameWidget_EventFragment = { __typename: 'Event' } & Pick<
  Event,
  'id' | 'currentUserGameId' | 'eventPhase'
>

export type GameWidgetDataQueryVariables = Exact<{ [key: string]: never }>

export type GameWidgetDataQuery = { __typename: 'Query' } & {
  featuredEvent: { __typename: 'Event' } & GameWidget_EventFragment
}

export type JoinEventMutationVariables = Exact<{ [key: string]: never }>

export type JoinEventMutation = { __typename: 'Mutation' } & {
  joinEvent:
    | ({ __typename: 'JoinEventSuccess' } & Pick<JoinEventSuccess, 'gameId'> & {
          featuredEvent?: Maybe<
            { __typename: 'Event' } & Pick<Event, 'id' | 'currentUserGameId'>
          >
        })
    | { __typename: 'UnauthorizedResponse' }
}

export type AddCommentForm_PostFragment = { __typename: 'Post' } & Pick<
  Post,
  'id'
> & { comments?: Maybe<Array<{ __typename: 'Comment' } & Pick<Comment, 'id'>>> }

export type AddCommentMutationVariables = Exact<{
  input: AddCommentInput
}>

export type AddCommentMutation = { __typename: 'Mutation' } & {
  addComment:
    | ({ __typename: 'AddCommentSuccess' } & {
        comment: { __typename: 'Comment' } & Pick<
          Comment,
          'id' | 'postId' | 'body'
        >
      })
    | { __typename: 'UnauthorizedResponse' }
}

export type Comment_CommentFragment = { __typename: 'Comment' } & Pick<
  Comment,
  'id' | 'body' | 'numLove' | 'createdDate'
> & {
    author?: Maybe<
      { __typename: 'User' } & Pick<
        User,
        'id' | 'avatarPath' | 'profilePath' | 'name'
      >
    >
  } & CommentLoveButton_CommentFragment &
  EditCommentForm_CommentFragment

export type Comment_PostFragment = { __typename: 'Post' } & Pick<
  Post,
  'authorId'
> &
  CommentLoveButton_PostFragment

export type Comments_CommentFragment = {
  __typename: 'Comment'
} & Comment_CommentFragment

export type Comments_PostFragment = {
  __typename: 'Post'
} & Comment_PostFragment

export type EditCommentForm_CommentFragment = { __typename: 'Comment' } & Pick<
  Comment,
  'id' | 'postId' | 'body'
>

export type EditCommentMutationVariables = Exact<{
  input: EditCommentInput
}>

export type EditCommentMutation = { __typename: 'Mutation' } & {
  editComment:
    | ({ __typename: 'EditCommentSuccess' } & {
        comment: { __typename: 'Comment' } & Pick<Comment, 'id' | 'body'>
      })
    | { __typename: 'UnauthorizedResponse' }
}

export type Post_PostFragment = { __typename: 'Post' } & Pick<
  Post,
  'id' | 'numLove' | 'numNotes' | 'name' | 'body' | 'publishedDate'
> & {
    author?: Maybe<
      { __typename: 'User' } & Pick<
        User,
        'id' | 'profilePath' | 'avatarPath' | 'name'
      >
    >
  } & PostDetails_PostFragment &
  PostLoveButton_PostFragment &
  PostCommentButton_PostFragment

type Post_Me_Me_Fragment = { __typename: 'Me' } & PostLoveButton_Me_Me_Fragment

type Post_Me_UnauthorizedResponse_Fragment = {
  __typename: 'UnauthorizedResponse'
} & PostLoveButton_Me_UnauthorizedResponse_Fragment

export type Post_MeFragment =
  | Post_Me_Me_Fragment
  | Post_Me_UnauthorizedResponse_Fragment

export type PostDetails_PostFragment = { __typename: 'Post' } & Pick<
  Post,
  'id' | 'name' | 'body' | 'publishedDate'
> & {
    author?: Maybe<
      { __typename: 'User' } & Pick<
        User,
        'id' | 'profilePath' | 'avatarPath' | 'name'
      >
    >
  }

export type GetPostOverlayPageDataQueryVariables = Exact<{
  input: IdInput
}>

export type GetPostOverlayPageDataQuery = { __typename: 'Query' } & {
  post: { __typename: 'Post' } & Pick<
    Post,
    'id' | 'name' | 'publishedDate' | 'body'
  > & {
      author?: Maybe<
        { __typename: 'User' } & Pick<
          User,
          'id' | 'profilePath' | 'avatarPath' | 'name'
        >
      >
      comments?: Maybe<
        Array<{ __typename: 'Comment' } & Comments_CommentFragment>
      >
    } & PostLoveButton_PostFragment &
    Comments_PostFragment
  me:
    | ({ __typename: 'Me' } & PostLoveButton_Me_Me_Fragment)
    | ({
        __typename: 'UnauthorizedResponse'
      } & PostLoveButton_Me_UnauthorizedResponse_Fragment)
}

export type PostsPage_GetFavoritedIdsQueryVariables = Exact<{
  [key: string]: never
}>

export type PostsPage_GetFavoritedIdsQuery = { __typename: 'Query' } & Pick<
  Query,
  'favoritedIds'
>

export type GetPostsPageDataQueryVariables = Exact<{
  filters: SearchPostsFiltersInput
  limit: Scalars['Int']
  page: Scalars['Int']
}>

export type GetPostsPageDataQuery = { __typename: 'Query' } & Pick<
  Query,
  'isLoggedIn'
> & {
    searchPosts: { __typename: 'SearchPostResponse' } & Pick<
      SearchPostResponse,
      'page'
    > & {
        posts: Array<
          { __typename: 'Post' } & Pick<Post, 'id' | 'publishedDate'> &
            Post_PostFragment
        >
      }
    me:
      | ({ __typename: 'Me' } & Post_Me_Me_Fragment)
      | ({
          __typename: 'UnauthorizedResponse'
        } & Post_Me_UnauthorizedResponse_Fragment)
  }

export type CommentLoveButton_CommentFragment = {
  __typename: 'Comment'
} & Pick<Comment, 'id' | 'numLove'>

export type CommentLoveButton_PostFragment = { __typename: 'Post' } & Pick<
  Post,
  'id' | 'myCommentLove'
>

export type LoveCommentMutationVariables = Exact<{
  input: IdInput
}>

export type LoveCommentMutation = { __typename: 'Mutation' } & {
  loveComment:
    | ({ __typename: 'LoveCommentSuccess' } & {
        comment: { __typename: 'Comment' } & CommentLoveButton_CommentFragment
        post?: Maybe<{ __typename: 'Post' } & CommentLoveButton_PostFragment>
      })
    | { __typename: 'UnauthorizedResponse' }
}

export type UnloveCommentMutationVariables = Exact<{
  input: IdInput
}>

export type UnloveCommentMutation = { __typename: 'Mutation' } & {
  unloveComment:
    | ({ __typename: 'UnloveCommentSuccess' } & {
        comment: { __typename: 'Comment' } & CommentLoveButton_CommentFragment
        post?: Maybe<{ __typename: 'Post' } & CommentLoveButton_PostFragment>
      })
    | { __typename: 'UnauthorizedResponse' }
}

export type PostBookmarkButton_GetFavoritedIdsQueryVariables = Exact<{
  [key: string]: never
}>

export type PostBookmarkButton_GetFavoritedIdsQuery = {
  __typename: 'Query'
} & Pick<Query, 'favoritedIds'>

export type PostCommentButton_PostFragment = { __typename: 'Post' } & Pick<
  Post,
  'id' | 'numNotes'
>

export type PostLoveButton_PostFragment = { __typename: 'Post' } & Pick<
  Post,
  'id' | 'numLove'
>

type PostLoveButton_Me_Me_Fragment = { __typename: 'Me' } & Pick<
  Me,
  'id' | 'lovedPosts'
>

type PostLoveButton_Me_UnauthorizedResponse_Fragment = {
  __typename: 'UnauthorizedResponse'
}

export type PostLoveButton_MeFragment =
  | PostLoveButton_Me_Me_Fragment
  | PostLoveButton_Me_UnauthorizedResponse_Fragment

export type LovePostMutationVariables = Exact<{
  input: IdInput
}>

export type LovePostMutation = { __typename: 'Mutation' } & {
  lovePost:
    | ({ __typename: 'LovePostSuccess' } & {
        post: { __typename: 'Post' } & PostLoveButton_PostFragment
        me?: Maybe<
          | ({ __typename: 'Me' } & PostLoveButton_Me_Me_Fragment)
          | ({
              __typename: 'UnauthorizedResponse'
            } & PostLoveButton_Me_UnauthorizedResponse_Fragment)
        >
      })
    | { __typename: 'UnauthorizedResponse' }
}

export type UnlovePostMutationVariables = Exact<{
  input: IdInput
}>

export type UnlovePostMutation = { __typename: 'Mutation' } & {
  unlovePost:
    | ({ __typename: 'UnlovePostSuccess' } & {
        post: { __typename: 'Post' } & PostLoveButton_PostFragment
        me?: Maybe<
          | ({ __typename: 'Me' } & PostLoveButton_Me_Me_Fragment)
          | ({
              __typename: 'UnauthorizedResponse'
            } & PostLoveButton_Me_UnauthorizedResponse_Fragment)
        >
      })
    | { __typename: 'UnauthorizedResponse' }
}

export type TeamWidget_EventFragment = { __typename: 'Event' } & Pick<
  Event,
  'id' | 'currentUserGameId' | 'eventPhase'
>

export type TeamWidgetDataQueryVariables = Exact<{ [key: string]: never }>

export type TeamWidgetDataQuery = { __typename: 'Query' } & {
  featuredEvent: { __typename: 'Event' } & GameWidget_EventFragment
}

export type GlobalIsLoggedInQueryVariables = Exact<{ [key: string]: never }>

export type GlobalIsLoggedInQuery = { __typename: 'Query' } & Pick<
  Query,
  'isLoggedIn'
>

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = { __typename: 'Mutation' } & {
  login:
    | ({ __typename: 'LoginFailure' } & Pick<LoginFailure, 'message'>)
    | ({ __typename: 'LoginSuccess' } & Pick<LoginSuccess, 'token'>)
}

export type GetMeDataQueryVariables = Exact<{ [key: string]: never }>

export type GetMeDataQuery = { __typename: 'Query' } & {
  me:
    | ({ __typename: 'Me' } & Pick<Me, 'id'>)
    | { __typename: 'UnauthorizedResponse' }
}

export const GameWidget_EventFragmentDoc = gql`
  fragment GameWidget_event on Event {
    id
    currentUserGameId
    eventPhase
  }
`
export const AddCommentForm_PostFragmentDoc = gql`
  fragment AddCommentForm_post on Post {
    id
    comments {
      id
    }
  }
`
export const CommentLoveButton_CommentFragmentDoc = gql`
  fragment CommentLoveButton_comment on Comment {
    id
    numLove
  }
`
export const EditCommentForm_CommentFragmentDoc = gql`
  fragment EditCommentForm_comment on Comment {
    id
    postId
    body
  }
`
export const Comment_CommentFragmentDoc = gql`
  fragment Comment_comment on Comment {
    id
    body
    numLove
    createdDate
    author {
      id
      avatarPath
      profilePath
      name
    }
    ...CommentLoveButton_comment
    ...EditCommentForm_comment
  }
  ${CommentLoveButton_CommentFragmentDoc}
  ${EditCommentForm_CommentFragmentDoc}
`
export const Comments_CommentFragmentDoc = gql`
  fragment Comments_comment on Comment {
    ...Comment_comment
  }
  ${Comment_CommentFragmentDoc}
`
export const CommentLoveButton_PostFragmentDoc = gql`
  fragment CommentLoveButton_post on Post {
    id
    myCommentLove
  }
`
export const Comment_PostFragmentDoc = gql`
  fragment Comment_post on Post {
    authorId
    ...CommentLoveButton_post
  }
  ${CommentLoveButton_PostFragmentDoc}
`
export const Comments_PostFragmentDoc = gql`
  fragment Comments_post on Post {
    ...Comment_post
  }
  ${Comment_PostFragmentDoc}
`
export const PostDetails_PostFragmentDoc = gql`
  fragment PostDetails_post on Post {
    id
    name
    body
    publishedDate
    author {
      id
      profilePath
      avatarPath
      name
    }
  }
`
export const PostLoveButton_PostFragmentDoc = gql`
  fragment PostLoveButton_post on Post {
    id
    numLove
  }
`
export const PostCommentButton_PostFragmentDoc = gql`
  fragment PostCommentButton_post on Post {
    id
    numNotes
  }
`
export const Post_PostFragmentDoc = gql`
  fragment Post_post on Post {
    id
    numLove
    numNotes
    name
    body
    publishedDate
    author {
      id
      profilePath
      avatarPath
      name
    }
    ...PostDetails_post
    ...PostLoveButton_post
    ...PostCommentButton_post
  }
  ${PostDetails_PostFragmentDoc}
  ${PostLoveButton_PostFragmentDoc}
  ${PostCommentButton_PostFragmentDoc}
`
export const PostLoveButton_MeFragmentDoc = gql`
  fragment PostLoveButton_me on MeResponse {
    ... on Me {
      __typename
      id
      lovedPosts
    }
  }
`
export const Post_MeFragmentDoc = gql`
  fragment Post_me on MeResponse {
    ...PostLoveButton_me
  }
  ${PostLoveButton_MeFragmentDoc}
`
export const TeamWidget_EventFragmentDoc = gql`
  fragment TeamWidget_event on Event {
    id
    currentUserGameId
    eventPhase
  }
`
export const GameWidgetDataDocument = gql`
  query GameWidgetData {
    featuredEvent {
      ...GameWidget_event
    }
  }
  ${GameWidget_EventFragmentDoc}
`

/**
 * __useGameWidgetDataQuery__
 *
 * To run a query within a React component, call `useGameWidgetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameWidgetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameWidgetDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGameWidgetDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GameWidgetDataQuery,
    GameWidgetDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GameWidgetDataQuery,
    GameWidgetDataQueryVariables
  >(GameWidgetDataDocument, baseOptions)
}
export function useGameWidgetDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GameWidgetDataQuery,
    GameWidgetDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GameWidgetDataQuery,
    GameWidgetDataQueryVariables
  >(GameWidgetDataDocument, baseOptions)
}
export type GameWidgetDataQueryHookResult = ReturnType<
  typeof useGameWidgetDataQuery
>
export type GameWidgetDataLazyQueryHookResult = ReturnType<
  typeof useGameWidgetDataLazyQuery
>
export type GameWidgetDataQueryResult = ApolloReactCommon.QueryResult<
  GameWidgetDataQuery,
  GameWidgetDataQueryVariables
>
export const JoinEventDocument = gql`
  mutation JoinEvent {
    joinEvent {
      ... on JoinEventSuccess {
        gameId
        featuredEvent {
          id
          currentUserGameId
        }
      }
    }
  }
`
export type JoinEventMutationFn = ApolloReactCommon.MutationFunction<
  JoinEventMutation,
  JoinEventMutationVariables
>

/**
 * __useJoinEventMutation__
 *
 * To run a mutation, you first call `useJoinEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinEventMutation, { data, loading, error }] = useJoinEventMutation({
 *   variables: {
 *   },
 * });
 */
export function useJoinEventMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    JoinEventMutation,
    JoinEventMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    JoinEventMutation,
    JoinEventMutationVariables
  >(JoinEventDocument, baseOptions)
}
export type JoinEventMutationHookResult = ReturnType<
  typeof useJoinEventMutation
>
export type JoinEventMutationResult = ApolloReactCommon.MutationResult<
  JoinEventMutation
>
export type JoinEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  JoinEventMutation,
  JoinEventMutationVariables
>
export const AddCommentDocument = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      ... on AddCommentSuccess {
        comment {
          id
          postId
          body
        }
      }
    }
  }
`
export type AddCommentMutationFn = ApolloReactCommon.MutationFunction<
  AddCommentMutation,
  AddCommentMutationVariables
>

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddCommentMutation,
    AddCommentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddCommentMutation,
    AddCommentMutationVariables
  >(AddCommentDocument, baseOptions)
}
export type AddCommentMutationHookResult = ReturnType<
  typeof useAddCommentMutation
>
export type AddCommentMutationResult = ApolloReactCommon.MutationResult<
  AddCommentMutation
>
export type AddCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddCommentMutation,
  AddCommentMutationVariables
>
export const EditCommentDocument = gql`
  mutation EditComment($input: EditCommentInput!) {
    editComment(input: $input) {
      ... on EditCommentSuccess {
        comment {
          id
          body
        }
      }
    }
  }
`
export type EditCommentMutationFn = ApolloReactCommon.MutationFunction<
  EditCommentMutation,
  EditCommentMutationVariables
>

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditCommentMutation,
    EditCommentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    EditCommentMutation,
    EditCommentMutationVariables
  >(EditCommentDocument, baseOptions)
}
export type EditCommentMutationHookResult = ReturnType<
  typeof useEditCommentMutation
>
export type EditCommentMutationResult = ApolloReactCommon.MutationResult<
  EditCommentMutation
>
export type EditCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditCommentMutation,
  EditCommentMutationVariables
>
export const GetPostOverlayPageDataDocument = gql`
  query GetPostOverlayPageData($input: IdInput!) {
    post(input: $input) {
      id
      name
      publishedDate
      body
      author {
        id
        profilePath
        avatarPath
        name
      }
      comments {
        ...Comments_comment
      }
      ...PostLoveButton_post
      ...Comments_post
    }
    me {
      ...PostLoveButton_me
    }
  }
  ${Comments_CommentFragmentDoc}
  ${PostLoveButton_PostFragmentDoc}
  ${Comments_PostFragmentDoc}
  ${PostLoveButton_MeFragmentDoc}
`

/**
 * __useGetPostOverlayPageDataQuery__
 *
 * To run a query within a React component, call `useGetPostOverlayPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostOverlayPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostOverlayPageDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPostOverlayPageDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPostOverlayPageDataQuery,
    GetPostOverlayPageDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPostOverlayPageDataQuery,
    GetPostOverlayPageDataQueryVariables
  >(GetPostOverlayPageDataDocument, baseOptions)
}
export function useGetPostOverlayPageDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPostOverlayPageDataQuery,
    GetPostOverlayPageDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPostOverlayPageDataQuery,
    GetPostOverlayPageDataQueryVariables
  >(GetPostOverlayPageDataDocument, baseOptions)
}
export type GetPostOverlayPageDataQueryHookResult = ReturnType<
  typeof useGetPostOverlayPageDataQuery
>
export type GetPostOverlayPageDataLazyQueryHookResult = ReturnType<
  typeof useGetPostOverlayPageDataLazyQuery
>
export type GetPostOverlayPageDataQueryResult = ApolloReactCommon.QueryResult<
  GetPostOverlayPageDataQuery,
  GetPostOverlayPageDataQueryVariables
>
export const PostsPage_GetFavoritedIdsDocument = gql`
  query PostsPage_GetFavoritedIds {
    favoritedIds @client
  }
`

/**
 * __usePostsPage_GetFavoritedIdsQuery__
 *
 * To run a query within a React component, call `usePostsPage_GetFavoritedIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsPage_GetFavoritedIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsPage_GetFavoritedIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsPage_GetFavoritedIdsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PostsPage_GetFavoritedIdsQuery,
    PostsPage_GetFavoritedIdsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PostsPage_GetFavoritedIdsQuery,
    PostsPage_GetFavoritedIdsQueryVariables
  >(PostsPage_GetFavoritedIdsDocument, baseOptions)
}
export function usePostsPage_GetFavoritedIdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PostsPage_GetFavoritedIdsQuery,
    PostsPage_GetFavoritedIdsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PostsPage_GetFavoritedIdsQuery,
    PostsPage_GetFavoritedIdsQueryVariables
  >(PostsPage_GetFavoritedIdsDocument, baseOptions)
}
export type PostsPage_GetFavoritedIdsQueryHookResult = ReturnType<
  typeof usePostsPage_GetFavoritedIdsQuery
>
export type PostsPage_GetFavoritedIdsLazyQueryHookResult = ReturnType<
  typeof usePostsPage_GetFavoritedIdsLazyQuery
>
export type PostsPage_GetFavoritedIdsQueryResult = ApolloReactCommon.QueryResult<
  PostsPage_GetFavoritedIdsQuery,
  PostsPage_GetFavoritedIdsQueryVariables
>
export const GetPostsPageDataDocument = gql`
  query GetPostsPageData(
    $filters: SearchPostsFiltersInput!
    $limit: Int!
    $page: Int!
  ) {
    isLoggedIn @client
    searchPosts(filters: $filters, limit: $limit, page: $page) {
      page
      posts {
        id
        publishedDate
        ...Post_post
      }
    }
    me {
      ...Post_me
    }
  }
  ${Post_PostFragmentDoc}
  ${Post_MeFragmentDoc}
`

/**
 * __useGetPostsPageDataQuery__
 *
 * To run a query within a React component, call `useGetPostsPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsPageDataQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetPostsPageDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPostsPageDataQuery,
    GetPostsPageDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPostsPageDataQuery,
    GetPostsPageDataQueryVariables
  >(GetPostsPageDataDocument, baseOptions)
}
export function useGetPostsPageDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPostsPageDataQuery,
    GetPostsPageDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPostsPageDataQuery,
    GetPostsPageDataQueryVariables
  >(GetPostsPageDataDocument, baseOptions)
}
export type GetPostsPageDataQueryHookResult = ReturnType<
  typeof useGetPostsPageDataQuery
>
export type GetPostsPageDataLazyQueryHookResult = ReturnType<
  typeof useGetPostsPageDataLazyQuery
>
export type GetPostsPageDataQueryResult = ApolloReactCommon.QueryResult<
  GetPostsPageDataQuery,
  GetPostsPageDataQueryVariables
>
export const LoveCommentDocument = gql`
  mutation LoveComment($input: IdInput!) {
    loveComment(input: $input) {
      ... on LoveCommentSuccess {
        comment {
          ...CommentLoveButton_comment
        }
        post {
          ...CommentLoveButton_post
        }
      }
    }
  }
  ${CommentLoveButton_CommentFragmentDoc}
  ${CommentLoveButton_PostFragmentDoc}
`
export type LoveCommentMutationFn = ApolloReactCommon.MutationFunction<
  LoveCommentMutation,
  LoveCommentMutationVariables
>

/**
 * __useLoveCommentMutation__
 *
 * To run a mutation, you first call `useLoveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loveCommentMutation, { data, loading, error }] = useLoveCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoveCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoveCommentMutation,
    LoveCommentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LoveCommentMutation,
    LoveCommentMutationVariables
  >(LoveCommentDocument, baseOptions)
}
export type LoveCommentMutationHookResult = ReturnType<
  typeof useLoveCommentMutation
>
export type LoveCommentMutationResult = ApolloReactCommon.MutationResult<
  LoveCommentMutation
>
export type LoveCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoveCommentMutation,
  LoveCommentMutationVariables
>
export const UnloveCommentDocument = gql`
  mutation UnloveComment($input: IdInput!) {
    unloveComment(input: $input) {
      ... on UnloveCommentSuccess {
        comment {
          ...CommentLoveButton_comment
        }
        post {
          ...CommentLoveButton_post
        }
      }
    }
  }
  ${CommentLoveButton_CommentFragmentDoc}
  ${CommentLoveButton_PostFragmentDoc}
`
export type UnloveCommentMutationFn = ApolloReactCommon.MutationFunction<
  UnloveCommentMutation,
  UnloveCommentMutationVariables
>

/**
 * __useUnloveCommentMutation__
 *
 * To run a mutation, you first call `useUnloveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnloveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unloveCommentMutation, { data, loading, error }] = useUnloveCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnloveCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UnloveCommentMutation,
    UnloveCommentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UnloveCommentMutation,
    UnloveCommentMutationVariables
  >(UnloveCommentDocument, baseOptions)
}
export type UnloveCommentMutationHookResult = ReturnType<
  typeof useUnloveCommentMutation
>
export type UnloveCommentMutationResult = ApolloReactCommon.MutationResult<
  UnloveCommentMutation
>
export type UnloveCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UnloveCommentMutation,
  UnloveCommentMutationVariables
>
export const PostBookmarkButton_GetFavoritedIdsDocument = gql`
  query PostBookmarkButton_GetFavoritedIds {
    favoritedIds @client
  }
`

/**
 * __usePostBookmarkButton_GetFavoritedIdsQuery__
 *
 * To run a query within a React component, call `usePostBookmarkButton_GetFavoritedIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostBookmarkButton_GetFavoritedIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostBookmarkButton_GetFavoritedIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostBookmarkButton_GetFavoritedIdsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PostBookmarkButton_GetFavoritedIdsQuery,
    PostBookmarkButton_GetFavoritedIdsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PostBookmarkButton_GetFavoritedIdsQuery,
    PostBookmarkButton_GetFavoritedIdsQueryVariables
  >(PostBookmarkButton_GetFavoritedIdsDocument, baseOptions)
}
export function usePostBookmarkButton_GetFavoritedIdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PostBookmarkButton_GetFavoritedIdsQuery,
    PostBookmarkButton_GetFavoritedIdsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PostBookmarkButton_GetFavoritedIdsQuery,
    PostBookmarkButton_GetFavoritedIdsQueryVariables
  >(PostBookmarkButton_GetFavoritedIdsDocument, baseOptions)
}
export type PostBookmarkButton_GetFavoritedIdsQueryHookResult = ReturnType<
  typeof usePostBookmarkButton_GetFavoritedIdsQuery
>
export type PostBookmarkButton_GetFavoritedIdsLazyQueryHookResult = ReturnType<
  typeof usePostBookmarkButton_GetFavoritedIdsLazyQuery
>
export type PostBookmarkButton_GetFavoritedIdsQueryResult = ApolloReactCommon.QueryResult<
  PostBookmarkButton_GetFavoritedIdsQuery,
  PostBookmarkButton_GetFavoritedIdsQueryVariables
>
export const LovePostDocument = gql`
  mutation LovePost($input: IdInput!) {
    lovePost(input: $input) {
      ... on LovePostSuccess {
        post {
          ...PostLoveButton_post
        }
        me {
          ...PostLoveButton_me
        }
      }
    }
  }
  ${PostLoveButton_PostFragmentDoc}
  ${PostLoveButton_MeFragmentDoc}
`
export type LovePostMutationFn = ApolloReactCommon.MutationFunction<
  LovePostMutation,
  LovePostMutationVariables
>

/**
 * __useLovePostMutation__
 *
 * To run a mutation, you first call `useLovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lovePostMutation, { data, loading, error }] = useLovePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLovePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LovePostMutation,
    LovePostMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LovePostMutation,
    LovePostMutationVariables
  >(LovePostDocument, baseOptions)
}
export type LovePostMutationHookResult = ReturnType<typeof useLovePostMutation>
export type LovePostMutationResult = ApolloReactCommon.MutationResult<
  LovePostMutation
>
export type LovePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LovePostMutation,
  LovePostMutationVariables
>
export const UnlovePostDocument = gql`
  mutation UnlovePost($input: IdInput!) {
    unlovePost(input: $input) {
      ... on UnlovePostSuccess {
        post {
          ...PostLoveButton_post
        }
        me {
          ...PostLoveButton_me
        }
      }
    }
  }
  ${PostLoveButton_PostFragmentDoc}
  ${PostLoveButton_MeFragmentDoc}
`
export type UnlovePostMutationFn = ApolloReactCommon.MutationFunction<
  UnlovePostMutation,
  UnlovePostMutationVariables
>

/**
 * __useUnlovePostMutation__
 *
 * To run a mutation, you first call `useUnlovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlovePostMutation, { data, loading, error }] = useUnlovePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnlovePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UnlovePostMutation,
    UnlovePostMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UnlovePostMutation,
    UnlovePostMutationVariables
  >(UnlovePostDocument, baseOptions)
}
export type UnlovePostMutationHookResult = ReturnType<
  typeof useUnlovePostMutation
>
export type UnlovePostMutationResult = ApolloReactCommon.MutationResult<
  UnlovePostMutation
>
export type UnlovePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UnlovePostMutation,
  UnlovePostMutationVariables
>
export const TeamWidgetDataDocument = gql`
  query TeamWidgetData {
    featuredEvent {
      ...GameWidget_event
    }
  }
  ${GameWidget_EventFragmentDoc}
`

/**
 * __useTeamWidgetDataQuery__
 *
 * To run a query within a React component, call `useTeamWidgetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamWidgetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamWidgetDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamWidgetDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TeamWidgetDataQuery,
    TeamWidgetDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    TeamWidgetDataQuery,
    TeamWidgetDataQueryVariables
  >(TeamWidgetDataDocument, baseOptions)
}
export function useTeamWidgetDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TeamWidgetDataQuery,
    TeamWidgetDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    TeamWidgetDataQuery,
    TeamWidgetDataQueryVariables
  >(TeamWidgetDataDocument, baseOptions)
}
export type TeamWidgetDataQueryHookResult = ReturnType<
  typeof useTeamWidgetDataQuery
>
export type TeamWidgetDataLazyQueryHookResult = ReturnType<
  typeof useTeamWidgetDataLazyQuery
>
export type TeamWidgetDataQueryResult = ApolloReactCommon.QueryResult<
  TeamWidgetDataQuery,
  TeamWidgetDataQueryVariables
>
export const GlobalIsLoggedInDocument = gql`
  query GlobalIsLoggedIn {
    isLoggedIn @client
  }
`

/**
 * __useGlobalIsLoggedInQuery__
 *
 * To run a query within a React component, call `useGlobalIsLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalIsLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalIsLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalIsLoggedInQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GlobalIsLoggedInQuery,
    GlobalIsLoggedInQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GlobalIsLoggedInQuery,
    GlobalIsLoggedInQueryVariables
  >(GlobalIsLoggedInDocument, baseOptions)
}
export function useGlobalIsLoggedInLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GlobalIsLoggedInQuery,
    GlobalIsLoggedInQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GlobalIsLoggedInQuery,
    GlobalIsLoggedInQueryVariables
  >(GlobalIsLoggedInDocument, baseOptions)
}
export type GlobalIsLoggedInQueryHookResult = ReturnType<
  typeof useGlobalIsLoggedInQuery
>
export type GlobalIsLoggedInLazyQueryHookResult = ReturnType<
  typeof useGlobalIsLoggedInLazyQuery
>
export type GlobalIsLoggedInQueryResult = ApolloReactCommon.QueryResult<
  GlobalIsLoggedInQuery,
  GlobalIsLoggedInQueryVariables
>
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ... on LoginSuccess {
        token
      }
      ... on LoginFailure {
        message
      }
    }
  }
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const GetMeDataDocument = gql`
  query GetMeData {
    me {
      ... on Me {
        id
      }
    }
  }
`

/**
 * __useGetMeDataQuery__
 *
 * To run a query within a React component, call `useGetMeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMeDataQuery,
    GetMeDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetMeDataQuery, GetMeDataQueryVariables>(
    GetMeDataDocument,
    baseOptions
  )
}
export function useGetMeDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMeDataQuery,
    GetMeDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetMeDataQuery, GetMeDataQueryVariables>(
    GetMeDataDocument,
    baseOptions
  )
}
export type GetMeDataQueryHookResult = ReturnType<typeof useGetMeDataQuery>
export type GetMeDataLazyQueryHookResult = ReturnType<
  typeof useGetMeDataLazyQuery
>
export type GetMeDataQueryResult = ApolloReactCommon.QueryResult<
  GetMeDataQuery,
  GetMeDataQueryVariables
>

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'MutationResponse',
        possibleTypes: [
          {
            name: 'LoginFailure',
          },
          {
            name: 'LoginSuccess',
          },
          {
            name: 'LovePostSuccess',
          },
          {
            name: 'UnlovePostSuccess',
          },
          {
            name: 'LoveCommentSuccess',
          },
          {
            name: 'UnloveCommentSuccess',
          },
          {
            name: 'AddCommentSuccess',
          },
          {
            name: 'EditCommentSuccess',
          },
          {
            name: 'JoinEventSuccess',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'BaseUser',
        possibleTypes: [
          {
            name: 'User',
          },
          {
            name: 'Me',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'MeResponse',
        possibleTypes: [
          {
            name: 'Me',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'LoginResponse',
        possibleTypes: [
          {
            name: 'LoginFailure',
          },
          {
            name: 'LoginSuccess',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'LovePostResponse',
        possibleTypes: [
          {
            name: 'LovePostSuccess',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'UnlovePostResponse',
        possibleTypes: [
          {
            name: 'UnlovePostSuccess',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'LoveCommentResponse',
        possibleTypes: [
          {
            name: 'LoveCommentSuccess',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'UnloveCommentResponse',
        possibleTypes: [
          {
            name: 'UnloveCommentSuccess',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'AddCommentResponse',
        possibleTypes: [
          {
            name: 'AddCommentSuccess',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'EditCommentResponse',
        possibleTypes: [
          {
            name: 'EditCommentSuccess',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'JoinEventResponse',
        possibleTypes: [
          {
            name: 'JoinEventSuccess',
          },
          {
            name: 'UnauthorizedResponse',
          },
        ],
      },
    ],
  },
}
export default result
