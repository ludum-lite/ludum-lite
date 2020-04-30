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
  id: number;
}
