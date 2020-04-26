/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPostsFiltersInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPostsPageData
// ====================================================

export interface GetPostsPageData_searchPosts {
  __typename: "Post";
  id: number;
  name: string | null;
}

export interface GetPostsPageData {
  searchPosts: GetPostsPageData_searchPosts[];
}

export interface GetPostsPageDataVariables {
  filters: SearchPostsFiltersInput;
  limit: number;
  page: number;
}
