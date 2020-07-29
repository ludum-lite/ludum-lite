import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};


export type Query = {
   __typename: 'Query';
  me: MeResponse;
  post: Post;
  searchPosts: SearchPostResponse;
  user: User;
  featuredEvent: Event;
};


export type QueryPostArgs = {
  input: IdInput;
};


export type QuerySearchPostsArgs = {
  filters: SearchPostsFiltersInput;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryUserArgs = {
  input: IdInput;
};

export type Mutation = {
   __typename: 'Mutation';
  login: LoginResponse;
  lovePost: LovePostResponse;
  unlovePost: UnlovePostResponse;
  editPost: EditPostResponse;
  createPost: CreatePostResponse;
  publishPost: PublishPostResponse;
  loveComment: LoveCommentResponse;
  unloveComment: UnloveCommentResponse;
  addComment: AddCommentResponse;
  editComment: EditCommentResponse;
  joinEvent: JoinEventResponse;
  editGame: EditGameResponse;
  addFriend: AddFriendResponse;
  addFriendAndAddToGame: AddFriendAndAddToGameResponse;
  addUserToGame: AddUserToGameResponse;
  removeUserFromGame: RemoveUserFromGameResponse;
  uploadImage: UploadImageResponse;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLovePostArgs = {
  input: IdInput;
};


export type MutationUnlovePostArgs = {
  input: IdInput;
};


export type MutationEditPostArgs = {
  input: EditPostInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationPublishPostArgs = {
  input: IdInput;
};


export type MutationLoveCommentArgs = {
  input: IdInput;
};


export type MutationUnloveCommentArgs = {
  input: IdInput;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationEditCommentArgs = {
  input: EditCommentInput;
};


export type MutationEditGameArgs = {
  input: EditGameInput;
};


export type MutationAddFriendArgs = {
  input: IdInput;
};


export type MutationAddFriendAndAddToGameArgs = {
  input: IdInput;
};


export type MutationAddUserToGameArgs = {
  input: AddUserToGameInput;
};


export type MutationRemoveUserFromGameArgs = {
  input: RemoveUserFromGameInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
};

export type MutationResponse = {
  success: Scalars['Boolean'];
};

export type UnauthorizedResponse = {
   __typename: 'UnauthorizedResponse';
  code: Scalars['String'];
};

export type IdInput = {
  id: Scalars['Int'];
};

export type UploadImageSuccess = MutationResponse & {
   __typename: 'UploadImageSuccess';
  success: Scalars['Boolean'];
  name: Scalars['String'];
  path: Scalars['String'];
};

export type UploadImageFailure = MutationResponse & {
   __typename: 'UploadImageFailure';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type UploadImageResponse = UploadImageSuccess | UploadImageFailure;

export type BaseUser = {
  avatarPath?: Maybe<Scalars['String']>;
  createdDate: Scalars['String'];
  id: Scalars['Int'];
  modifiedDate: Scalars['String'];
  name: Scalars['String'];
  numGames: Scalars['Int'];
  numPosts: Scalars['Int'];
  profilePath: Scalars['String'];
  type: Scalars['String'];
};

export type User = BaseUser & {
   __typename: 'User';
  avatarPath?: Maybe<Scalars['String']>;
  createdDate: Scalars['String'];
  id: Scalars['Int'];
  modifiedDate: Scalars['String'];
  name: Scalars['String'];
  numGames: Scalars['Int'];
  numPosts: Scalars['Int'];
  profilePath: Scalars['String'];
  type: Scalars['String'];
};

export type Me = BaseUser & {
   __typename: 'Me';
  avatarPath?: Maybe<Scalars['String']>;
  createdDate: Scalars['String'];
  id: Scalars['Int'];
  modifiedDate: Scalars['String'];
  name: Scalars['String'];
  numGames: Scalars['Int'];
  numPosts: Scalars['Int'];
  profilePath: Scalars['String'];
  type: Scalars['String'];
  lovedPosts?: Maybe<Array<Scalars['Int']>>;
  userIdsImFollowing?: Maybe<Array<Scalars['Int']>>;
  usersImFollowing?: Maybe<Array<User>>;
  userIdsFollowingMe?: Maybe<Array<Scalars['Int']>>;
  usersFollowingMe?: Maybe<Array<User>>;
};

export type MeResponse = Me | UnauthorizedResponse;

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginFailure = MutationResponse & {
   __typename: 'LoginFailure';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type LoginSuccess = MutationResponse & {
   __typename: 'LoginSuccess';
  success: Scalars['Boolean'];
  token: Scalars['String'];
};

export type LoginResponse = LoginFailure | LoginSuccess;

export type AddFriendSuccess = MutationResponse & {
   __typename: 'AddFriendSuccess';
  success: Scalars['Boolean'];
  userId: Scalars['Int'];
  user?: Maybe<User>;
};

export type AddFriendResponse = AddFriendSuccess | UnauthorizedResponse;

export type AddFriendAndAddToGameSuccess = MutationResponse & {
   __typename: 'AddFriendAndAddToGameSuccess';
  success: Scalars['Boolean'];
  userId: Scalars['Int'];
  user?: Maybe<User>;
  gameId: Scalars['Int'];
  game?: Maybe<Game>;
};

export type AddFriendAndAddToGameResponse = AddFriendAndAddToGameSuccess | UnauthorizedResponse;

export enum PostType {
  All = 'All',
  News = 'News',
  Favorites = 'Favorites'
}

export type Post = {
   __typename: 'Post';
  author?: Maybe<User>;
  authorId: Scalars['Int'];
  body: Scalars['String'];
  createdDate?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastLoveChangedDate?: Maybe<Scalars['String']>;
  lastNotesChangedDate?: Maybe<Scalars['String']>;
  modifiedDate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  numLove: Scalars['Int'];
  numNotes: Scalars['Int'];
  parentId: Scalars['Int'];
  parentIds: Array<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  subsubtype?: Maybe<Scalars['String']>;
  subtype?: Maybe<Scalars['String']>;
  superparentId: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  myCommentLove?: Maybe<Array<Scalars['Int']>>;
};

export type LovePostSuccess = MutationResponse & {
   __typename: 'LovePostSuccess';
  success: Scalars['Boolean'];
  post: Post;
  me?: Maybe<MeResponse>;
};

export type LovePostResponse = LovePostSuccess | UnauthorizedResponse;

export type UnlovePostSuccess = MutationResponse & {
   __typename: 'UnlovePostSuccess';
  success: Scalars['Boolean'];
  post: Post;
  me?: Maybe<MeResponse>;
};

export type UnlovePostResponse = UnlovePostSuccess | UnauthorizedResponse;

export type SearchPostResponse = {
   __typename: 'SearchPostResponse';
  limit: Scalars['Int'];
  page: Scalars['Int'];
  posts: Array<Post>;
};

export type SearchPostsFiltersInput = {
  postType: PostType;
  favoritedIds?: Maybe<Array<Scalars['Int']>>;
};

export type EditPostInput = {
  id: Scalars['Int'];
  title: Scalars['String'];
  body: Scalars['String'];
};

export type EditPostSuccess = MutationResponse & {
   __typename: 'EditPostSuccess';
  success: Scalars['Boolean'];
  post: Post;
};

export type EditPostFieldErrorFields = {
   __typename: 'EditPostFieldErrorFields';
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type EditPostFieldError = MutationResponse & {
   __typename: 'EditPostFieldError';
  success: Scalars['Boolean'];
  fields?: Maybe<EditPostFieldErrorFields>;
};

export type EditPostResponse = EditPostSuccess | EditPostFieldError | UnauthorizedResponse;

export type CreatePostInput = {
  gameId: Scalars['Int'];
};

export type CreatePostSuccess = MutationResponse & {
   __typename: 'CreatePostSuccess';
  success: Scalars['Boolean'];
  post: Post;
};

export type CreatePostResponse = CreatePostSuccess | UnauthorizedResponse;

export type PublishPostSuccess = MutationResponse & {
   __typename: 'PublishPostSuccess';
  success: Scalars['Boolean'];
  post: Post;
};

export type PublishPostNameTooShort = MutationResponse & {
   __typename: 'PublishPostNameTooShort';
  success: Scalars['Boolean'];
};

export type PublishPostResponse = PublishPostSuccess | PublishPostNameTooShort | UnauthorizedResponse;

export type Comment = {
   __typename: 'Comment';
  id: Scalars['Int'];
  authorId: Scalars['Int'];
  author?: Maybe<User>;
  createdDate: Scalars['String'];
  modifiedDate?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  postId: Scalars['Int'];
  currentUserHasLoved: Scalars['Boolean'];
  body: Scalars['String'];
  numLove: Scalars['Int'];
};

export type LoveCommentSuccess = MutationResponse & {
   __typename: 'LoveCommentSuccess';
  success: Scalars['Boolean'];
  comment: Comment;
  post?: Maybe<Post>;
};

export type LoveCommentResponse = LoveCommentSuccess | UnauthorizedResponse;

export type UnloveCommentSuccess = MutationResponse & {
   __typename: 'UnloveCommentSuccess';
  success: Scalars['Boolean'];
  comment: Comment;
  post?: Maybe<Post>;
};

export type UnloveCommentResponse = UnloveCommentSuccess | UnauthorizedResponse;

export type AddCommentInput = {
  postId: Scalars['Int'];
  body: Scalars['String'];
};

export type AddCommentSuccess = MutationResponse & {
   __typename: 'AddCommentSuccess';
  success: Scalars['Boolean'];
  comment: Comment;
};

export type AddCommentResponse = AddCommentSuccess | UnauthorizedResponse;

export type EditCommentInput = {
  id: Scalars['Int'];
  postId: Scalars['Int'];
  body: Scalars['String'];
};

export type EditCommentSuccess = MutationResponse & {
   __typename: 'EditCommentSuccess';
  success: Scalars['Boolean'];
  comment: Comment;
};

export type EditCommentResponse = EditCommentSuccess | UnauthorizedResponse;

export type Event = {
   __typename: 'Event';
  id: Scalars['Int'];
  name: Scalars['String'];
  body: Scalars['String'];
  slug: Scalars['String'];
  createdDate: Scalars['String'];
  currentUserGameId?: Maybe<Scalars['Int']>;
  currentUserGame?: Maybe<Game>;
  eventPhase: EventPhase;
};

export enum EventPhase {
  ThemeSelection = 1,
  ThemeSlaughter = 2,
  ThemeVoting = 4,
  EventRunning = 5,
  GameVoting = 6,
  Results = 7
}

export type JoinEventSuccess = MutationResponse & {
   __typename: 'JoinEventSuccess';
  success: Scalars['Boolean'];
  featuredEvent?: Maybe<Event>;
  gameId: Scalars['Int'];
};

export type JoinEventResponse = JoinEventSuccess | UnauthorizedResponse;

export type Game = {
   __typename: 'Game';
  id: Scalars['Int'];
  name: Scalars['String'];
  body: Scalars['String'];
  authorId: Scalars['Int'];
  author?: Maybe<User>;
  teamUserIds: Array<Scalars['Int']>;
  teamUsers?: Maybe<Array<User>>;
  createdDate: Scalars['String'];
  modifiedDate?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  numLove: Scalars['Int'];
  numNotes: Scalars['Int'];
  eventId: Scalars['Int'];
  slug?: Maybe<Scalars['String']>;
};

export type EditGameInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type EditGameSuccess = MutationResponse & {
   __typename: 'EditGameSuccess';
  success: Scalars['Boolean'];
  gameId: Scalars['Int'];
  game?: Maybe<Game>;
};

export type EditGameResponse = EditGameSuccess | UnauthorizedResponse;

export type AddUserToGameInput = {
  gameId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type AddUserToGameSuccess = MutationResponse & {
   __typename: 'AddUserToGameSuccess';
  success: Scalars['Boolean'];
  gameId: Scalars['Int'];
  game?: Maybe<Game>;
  userId: Scalars['Int'];
  user?: Maybe<User>;
};

export type AddUserToGameResponse = AddUserToGameSuccess | UnauthorizedResponse;

export type RemoveUserFromGameInput = {
  gameId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type RemoveUserFromGameSuccess = MutationResponse & {
   __typename: 'RemoveUserFromGameSuccess';
  success: Scalars['Boolean'];
  gameId: Scalars['Int'];
  game?: Maybe<Game>;
  userId: Scalars['Int'];
  user?: Maybe<User>;
};

export type RemoveUserFromGameResponse = RemoveUserFromGameSuccess | UnauthorizedResponse;

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  MutationResponse: ResolversTypes['UploadImageSuccess'] | ResolversTypes['UploadImageFailure'] | ResolversTypes['LoginFailure'] | ResolversTypes['LoginSuccess'] | ResolversTypes['AddFriendSuccess'] | ResolversTypes['AddFriendAndAddToGameSuccess'] | ResolversTypes['LovePostSuccess'] | ResolversTypes['UnlovePostSuccess'] | ResolversTypes['EditPostSuccess'] | ResolversTypes['EditPostFieldError'] | ResolversTypes['CreatePostSuccess'] | ResolversTypes['PublishPostSuccess'] | ResolversTypes['PublishPostNameTooShort'] | ResolversTypes['LoveCommentSuccess'] | ResolversTypes['UnloveCommentSuccess'] | ResolversTypes['AddCommentSuccess'] | ResolversTypes['EditCommentSuccess'] | ResolversTypes['JoinEventSuccess'] | ResolversTypes['EditGameSuccess'] | ResolversTypes['AddUserToGameSuccess'] | ResolversTypes['RemoveUserFromGameSuccess'],
  UnauthorizedResponse: ResolverTypeWrapper<UnauthorizedResponse>,
  IdInput: IdInput,
  UploadImageSuccess: ResolverTypeWrapper<UploadImageSuccess>,
  UploadImageFailure: ResolverTypeWrapper<UploadImageFailure>,
  UploadImageResponse: ResolversTypes['UploadImageSuccess'] | ResolversTypes['UploadImageFailure'],
  BaseUser: ResolversTypes['User'] | ResolversTypes['Me'],
  User: ResolverTypeWrapper<User>,
  Me: ResolverTypeWrapper<Me>,
  MeResponse: ResolversTypes['Me'] | ResolversTypes['UnauthorizedResponse'],
  LoginInput: LoginInput,
  LoginFailure: ResolverTypeWrapper<LoginFailure>,
  LoginSuccess: ResolverTypeWrapper<LoginSuccess>,
  LoginResponse: ResolversTypes['LoginFailure'] | ResolversTypes['LoginSuccess'],
  AddFriendSuccess: ResolverTypeWrapper<AddFriendSuccess>,
  AddFriendResponse: ResolversTypes['AddFriendSuccess'] | ResolversTypes['UnauthorizedResponse'],
  AddFriendAndAddToGameSuccess: ResolverTypeWrapper<AddFriendAndAddToGameSuccess>,
  AddFriendAndAddToGameResponse: ResolversTypes['AddFriendAndAddToGameSuccess'] | ResolversTypes['UnauthorizedResponse'],
  PostType: PostType,
  Post: ResolverTypeWrapper<Post>,
  LovePostSuccess: ResolverTypeWrapper<Omit<LovePostSuccess, 'me'> & { me?: Maybe<ResolversTypes['MeResponse']> }>,
  LovePostResponse: ResolversTypes['LovePostSuccess'] | ResolversTypes['UnauthorizedResponse'],
  UnlovePostSuccess: ResolverTypeWrapper<Omit<UnlovePostSuccess, 'me'> & { me?: Maybe<ResolversTypes['MeResponse']> }>,
  UnlovePostResponse: ResolversTypes['UnlovePostSuccess'] | ResolversTypes['UnauthorizedResponse'],
  SearchPostResponse: ResolverTypeWrapper<SearchPostResponse>,
  SearchPostsFiltersInput: SearchPostsFiltersInput,
  EditPostInput: EditPostInput,
  EditPostSuccess: ResolverTypeWrapper<EditPostSuccess>,
  EditPostFieldErrorFields: ResolverTypeWrapper<EditPostFieldErrorFields>,
  EditPostFieldError: ResolverTypeWrapper<EditPostFieldError>,
  EditPostResponse: ResolversTypes['EditPostSuccess'] | ResolversTypes['EditPostFieldError'] | ResolversTypes['UnauthorizedResponse'],
  CreatePostInput: CreatePostInput,
  CreatePostSuccess: ResolverTypeWrapper<CreatePostSuccess>,
  CreatePostResponse: ResolversTypes['CreatePostSuccess'] | ResolversTypes['UnauthorizedResponse'],
  PublishPostSuccess: ResolverTypeWrapper<PublishPostSuccess>,
  PublishPostNameTooShort: ResolverTypeWrapper<PublishPostNameTooShort>,
  PublishPostResponse: ResolversTypes['PublishPostSuccess'] | ResolversTypes['PublishPostNameTooShort'] | ResolversTypes['UnauthorizedResponse'],
  Comment: ResolverTypeWrapper<Comment>,
  LoveCommentSuccess: ResolverTypeWrapper<LoveCommentSuccess>,
  LoveCommentResponse: ResolversTypes['LoveCommentSuccess'] | ResolversTypes['UnauthorizedResponse'],
  UnloveCommentSuccess: ResolverTypeWrapper<UnloveCommentSuccess>,
  UnloveCommentResponse: ResolversTypes['UnloveCommentSuccess'] | ResolversTypes['UnauthorizedResponse'],
  AddCommentInput: AddCommentInput,
  AddCommentSuccess: ResolverTypeWrapper<AddCommentSuccess>,
  AddCommentResponse: ResolversTypes['AddCommentSuccess'] | ResolversTypes['UnauthorizedResponse'],
  EditCommentInput: EditCommentInput,
  EditCommentSuccess: ResolverTypeWrapper<EditCommentSuccess>,
  EditCommentResponse: ResolversTypes['EditCommentSuccess'] | ResolversTypes['UnauthorizedResponse'],
  Event: ResolverTypeWrapper<Event>,
  EventPhase: EventPhase,
  JoinEventSuccess: ResolverTypeWrapper<JoinEventSuccess>,
  JoinEventResponse: ResolversTypes['JoinEventSuccess'] | ResolversTypes['UnauthorizedResponse'],
  Game: ResolverTypeWrapper<Game>,
  EditGameInput: EditGameInput,
  EditGameSuccess: ResolverTypeWrapper<EditGameSuccess>,
  EditGameResponse: ResolversTypes['EditGameSuccess'] | ResolversTypes['UnauthorizedResponse'],
  AddUserToGameInput: AddUserToGameInput,
  AddUserToGameSuccess: ResolverTypeWrapper<AddUserToGameSuccess>,
  AddUserToGameResponse: ResolversTypes['AddUserToGameSuccess'] | ResolversTypes['UnauthorizedResponse'],
  RemoveUserFromGameInput: RemoveUserFromGameInput,
  RemoveUserFromGameSuccess: ResolverTypeWrapper<RemoveUserFromGameSuccess>,
  RemoveUserFromGameResponse: ResolversTypes['RemoveUserFromGameSuccess'] | ResolversTypes['UnauthorizedResponse'],
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Upload: Scalars['Upload'],
  Query: {},
  Int: Scalars['Int'],
  Mutation: {},
  MutationResponse: ResolversParentTypes['UploadImageSuccess'] | ResolversParentTypes['UploadImageFailure'] | ResolversParentTypes['LoginFailure'] | ResolversParentTypes['LoginSuccess'] | ResolversParentTypes['AddFriendSuccess'] | ResolversParentTypes['AddFriendAndAddToGameSuccess'] | ResolversParentTypes['LovePostSuccess'] | ResolversParentTypes['UnlovePostSuccess'] | ResolversParentTypes['EditPostSuccess'] | ResolversParentTypes['EditPostFieldError'] | ResolversParentTypes['CreatePostSuccess'] | ResolversParentTypes['PublishPostSuccess'] | ResolversParentTypes['PublishPostNameTooShort'] | ResolversParentTypes['LoveCommentSuccess'] | ResolversParentTypes['UnloveCommentSuccess'] | ResolversParentTypes['AddCommentSuccess'] | ResolversParentTypes['EditCommentSuccess'] | ResolversParentTypes['JoinEventSuccess'] | ResolversParentTypes['EditGameSuccess'] | ResolversParentTypes['AddUserToGameSuccess'] | ResolversParentTypes['RemoveUserFromGameSuccess'],
  UnauthorizedResponse: UnauthorizedResponse,
  IdInput: IdInput,
  UploadImageSuccess: UploadImageSuccess,
  UploadImageFailure: UploadImageFailure,
  UploadImageResponse: ResolversParentTypes['UploadImageSuccess'] | ResolversParentTypes['UploadImageFailure'],
  BaseUser: ResolversParentTypes['User'] | ResolversParentTypes['Me'],
  User: User,
  Me: Me,
  MeResponse: ResolversParentTypes['Me'] | ResolversParentTypes['UnauthorizedResponse'],
  LoginInput: LoginInput,
  LoginFailure: LoginFailure,
  LoginSuccess: LoginSuccess,
  LoginResponse: ResolversParentTypes['LoginFailure'] | ResolversParentTypes['LoginSuccess'],
  AddFriendSuccess: AddFriendSuccess,
  AddFriendResponse: ResolversParentTypes['AddFriendSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  AddFriendAndAddToGameSuccess: AddFriendAndAddToGameSuccess,
  AddFriendAndAddToGameResponse: ResolversParentTypes['AddFriendAndAddToGameSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  PostType: PostType,
  Post: Post,
  LovePostSuccess: Omit<LovePostSuccess, 'me'> & { me?: Maybe<ResolversParentTypes['MeResponse']> },
  LovePostResponse: ResolversParentTypes['LovePostSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  UnlovePostSuccess: Omit<UnlovePostSuccess, 'me'> & { me?: Maybe<ResolversParentTypes['MeResponse']> },
  UnlovePostResponse: ResolversParentTypes['UnlovePostSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  SearchPostResponse: SearchPostResponse,
  SearchPostsFiltersInput: SearchPostsFiltersInput,
  EditPostInput: EditPostInput,
  EditPostSuccess: EditPostSuccess,
  EditPostFieldErrorFields: EditPostFieldErrorFields,
  EditPostFieldError: EditPostFieldError,
  EditPostResponse: ResolversParentTypes['EditPostSuccess'] | ResolversParentTypes['EditPostFieldError'] | ResolversParentTypes['UnauthorizedResponse'],
  CreatePostInput: CreatePostInput,
  CreatePostSuccess: CreatePostSuccess,
  CreatePostResponse: ResolversParentTypes['CreatePostSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  PublishPostSuccess: PublishPostSuccess,
  PublishPostNameTooShort: PublishPostNameTooShort,
  PublishPostResponse: ResolversParentTypes['PublishPostSuccess'] | ResolversParentTypes['PublishPostNameTooShort'] | ResolversParentTypes['UnauthorizedResponse'],
  Comment: Comment,
  LoveCommentSuccess: LoveCommentSuccess,
  LoveCommentResponse: ResolversParentTypes['LoveCommentSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  UnloveCommentSuccess: UnloveCommentSuccess,
  UnloveCommentResponse: ResolversParentTypes['UnloveCommentSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  AddCommentInput: AddCommentInput,
  AddCommentSuccess: AddCommentSuccess,
  AddCommentResponse: ResolversParentTypes['AddCommentSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  EditCommentInput: EditCommentInput,
  EditCommentSuccess: EditCommentSuccess,
  EditCommentResponse: ResolversParentTypes['EditCommentSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  Event: Event,
  EventPhase: EventPhase,
  JoinEventSuccess: JoinEventSuccess,
  JoinEventResponse: ResolversParentTypes['JoinEventSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  Game: Game,
  EditGameInput: EditGameInput,
  EditGameSuccess: EditGameSuccess,
  EditGameResponse: ResolversParentTypes['EditGameSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  AddUserToGameInput: AddUserToGameInput,
  AddUserToGameSuccess: AddUserToGameSuccess,
  AddUserToGameResponse: ResolversParentTypes['AddUserToGameSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  RemoveUserFromGameInput: RemoveUserFromGameInput,
  RemoveUserFromGameSuccess: RemoveUserFromGameSuccess,
  RemoveUserFromGameResponse: ResolversParentTypes['RemoveUserFromGameSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<ResolversTypes['MeResponse'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryPostArgs, 'input'>>,
  searchPosts?: Resolver<ResolversTypes['SearchPostResponse'], ParentType, ContextType, RequireFields<QuerySearchPostsArgs, 'filters' | 'limit' | 'page'>>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>,
  featuredEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
  lovePost?: Resolver<ResolversTypes['LovePostResponse'], ParentType, ContextType, RequireFields<MutationLovePostArgs, 'input'>>,
  unlovePost?: Resolver<ResolversTypes['UnlovePostResponse'], ParentType, ContextType, RequireFields<MutationUnlovePostArgs, 'input'>>,
  editPost?: Resolver<ResolversTypes['EditPostResponse'], ParentType, ContextType, RequireFields<MutationEditPostArgs, 'input'>>,
  createPost?: Resolver<ResolversTypes['CreatePostResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>,
  publishPost?: Resolver<ResolversTypes['PublishPostResponse'], ParentType, ContextType, RequireFields<MutationPublishPostArgs, 'input'>>,
  loveComment?: Resolver<ResolversTypes['LoveCommentResponse'], ParentType, ContextType, RequireFields<MutationLoveCommentArgs, 'input'>>,
  unloveComment?: Resolver<ResolversTypes['UnloveCommentResponse'], ParentType, ContextType, RequireFields<MutationUnloveCommentArgs, 'input'>>,
  addComment?: Resolver<ResolversTypes['AddCommentResponse'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'input'>>,
  editComment?: Resolver<ResolversTypes['EditCommentResponse'], ParentType, ContextType, RequireFields<MutationEditCommentArgs, 'input'>>,
  joinEvent?: Resolver<ResolversTypes['JoinEventResponse'], ParentType, ContextType>,
  editGame?: Resolver<ResolversTypes['EditGameResponse'], ParentType, ContextType, RequireFields<MutationEditGameArgs, 'input'>>,
  addFriend?: Resolver<ResolversTypes['AddFriendResponse'], ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'input'>>,
  addFriendAndAddToGame?: Resolver<ResolversTypes['AddFriendAndAddToGameResponse'], ParentType, ContextType, RequireFields<MutationAddFriendAndAddToGameArgs, 'input'>>,
  addUserToGame?: Resolver<ResolversTypes['AddUserToGameResponse'], ParentType, ContextType, RequireFields<MutationAddUserToGameArgs, 'input'>>,
  removeUserFromGame?: Resolver<ResolversTypes['RemoveUserFromGameResponse'], ParentType, ContextType, RequireFields<MutationRemoveUserFromGameArgs, 'input'>>,
  uploadImage?: Resolver<ResolversTypes['UploadImageResponse'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'file'>>,
}>;

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'UploadImageSuccess' | 'UploadImageFailure' | 'LoginFailure' | 'LoginSuccess' | 'AddFriendSuccess' | 'AddFriendAndAddToGameSuccess' | 'LovePostSuccess' | 'UnlovePostSuccess' | 'EditPostSuccess' | 'EditPostFieldError' | 'CreatePostSuccess' | 'PublishPostSuccess' | 'PublishPostNameTooShort' | 'LoveCommentSuccess' | 'UnloveCommentSuccess' | 'AddCommentSuccess' | 'EditCommentSuccess' | 'JoinEventSuccess' | 'EditGameSuccess' | 'AddUserToGameSuccess' | 'RemoveUserFromGameSuccess', ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type UnauthorizedResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnauthorizedResponse'] = ResolversParentTypes['UnauthorizedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UploadImageSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadImageSuccess'] = ResolversParentTypes['UploadImageSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UploadImageFailureResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadImageFailure'] = ResolversParentTypes['UploadImageFailure']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UploadImageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadImageResponse'] = ResolversParentTypes['UploadImageResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'UploadImageSuccess' | 'UploadImageFailure', ParentType, ContextType>
}>;

export type BaseUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseUser'] = ResolversParentTypes['BaseUser']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'Me', ParentType, ContextType>,
  avatarPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  modifiedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  numGames?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  numPosts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  profilePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatarPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  modifiedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  numGames?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  numPosts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  profilePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = ResolversObject<{
  avatarPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  modifiedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  numGames?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  numPosts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  profilePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lovedPosts?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>,
  userIdsImFollowing?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>,
  usersImFollowing?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>,
  userIdsFollowingMe?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>,
  usersFollowingMe?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeResponse'] = ResolversParentTypes['MeResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Me' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type LoginFailureResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginFailure'] = ResolversParentTypes['LoginFailure']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LoginSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginSuccess'] = ResolversParentTypes['LoginSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LoginFailure' | 'LoginSuccess', ParentType, ContextType>
}>;

export type AddFriendSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddFriendSuccess'] = ResolversParentTypes['AddFriendSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type AddFriendResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddFriendResponse'] = ResolversParentTypes['AddFriendResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AddFriendSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type AddFriendAndAddToGameSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddFriendAndAddToGameSuccess'] = ResolversParentTypes['AddFriendAndAddToGameSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  gameId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type AddFriendAndAddToGameResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddFriendAndAddToGameResponse'] = ResolversParentTypes['AddFriendAndAddToGameResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AddFriendAndAddToGameSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  lastLoveChangedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastNotesChangedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  modifiedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  numLove?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  numNotes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  parentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  parentIds?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>,
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  publishedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  subsubtype?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  subtype?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  superparentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>,
  myCommentLove?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LovePostSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['LovePostSuccess'] = ResolversParentTypes['LovePostSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['MeResponse']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LovePostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LovePostResponse'] = ResolversParentTypes['LovePostResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LovePostSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type UnlovePostSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlovePostSuccess'] = ResolversParentTypes['UnlovePostSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['MeResponse']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UnlovePostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlovePostResponse'] = ResolversParentTypes['UnlovePostResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'UnlovePostSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type SearchPostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchPostResponse'] = ResolversParentTypes['SearchPostResponse']> = ResolversObject<{
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EditPostSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditPostSuccess'] = ResolversParentTypes['EditPostSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EditPostFieldErrorFieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditPostFieldErrorFields'] = ResolversParentTypes['EditPostFieldErrorFields']> = ResolversObject<{
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EditPostFieldErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditPostFieldError'] = ResolversParentTypes['EditPostFieldError']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  fields?: Resolver<Maybe<ResolversTypes['EditPostFieldErrorFields']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EditPostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditPostResponse'] = ResolversParentTypes['EditPostResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'EditPostSuccess' | 'EditPostFieldError' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type CreatePostSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostSuccess'] = ResolversParentTypes['CreatePostSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CreatePostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostResponse'] = ResolversParentTypes['CreatePostResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CreatePostSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type PublishPostSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishPostSuccess'] = ResolversParentTypes['PublishPostSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PublishPostNameTooShortResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishPostNameTooShort'] = ResolversParentTypes['PublishPostNameTooShort']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PublishPostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishPostResponse'] = ResolversParentTypes['PublishPostResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PublishPostSuccess' | 'PublishPostNameTooShort' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  modifiedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  currentUserHasLoved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  numLove?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LoveCommentSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoveCommentSuccess'] = ResolversParentTypes['LoveCommentSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LoveCommentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoveCommentResponse'] = ResolversParentTypes['LoveCommentResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LoveCommentSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type UnloveCommentSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnloveCommentSuccess'] = ResolversParentTypes['UnloveCommentSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UnloveCommentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnloveCommentResponse'] = ResolversParentTypes['UnloveCommentResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'UnloveCommentSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type AddCommentSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddCommentSuccess'] = ResolversParentTypes['AddCommentSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type AddCommentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddCommentResponse'] = ResolversParentTypes['AddCommentResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AddCommentSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type EditCommentSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditCommentSuccess'] = ResolversParentTypes['EditCommentSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EditCommentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditCommentResponse'] = ResolversParentTypes['EditCommentResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'EditCommentSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  currentUserGameId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  currentUserGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>,
  eventPhase?: Resolver<ResolversTypes['EventPhase'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type JoinEventSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinEventSuccess'] = ResolversParentTypes['JoinEventSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  featuredEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>,
  gameId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type JoinEventResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinEventResponse'] = ResolversParentTypes['JoinEventResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'JoinEventSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  teamUserIds?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>,
  teamUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  modifiedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  publishedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  numLove?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  numNotes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  eventId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EditGameSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditGameSuccess'] = ResolversParentTypes['EditGameSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  gameId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EditGameResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditGameResponse'] = ResolversParentTypes['EditGameResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'EditGameSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type AddUserToGameSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddUserToGameSuccess'] = ResolversParentTypes['AddUserToGameSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  gameId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type AddUserToGameResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddUserToGameResponse'] = ResolversParentTypes['AddUserToGameResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AddUserToGameSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type RemoveUserFromGameSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveUserFromGameSuccess'] = ResolversParentTypes['RemoveUserFromGameSuccess']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  gameId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type RemoveUserFromGameResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveUserFromGameResponse'] = ResolversParentTypes['RemoveUserFromGameResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'RemoveUserFromGameSuccess' | 'UnauthorizedResponse', ParentType, ContextType>
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Upload?: GraphQLScalarType,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  MutationResponse?: MutationResponseResolvers,
  UnauthorizedResponse?: UnauthorizedResponseResolvers<ContextType>,
  UploadImageSuccess?: UploadImageSuccessResolvers<ContextType>,
  UploadImageFailure?: UploadImageFailureResolvers<ContextType>,
  UploadImageResponse?: UploadImageResponseResolvers,
  BaseUser?: BaseUserResolvers,
  User?: UserResolvers<ContextType>,
  Me?: MeResolvers<ContextType>,
  MeResponse?: MeResponseResolvers,
  LoginFailure?: LoginFailureResolvers<ContextType>,
  LoginSuccess?: LoginSuccessResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers,
  AddFriendSuccess?: AddFriendSuccessResolvers<ContextType>,
  AddFriendResponse?: AddFriendResponseResolvers,
  AddFriendAndAddToGameSuccess?: AddFriendAndAddToGameSuccessResolvers<ContextType>,
  AddFriendAndAddToGameResponse?: AddFriendAndAddToGameResponseResolvers,
  Post?: PostResolvers<ContextType>,
  LovePostSuccess?: LovePostSuccessResolvers<ContextType>,
  LovePostResponse?: LovePostResponseResolvers,
  UnlovePostSuccess?: UnlovePostSuccessResolvers<ContextType>,
  UnlovePostResponse?: UnlovePostResponseResolvers,
  SearchPostResponse?: SearchPostResponseResolvers<ContextType>,
  EditPostSuccess?: EditPostSuccessResolvers<ContextType>,
  EditPostFieldErrorFields?: EditPostFieldErrorFieldsResolvers<ContextType>,
  EditPostFieldError?: EditPostFieldErrorResolvers<ContextType>,
  EditPostResponse?: EditPostResponseResolvers,
  CreatePostSuccess?: CreatePostSuccessResolvers<ContextType>,
  CreatePostResponse?: CreatePostResponseResolvers,
  PublishPostSuccess?: PublishPostSuccessResolvers<ContextType>,
  PublishPostNameTooShort?: PublishPostNameTooShortResolvers<ContextType>,
  PublishPostResponse?: PublishPostResponseResolvers,
  Comment?: CommentResolvers<ContextType>,
  LoveCommentSuccess?: LoveCommentSuccessResolvers<ContextType>,
  LoveCommentResponse?: LoveCommentResponseResolvers,
  UnloveCommentSuccess?: UnloveCommentSuccessResolvers<ContextType>,
  UnloveCommentResponse?: UnloveCommentResponseResolvers,
  AddCommentSuccess?: AddCommentSuccessResolvers<ContextType>,
  AddCommentResponse?: AddCommentResponseResolvers,
  EditCommentSuccess?: EditCommentSuccessResolvers<ContextType>,
  EditCommentResponse?: EditCommentResponseResolvers,
  Event?: EventResolvers<ContextType>,
  JoinEventSuccess?: JoinEventSuccessResolvers<ContextType>,
  JoinEventResponse?: JoinEventResponseResolvers,
  Game?: GameResolvers<ContextType>,
  EditGameSuccess?: EditGameSuccessResolvers<ContextType>,
  EditGameResponse?: EditGameResponseResolvers,
  AddUserToGameSuccess?: AddUserToGameSuccessResolvers<ContextType>,
  AddUserToGameResponse?: AddUserToGameResponseResolvers,
  RemoveUserFromGameSuccess?: RemoveUserFromGameSuccessResolvers<ContextType>,
  RemoveUserFromGameResponse?: RemoveUserFromGameResponseResolvers,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
