/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateUser($name: String!) {\n  createUser(name: $name) {\n    id\n    name\n  }\n}": types.CreateUserDocument,
    "mutation DeleteUser($id: String!) {\n  deleteUser(id: $id) {\n    id\n    name\n  }\n}": types.DeleteUserDocument,
    "query GetUser($id: String!) {\n  user(id: $id) {\n    id\n    name\n  }\n}": types.GetUserDocument,
    "query GetUsers($limit: Int) {\n  users(limit: $limit) {\n    id\n    name\n  }\n}": types.GetUsersDocument,
    "query GetUsersByID($ids: [String!]!) {\n  usersByID(ids: $ids) {\n    id\n    name\n  }\n}": types.GetUsersByIdDocument,
    "mutation UpdateUser($id: String!, $name: String!) {\n  updateUser(id: $id, name: $name) {\n    id\n    name\n  }\n}": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($name: String!) {\n  createUser(name: $name) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateUser($name: String!) {\n  createUser(name: $name) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteUser($id: String!) {\n  deleteUser(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteUser($id: String!) {\n  deleteUser(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUser($id: String!) {\n  user(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["query GetUser($id: String!) {\n  user(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUsers($limit: Int) {\n  users(limit: $limit) {\n    id\n    name\n  }\n}"): (typeof documents)["query GetUsers($limit: Int) {\n  users(limit: $limit) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUsersByID($ids: [String!]!) {\n  usersByID(ids: $ids) {\n    id\n    name\n  }\n}"): (typeof documents)["query GetUsersByID($ids: [String!]!) {\n  usersByID(ids: $ids) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($id: String!, $name: String!) {\n  updateUser(id: $id, name: $name) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation UpdateUser($id: String!, $name: String!) {\n  updateUser(id: $id, name: $name) {\n    id\n    name\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;