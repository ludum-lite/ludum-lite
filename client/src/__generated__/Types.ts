/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_LoginSuccessResponse {
  __typename: "LoginSuccessResponse";
  token: string;
}

export interface Login_login_LoginFailureResponse {
  __typename: "LoginFailureResponse";
  message: string;
}

export type Login_login = Login_login_LoginSuccessResponse | Login_login_LoginFailureResponse;

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
  input: GetByIdInput;
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
// GraphQL query operation: GetPostData
// ====================================================

export interface GetPostData_post_author {
  __typename: "User";
  id: number;
  profilePath: string;
  avatarPath: string | null;
  name: string;
}

export interface GetPostData_post {
  __typename: "Post";
  id: number;
  numLove: number | null;
  numNotes: number | null;
  name: string | null;
  body: string;
  publishedDate: string | null;
  author: GetPostData_post_author | null;
}

export interface GetPostData {
  post: GetPostData_post;
}

export interface GetPostDataVariables {
  input: GetByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostsPageData
// ====================================================

export interface GetPostsPageData_searchPosts_posts {
  __typename: "Post";
  id: number;
  publishedDate: string | null;
}

export interface GetPostsPageData_searchPosts {
  __typename: "SearchPostResponse";
  page: number;
  posts: GetPostsPageData_searchPosts_posts[];
}

export interface GetPostsPageData {
  searchPosts: GetPostsPageData_searchPosts;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PostType {
  news = "news",
  user = "user",
}

export interface GetByIdInput {
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
