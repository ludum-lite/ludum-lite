/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPostedHeaderData
// ====================================================

export interface GetUserPostedHeaderData_user {
  __typename: "User";
  id: number;
  profilePath: string;
  avatarPath: string | null;
  name: string;
}

export interface GetUserPostedHeaderData {
  user: GetUserPostedHeaderData_user;
}

export interface GetUserPostedHeaderDataVariables {
  id: number;
}
