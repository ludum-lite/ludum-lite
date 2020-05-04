import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
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
  me: User;
  post: Post;
  searchPosts: SearchPostResponse;
  user: User;
};


export type QueryPostArgs = {
  input: GetByIdInput;
};


export type QuerySearchPostsArgs = {
  filters: SearchPostsFiltersInput;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryUserArgs = {
  input: GetByIdInput;
};

export type Mutation = {
   __typename?: 'Mutation';
  login: LoginResponse;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationResponse = {
  success: Scalars['Boolean'];
};

export type GetByIdInput = {
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
};

export type LoginFailureResponse = MutationResponse & {
   __typename?: 'LoginFailureResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type LoginSuccessResponse = MutationResponse & {
   __typename?: 'LoginSuccessResponse';
  success: Scalars['Boolean'];
  token: Scalars['String'];
};

export type LoginResponse = LoginFailureResponse | LoginSuccessResponse;

export enum PostType {
  News = 'news',
  User = 'user'
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
  name?: Maybe<Scalars['String']>;
  numLove?: Maybe<Scalars['Int']>;
  numNotes?: Maybe<Scalars['Int']>;
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

export type User = {
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
  MutationResponse: ResolversTypes['LoginFailureResponse'] | ResolversTypes['LoginSuccessResponse'],
  GetByIdInput: GetByIdInput,
  LoginInput: LoginInput,
  SearchPostResponse: ResolverTypeWrapper<SearchPostResponse>,
  SearchPostsFiltersInput: SearchPostsFiltersInput,
  LoginFailureResponse: ResolverTypeWrapper<LoginFailureResponse>,
  LoginSuccessResponse: ResolverTypeWrapper<LoginSuccessResponse>,
  LoginResponse: ResolversTypes['LoginFailureResponse'] | ResolversTypes['LoginSuccessResponse'],
  PostType: PostType,
  Post: ResolverTypeWrapper<Post>,
  User: ResolverTypeWrapper<User>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Query: {},
  Int: Scalars['Int'],
  Mutation: {},
  MutationResponse: ResolversParentTypes['LoginFailureResponse'] | ResolversParentTypes['LoginSuccessResponse'],
  GetByIdInput: GetByIdInput,
  LoginInput: LoginInput,
  SearchPostResponse: SearchPostResponse,
  SearchPostsFiltersInput: SearchPostsFiltersInput,
  LoginFailureResponse: LoginFailureResponse,
  LoginSuccessResponse: LoginSuccessResponse,
  LoginResponse: ResolversParentTypes['LoginFailureResponse'] | ResolversParentTypes['LoginSuccessResponse'],
  PostType: PostType,
  Post: Post,
  User: User,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryPostArgs, 'input'>>,
  searchPosts?: Resolver<ResolversTypes['SearchPostResponse'], ParentType, ContextType, RequireFields<QuerySearchPostsArgs, 'filters' | 'limit' | 'page'>>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
}>;

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LoginFailureResponse' | 'LoginSuccessResponse', ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type SearchPostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchPostResponse'] = ResolversParentTypes['SearchPostResponse']> = ResolversObject<{
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LoginFailureResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginFailureResponse'] = ResolversParentTypes['LoginFailureResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LoginSuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginSuccessResponse'] = ResolversParentTypes['LoginSuccessResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LoginFailureResponse' | 'LoginSuccessResponse', ParentType, ContextType>
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
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  numLove?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  numNotes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
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

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  MutationResponse?: MutationResponseResolvers,
  SearchPostResponse?: SearchPostResponseResolvers<ContextType>,
  LoginFailureResponse?: LoginFailureResponseResolvers<ContextType>,
  LoginSuccessResponse?: LoginSuccessResponseResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers,
  Post?: PostResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
