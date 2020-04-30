/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPostsFiltersInput } from "./../../../__generated__/globalTypes";

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
