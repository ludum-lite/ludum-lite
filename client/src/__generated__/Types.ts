/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAppData
// ====================================================

export interface GetAppData_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface GetAppData_me_Me {
  __typename: "Me";
  id: number;
}

export type GetAppData_me = GetAppData_me_UnauthorizedResponse | GetAppData_me_Me;

export interface GetAppData {
  me: GetAppData_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostBookmarkButton_GetFavoritedIds
// ====================================================

export interface PostBookmarkButton_GetFavoritedIds {
  favoritedIds: number[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostLoveButtonGlobalData
// ====================================================

export interface PostLoveButtonGlobalData {
  isLoggedIn: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LovePost
// ====================================================

export interface LovePost_lovePost_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface LovePost_lovePost_LovePostSuccess_post {
  __typename: "Post";
  id: number;
  numLove: number;
}

export interface LovePost_lovePost_LovePostSuccess_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface LovePost_lovePost_LovePostSuccess_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[];
}

export type LovePost_lovePost_LovePostSuccess_me = LovePost_lovePost_LovePostSuccess_me_UnauthorizedResponse | LovePost_lovePost_LovePostSuccess_me_Me;

export interface LovePost_lovePost_LovePostSuccess {
  __typename: "LovePostSuccess";
  post: LovePost_lovePost_LovePostSuccess_post;
  me: LovePost_lovePost_LovePostSuccess_me | null;
}

export type LovePost_lovePost = LovePost_lovePost_UnauthorizedResponse | LovePost_lovePost_LovePostSuccess;

export interface LovePost {
  lovePost: LovePost_lovePost;
}

export interface LovePostVariables {
  input: IdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnlovePost
// ====================================================

export interface UnlovePost_unlovePost_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface UnlovePost_unlovePost_UnlovePostSuccess_post {
  __typename: "Post";
  id: number;
  numLove: number;
}

export interface UnlovePost_unlovePost_UnlovePostSuccess_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface UnlovePost_unlovePost_UnlovePostSuccess_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[];
}

export type UnlovePost_unlovePost_UnlovePostSuccess_me = UnlovePost_unlovePost_UnlovePostSuccess_me_UnauthorizedResponse | UnlovePost_unlovePost_UnlovePostSuccess_me_Me;

export interface UnlovePost_unlovePost_UnlovePostSuccess {
  __typename: "UnlovePostSuccess";
  post: UnlovePost_unlovePost_UnlovePostSuccess_post;
  me: UnlovePost_unlovePost_UnlovePostSuccess_me | null;
}

export type UnlovePost_unlovePost = UnlovePost_unlovePost_UnauthorizedResponse | UnlovePost_unlovePost_UnlovePostSuccess;

export interface UnlovePost {
  unlovePost: UnlovePost_unlovePost;
}

export interface UnlovePostVariables {
  input: IdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostOverlayPageData
// ====================================================

export interface GetPostOverlayPageData_post_author {
  __typename: "User";
  id: number;
  profilePath: string;
  avatarPath: string | null;
  name: string;
}

export interface GetPostOverlayPageData_post_comments {
  __typename: "Comment";
  id: number;
  body: string;
  numLove: number;
}

export interface GetPostOverlayPageData_post {
  __typename: "Post";
  id: number;
  name: string;
  publishedDate: string | null;
  body: string;
  author: GetPostOverlayPageData_post_author | null;
  comments: GetPostOverlayPageData_post_comments[] | null;
  numLove: number;
}

export interface GetPostOverlayPageData_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface GetPostOverlayPageData_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[];
}

export type GetPostOverlayPageData_me = GetPostOverlayPageData_me_UnauthorizedResponse | GetPostOverlayPageData_me_Me;

export interface GetPostOverlayPageData {
  post: GetPostOverlayPageData_post;
  me: GetPostOverlayPageData_me;
}

export interface GetPostOverlayPageDataVariables {
  input: IdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsPage_GetFavoritedIds
// ====================================================

export interface PostsPage_GetFavoritedIds {
  favoritedIds: number[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostsPageData
// ====================================================

export interface GetPostsPageData_searchPosts_posts_author {
  __typename: "User";
  id: number;
  profilePath: string;
  avatarPath: string | null;
  name: string;
}

export interface GetPostsPageData_searchPosts_posts {
  __typename: "Post";
  id: number;
  publishedDate: string | null;
  numLove: number;
  numNotes: number;
  name: string;
  body: string;
  author: GetPostsPageData_searchPosts_posts_author | null;
}

export interface GetPostsPageData_searchPosts {
  __typename: "SearchPostResponse";
  page: number;
  posts: GetPostsPageData_searchPosts_posts[];
}

export interface GetPostsPageData_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface GetPostsPageData_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[];
}

export type GetPostsPageData_me = GetPostsPageData_me_UnauthorizedResponse | GetPostsPageData_me_Me;

export interface GetPostsPageData {
  isLoggedIn: boolean;
  searchPosts: GetPostsPageData_searchPosts;
  me: GetPostsPageData_me;
}

export interface GetPostsPageDataVariables {
  filters: SearchPostsFiltersInput;
  limit: number;
  page: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGlobalNavData
// ====================================================

export interface GetGlobalNavData {
  isLoggedIn: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_LoginSuccess {
  __typename: "LoginSuccess";
  token: string;
}

export interface Login_login_LoginFailure {
  __typename: "LoginFailure";
  message: string;
}

export type Login_login = Login_login_LoginSuccess | Login_login_LoginFailure;

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Comment_comment
// ====================================================

export interface Comment_comment {
  __typename: "Comment";
  id: number;
  body: string;
  numLove: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Comments_comment
// ====================================================

export interface Comments_comment {
  __typename: "Comment";
  id: number;
  body: string;
  numLove: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostCommentButton_post
// ====================================================

export interface PostCommentButton_post {
  __typename: "Post";
  id: number;
  numNotes: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostLoveButton_post
// ====================================================

export interface PostLoveButton_post {
  __typename: "Post";
  id: number;
  numLove: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostLoveButton_me
// ====================================================

export interface PostLoveButton_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface PostLoveButton_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[];
}

export type PostLoveButton_me = PostLoveButton_me_UnauthorizedResponse | PostLoveButton_me_Me;

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Post_post
// ====================================================

export interface Post_post_author {
  __typename: "User";
  id: number;
  profilePath: string;
  avatarPath: string | null;
  name: string;
}

export interface Post_post {
  __typename: "Post";
  id: number;
  numLove: number;
  numNotes: number;
  name: string;
  body: string;
  publishedDate: string | null;
  author: Post_post_author | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Post_me
// ====================================================

export interface Post_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface Post_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[];
}

export type Post_me = Post_me_UnauthorizedResponse | Post_me_Me;

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostDetails_post
// ====================================================

export interface PostDetails_post_author {
  __typename: "User";
  id: number;
  profilePath: string;
  avatarPath: string | null;
  name: string;
}

export interface PostDetails_post {
  __typename: "Post";
  id: number;
  name: string;
  body: string;
  publishedDate: string | null;
  author: PostDetails_post_author | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PostType {
  all = "all",
  favorites = "favorites",
  news = "news",
}

export interface IdInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SearchPostsFiltersInput {
  postType: PostType;
  favoritedIds?: number[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
