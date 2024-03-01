/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type BaseEntity = {
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CategoryEntity = BaseEntity & {
  __typename?: 'CategoryEntity';
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<CategoryEntity>;
  parentId?: Maybe<Scalars['String']['output']>;
  posts: Array<PostEntity>;
  subcategories: Array<CategoryEntity>;
  updatedAt: Scalars['String']['output'];
};

export type CommentEntity = BaseEntity & {
  __typename?: 'CommentEntity';
  author?: Maybe<ProfileEntity>;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  post?: Maybe<PostEntity>;
  postId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

/** data required to create a new user */
export type CreateProductDto = {
  age: ProductAge;
  available: Scalars['Boolean']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  health: ProductHealth;
  images: Scalars['String']['input'];
  name: Scalars['String']['input'];
  neighborhood: Scalars['String']['input'];
  size: ProductSize;
  state: Scalars['String']['input'];
  type: ProductType;
};

/** Data needed to create a new user */
export type CreateUserDto = {
  email: Scalars['String']['input'];
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requiredActions?: InputMaybe<Array<Scalars['String']['input']>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoggedUserModel = {
  __typename?: 'LoggedUserModel';
  acr: Scalars['String']['output'];
  allowed_origins: Array<Scalars['String']['output']>;
  aud: Scalars['String']['output'];
  auth_time: Scalars['Int']['output'];
  azp: Scalars['String']['output'];
  email_verified: Scalars['Boolean']['output'];
  exp: Scalars['Int']['output'];
  family_name: Scalars['String']['output'];
  given_name: Scalars['String']['output'];
  iat: Scalars['Int']['output'];
  /** the id of logged user. It was called id to be more intuitive but is the same as sub property */
  id: Scalars['String']['output'];
  iss: Scalars['String']['output'];
  jti: Scalars['String']['output'];
  name: Scalars['String']['output'];
  preferred_username: Scalars['String']['output'];
  realm_access: RealmAccessProp;
  scope: Scalars['String']['output'];
  session_state: Scalars['String']['output'];
  sid: Scalars['String']['output'];
  sub: Scalars['String']['output'];
  typ: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create and return a new product */
  createProduct: ProductEntity;
  /** Create and return a new user */
  createUser: UserModel;
  /** Overwrite and return the updated product */
  overwriteProduct: ProductEntity;
  /** Remove the product if exist or return null otherwise */
  removeProduct: ProductEntity;
  /** Update and return the updated product */
  updateProduct: ProductEntity;
};

export type MutationCreateProductArgs = {
  createProductDto: CreateProductDto;
};

export type MutationCreateUserArgs = {
  createUserDto: CreateUserDto;
};

export type MutationOverwriteProductArgs = {
  productId: Scalars['String']['input'];
  updateProductDto: UpdateProductDto;
};

export type MutationRemoveProductArgs = {
  productId: Scalars['String']['input'];
};

export type MutationUpdateProductArgs = {
  patchProductDto: PatchProductDto;
  productId: Scalars['String']['input'];
};

export type PatchProductDto = {
  age: ProductAge;
  available: Scalars['Boolean']['input'];
  buyer: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  health: ProductHealth;
  images: Scalars['String']['input'];
  name: Scalars['String']['input'];
  neighborhood: Scalars['String']['input'];
  size: ProductSize;
  state: Scalars['String']['input'];
  type: ProductType;
};

export type PostEntity = BaseEntity & {
  __typename?: 'PostEntity';
  PostTagEntity?: Maybe<PostTagEntity>;
  author?: Maybe<ProfileEntity>;
  authorId: Scalars['String']['output'];
  category?: Maybe<CategoryEntity>;
  categoryId: Scalars['String']['output'];
  comments: Array<CommentEntity>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Scalars['String']['output']>;
  mainImage: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  tags: Array<TagEntity>;
  title: Scalars['String']['output'];
  type: PostType;
  updatedAt: Scalars['String']['output'];
};

export type PostTagEntity = {
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  postId: Scalars['String']['output'];
  tagId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export enum PostType {
  Gallery = 'GALLERY',
  Page = 'PAGE',
  Text = 'TEXT',
}

export enum ProductAge {
  Adult = 'ADULT',
  Elder = 'ELDER',
  Puppy = 'PUPPY',
}

export type ProductEntity = BaseEntity & {
  __typename?: 'ProductEntity';
  age: ProductAge;
  author: Scalars['String']['output'];
  available: Scalars['Boolean']['output'];
  buyer?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  goal: ProductGoal;
  health: ProductHealth;
  id: Scalars['ID']['output'];
  images: Scalars['String']['output'];
  name: Scalars['String']['output'];
  neighborhood: Scalars['String']['output'];
  size: ProductSize;
  state: Scalars['String']['output'];
  status: ProductStatus;
  type: ProductType;
  updatedAt: Scalars['String']['output'];
};

export type ProductEntityInput = {
  age: ProductAge;
  author: Scalars['String']['input'];
  available: Scalars['Boolean']['input'];
  buyer?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  goal: ProductGoal;
  health: ProductHealth;
  images: Scalars['String']['input'];
  name: Scalars['String']['input'];
  neighborhood: Scalars['String']['input'];
  size: ProductSize;
  state: Scalars['String']['input'];
  status: ProductStatus;
  type: ProductType;
};

export enum ProductGoal {
  Adoption = 'ADOPTION',
  TemporaryGuard = 'TEMPORARY_GUARD',
}

export enum ProductHealth {
  Healthy = 'HEALTHY',
  UnderTreatment = 'UNDER_TREATMENT',
  Unhealthy = 'UNHEALTHY',
}

export type ProductQueryInput = {
  filter?: InputMaybe<ProductEntityInput>;
  order?: InputMaybe<Array<Scalars['String']['input']>>;
  pageIndex?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
};

export enum ProductSize {
  Big = 'BIG',
  Medium = 'MEDIUM',
  Small = 'SMALL',
}

export enum ProductStatus {
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
}

export enum ProductType {
  Cat = 'CAT',
  Dog = 'DOG',
  Other = 'OTHER',
}

export type ProfileEntity = BaseEntity & {
  __typename?: 'ProfileEntity';
  bio?: Maybe<Scalars['String']['output']>;
  comments: Array<CommentEntity>;
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  posts: Array<PostEntity>;
  updatedAt: Scalars['String']['output'];
  user?: Maybe<LoggedUserModel>;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns the product that match with the given id or NULL if nothing matches */
  product: ProductEntity;
  /** Returns a list of products */
  products: Array<ProductEntity>;
  /** Returns the total count of all products by criteria */
  productsCount: Scalars['Int']['output'];
  /** Returns the user that match with the provided id */
  user: UserModel;
  /** Returns a list of users */
  users: Array<UserModel>;
  /** Returns the total count of all users by criteria */
  usersCount: Scalars['Int']['output'];
};

export type QueryProductArgs = {
  id: Scalars['String']['input'];
};

export type QueryProductsArgs = {
  query?: InputMaybe<ProductQueryInput>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RealmAccessProp = {
  roles: Array<Scalars['String']['output']>;
};

export type TagEntity = BaseEntity & {
  __typename?: 'TagEntity';
  PostTagEntity?: Maybe<PostTagEntity>;
  createdAt: Scalars['String']['output'];
  deletedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts: Array<PostEntity>;
  updatedAt: Scalars['String']['output'];
};

export type UpdateProductDto = {
  age: ProductAge;
  available: Scalars['Boolean']['input'];
  buyer: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  health: ProductHealth;
  images: Scalars['String']['input'];
  name: Scalars['String']['input'];
  neighborhood: Scalars['String']['input'];
  size: ProductSize;
  state: Scalars['String']['input'];
  type: ProductType;
};

export type UserAccessProp = {
  impersonate: Scalars['Boolean']['output'];
  manage: Scalars['Boolean']['output'];
  manageGroupMembership: Scalars['Boolean']['output'];
  mapRoles: Scalars['Boolean']['output'];
  view: Scalars['Boolean']['output'];
};

export type UserModel = {
  __typename?: 'UserModel';
  access: UserAccessProp;
  createdTimestamp: Scalars['Int']['output'];
  disableableCredentialTypes: Array<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  notBefore: Scalars['Int']['output'];
  requiredActions: Array<Scalars['String']['output']>;
  totp: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type AllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type AllProductsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'ProductEntity';
    id: string;
    name: string;
    images: string;
    state: string;
    city: string;
    age: ProductAge;
    type: ProductType;
    size: ProductSize;
    health: ProductHealth;
    description: string;
  }>;
};

export const AllProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AllProducts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'age' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'health' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllProductsQuery, AllProductsQueryVariables>;
