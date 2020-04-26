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
  author: GetPostDetailsData_post_author;
}

export interface GetPostDetailsData {
  post: GetPostDetailsData_post;
}

export interface GetPostDetailsDataVariables {
  id: number;
}
