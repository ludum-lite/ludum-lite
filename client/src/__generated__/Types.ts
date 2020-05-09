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
// GraphQL query operation: GetPostDetailsData
// ====================================================

export interface GetPostDetailsData_post_author {
  __typename: "User";
  id: number;
  profilePath: string;
  avatarPath: string | null;
  name: string;
}

export interface GetPostDetailsData_post {
  __typename: "Post";
  id: number;
  name: string | null;
  body: string;
  publishedDate: string | null;
  author: GetPostDetailsData_post_author | null;
}

export interface GetPostDetailsData {
  post: GetPostDetailsData_post;
}

export interface GetPostDetailsDataVariables {
  input: IdInput;
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
// GraphQL mutation operation: LovePost
// ====================================================

export interface LovePost_lovePost_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface LovePost_lovePost_LovePostSuccess_post {
  __typename: "Post";
  id: number;
  numLove: number | null;
}

export interface LovePost_lovePost_LovePostSuccess_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface LovePost_lovePost_LovePostSuccess_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[] | null;
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
  numLove: number | null;
}

export interface UnlovePost_unlovePost_UnlovePostSuccess_me_UnauthorizedResponse {
  __typename: "UnauthorizedResponse";
}

export interface UnlovePost_unlovePost_UnlovePostSuccess_me_Me {
  __typename: "Me";
  id: number;
  lovedPosts: number[] | null;
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
  numLove: number | null;
  numNotes: number | null;
  name: string | null;
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
  lovedPosts: number[] | null;
}

export type GetPostsPageData_me = GetPostsPageData_me_UnauthorizedResponse | GetPostsPageData_me_Me;

export interface GetPostsPageData {
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
  numLove: number | null;
  numNotes: number | null;
  name: string | null;
  body: string;
  publishedDate: string | null;
  author: Post_post_author | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PostType {
  news = "news",
  user = "user",
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
}

//==============================================================
// END Enums and Input Objects
//==============================================================
