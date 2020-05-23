import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  me: MeResponse;
  post: Post;
  searchPosts: SearchPostResponse;
  user: User;
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
   __typename?: 'Mutation';
  login: LoginResponse;
  lovePost: LovePostResponse;
  unlovePost: UnlovePostResponse;
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

export type MutationResponse = {
  success: Scalars['Boolean'];
};

export type UnauthorizedResponse = {
   __typename?: 'UnauthorizedResponse';
  code: Scalars['String'];
};

export type MeResponse = Me | UnauthorizedResponse;

export type LovePostSuccess = MutationResponse & {
   __typename?: 'LovePostSuccess';
  success: Scalars['Boolean'];
  post: Post;
  me?: Maybe<MeResponse>;
};

export type LovePostResponse = LovePostSuccess | UnauthorizedResponse;

export type UnlovePostSuccess = MutationResponse & {
   __typename?: 'UnlovePostSuccess';
  success: Scalars['Boolean'];
  post: Post;
  me?: Maybe<MeResponse>;
};

export type UnlovePostResponse = UnlovePostSuccess | UnauthorizedResponse;

export type IdInput = {
  id: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SearchPostResponse = {
   __typename?: 'SearchPostResponse';
  limit: Scalars['Int'];
  page: Scalars['Int'];
  posts: Array<Post>;
};

export type SearchPostsFiltersInput = {
  postType: PostType;
  favoritedIds?: Maybe<Array<Scalars['Int']>>;
};

export type LoginFailure = MutationResponse & {
   __typename?: 'LoginFailure';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type LoginSuccess = MutationResponse & {
   __typename?: 'LoginSuccess';
  success: Scalars['Boolean'];
  token: Scalars['String'];
};

export type LoginResponse = LoginFailure | LoginSuccess;

export enum PostType {
  All = 'all',
  News = 'news',
  Favorites = 'favorites'
}

export type Post = {
   __typename?: 'Post';
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
  parentIds: Array<Maybe<Scalars['Int']>>;
  path?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  subsubtype?: Maybe<Scalars['String']>;
  subtype?: Maybe<Scalars['String']>;
  superparentId: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
};

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
   __typename?: 'User';
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
   __typename?: 'Me';
  avatarPath?: Maybe<Scalars['String']>;
  createdDate: Scalars['String'];
  id: Scalars['Int'];
  modifiedDate: Scalars['String'];
  name: Scalars['String'];
  numGames: Scalars['Int'];
  numPosts: Scalars['Int'];
  profilePath: Scalars['String'];
  type: Scalars['String'];
  lovedPosts: Array<Scalars['Int']>;
};

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
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  MutationResponse: ResolversTypes['LovePostSuccess'] | ResolversTypes['UnlovePostSuccess'] | ResolversTypes['LoginFailure'] | ResolversTypes['LoginSuccess'],
  UnauthorizedResponse: ResolverTypeWrapper<UnauthorizedResponse>,
  MeResponse: ResolversTypes['Me'] | ResolversTypes['UnauthorizedResponse'],
  LovePostSuccess: ResolverTypeWrapper<Omit<LovePostSuccess, 'me'> & { me?: Maybe<ResolversTypes['MeResponse']> }>,
  LovePostResponse: ResolversTypes['LovePostSuccess'] | ResolversTypes['UnauthorizedResponse'],
  UnlovePostSuccess: ResolverTypeWrapper<Omit<UnlovePostSuccess, 'me'> & { me?: Maybe<ResolversTypes['MeResponse']> }>,
  UnlovePostResponse: ResolversTypes['UnlovePostSuccess'] | ResolversTypes['UnauthorizedResponse'],
  IdInput: IdInput,
  LoginInput: LoginInput,
  SearchPostResponse: ResolverTypeWrapper<SearchPostResponse>,
  SearchPostsFiltersInput: SearchPostsFiltersInput,
  LoginFailure: ResolverTypeWrapper<LoginFailure>,
  LoginSuccess: ResolverTypeWrapper<LoginSuccess>,
  LoginResponse: ResolversTypes['LoginFailure'] | ResolversTypes['LoginSuccess'],
  PostType: PostType,
  Post: ResolverTypeWrapper<Post>,
  BaseUser: ResolversTypes['User'] | ResolversTypes['Me'],
  User: ResolverTypeWrapper<User>,
  Me: ResolverTypeWrapper<Me>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Query: {},
  Int: Scalars['Int'],
  Mutation: {},
  MutationResponse: ResolversParentTypes['LovePostSuccess'] | ResolversParentTypes['UnlovePostSuccess'] | ResolversParentTypes['LoginFailure'] | ResolversParentTypes['LoginSuccess'],
  UnauthorizedResponse: UnauthorizedResponse,
  MeResponse: ResolversParentTypes['Me'] | ResolversParentTypes['UnauthorizedResponse'],
  LovePostSuccess: Omit<LovePostSuccess, 'me'> & { me?: Maybe<ResolversParentTypes['MeResponse']> },
  LovePostResponse: ResolversParentTypes['LovePostSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  UnlovePostSuccess: Omit<UnlovePostSuccess, 'me'> & { me?: Maybe<ResolversParentTypes['MeResponse']> },
  UnlovePostResponse: ResolversParentTypes['UnlovePostSuccess'] | ResolversParentTypes['UnauthorizedResponse'],
  IdInput: IdInput,
  LoginInput: LoginInput,
  SearchPostResponse: SearchPostResponse,
  SearchPostsFiltersInput: SearchPostsFiltersInput,
  LoginFailure: LoginFailure,
  LoginSuccess: LoginSuccess,
  LoginResponse: ResolversParentTypes['LoginFailure'] | ResolversParentTypes['LoginSuccess'],
  PostType: PostType,
  Post: Post,
  BaseUser: ResolversParentTypes['User'] | ResolversParentTypes['Me'],
  User: User,
  Me: Me,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<ResolversTypes['MeResponse'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryPostArgs, 'input'>>,
  searchPosts?: Resolver<ResolversTypes['SearchPostResponse'], ParentType, ContextType, RequireFields<QuerySearchPostsArgs, 'filters' | 'limit' | 'page'>>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
  lovePost?: Resolver<ResolversTypes['LovePostResponse'], ParentType, ContextType, RequireFields<MutationLovePostArgs, 'input'>>,
  unlovePost?: Resolver<ResolversTypes['UnlovePostResponse'], ParentType, ContextType, RequireFields<MutationUnlovePostArgs, 'input'>>,
}>;

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LovePostSuccess' | 'UnlovePostSuccess' | 'LoginFailure' | 'LoginSuccess', ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type UnauthorizedResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnauthorizedResponse'] = ResolversParentTypes['UnauthorizedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeResponse'] = ResolversParentTypes['MeResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Me' | 'UnauthorizedResponse', ParentType, ContextType>
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
  parentIds?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>,
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  publishedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  subsubtype?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  subtype?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  superparentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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
  lovedPosts?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  MutationResponse?: MutationResponseResolvers,
  UnauthorizedResponse?: UnauthorizedResponseResolvers<ContextType>,
  MeResponse?: MeResponseResolvers,
  LovePostSuccess?: LovePostSuccessResolvers<ContextType>,
  LovePostResponse?: LovePostResponseResolvers,
  UnlovePostSuccess?: UnlovePostSuccessResolvers<ContextType>,
  UnlovePostResponse?: UnlovePostResponseResolvers,
  SearchPostResponse?: SearchPostResponseResolvers<ContextType>,
  LoginFailure?: LoginFailureResolvers<ContextType>,
  LoginSuccess?: LoginSuccessResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers,
  Post?: PostResolvers<ContextType>,
  BaseUser?: BaseUserResolvers,
  User?: UserResolvers<ContextType>,
  Me?: MeResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
