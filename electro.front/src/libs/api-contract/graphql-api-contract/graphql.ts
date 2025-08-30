/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type AttributeDefinition = {
  __typename?: 'AttributeDefinition';
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isFilterable: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: AttributeType;
};

export type AttributeDefinitionInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isFilterable: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  type: AttributeType;
};

export enum AttributeType {
  Boolean = 'BOOLEAN',
  List = 'LIST',
  Text = 'TEXT'
}

export type AttributeValue = {
  __typename?: 'AttributeValue';
  attributeDefinition: AttributeDefinition;
  isPrimary: Scalars['Boolean']['output'];
  value: Scalars['String']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  products: Array<CartProduct>;
  totalPrice: Money;
  totalQuantity: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['UUID']['output'];
};

export type CartProduct = {
  __typename?: 'CartProduct';
  calculateSubtotal: Money;
  id: Scalars['UUID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  unitPrice: Money;
};

export type Category = {
  __typename?: 'Category';
  active: Scalars['Boolean']['output'];
  attributes: Array<AttributeDefinition>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  groupId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  subCategories: Array<SubCategory>;
};

export type CreateOpinionInput = {
  authorDisplayName: Scalars['String']['input'];
  content: Scalars['String']['input'];
  productId: Scalars['UUID']['input'];
  rating: Scalars['Float']['input'];
};

export type CreateOpinionReactionInput = {
  opinionId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  reactionType: OpinionReactionType;
};

export type CreateOrUpdateCategoryInput = {
  active: Scalars['Boolean']['input'];
  attributes: Array<AttributeDefinitionInput>;
  description: Scalars['String']['input'];
  displayOrder: Scalars['Int']['input'];
  groupId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOrUpdateGroupInput = {
  active: Scalars['Boolean']['input'];
  attributes: Array<AttributeDefinitionInput>;
  description: Scalars['String']['input'];
  displayOrder: Scalars['Int']['input'];
  icon: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  photo: Scalars['String']['input'];
};

export type CreateOrUpdateProductAttributeInput = {
  id: Scalars['UUID']['input'];
  isPrimary: Scalars['Boolean']['input'];
  value: Scalars['String']['input'];
};

export type CreateOrUpdateProductInput = {
  amount: Scalars['Decimal']['input'];
  attributes: Array<CreateOrUpdateProductAttributeInput>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  groupId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  photos: Array<Scalars['String']['input']>;
  promotion?: InputMaybe<CreateOrUpdateProductPromotionInput>;
  status: ProductStatus;
  stockQuantityDelta: Scalars['Int']['input'];
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateOrUpdateProductPromotionInput = {
  endDate: Scalars['DateTime']['input'];
  isActive: Scalars['Boolean']['input'];
  promotionAmount: Scalars['Decimal']['input'];
  promotionCurrency: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type CreateOrUpdateRecipientInput = {
  city: Scalars['String']['input'];
  companyName?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  houseNumber: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  street: Scalars['String']['input'];
  surname?: InputMaybe<Scalars['String']['input']>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  type: RecipientType;
  userId: Scalars['UUID']['input'];
};

export type CreateOrUpdateSubCategoryInput = {
  active: Scalars['Boolean']['input'];
  attributes: Array<AttributeDefinitionInput>;
  categoryId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  displayOrder: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOrderInput = {
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  products: Array<CreateOrderProductInput>;
  recipient: CreateOrderRecipientInput;
};

export type CreateOrderProductInput = {
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateOrderRecipientInput = {
  city: Scalars['String']['input'];
  companyName?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  houseNumber: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  street: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  type: RecipientType;
};

export type Delivery = {
  __typename?: 'Delivery';
  cost: Money;
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  method: DeliveryMethod;
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  status: DeliveryStatus;
  trackingNumber?: Maybe<Scalars['String']['output']>;
};

export enum DeliveryMethod {
  CourierCashOnDelivery = 'COURIER_CASH_ON_DELIVERY',
  CourierExpress = 'COURIER_EXPRESS',
  CourierStandard = 'COURIER_STANDARD',
  Locker = 'LOCKER',
  PickupZabka = 'PICKUP_ZABKA'
}

export enum DeliveryStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Shipped = 'SHIPPED'
}

export type GetSearchProductsInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  filters: Array<KeyValuePairOfStringAndString__Input>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
};

export type Group = {
  __typename?: 'Group';
  active: Scalars['Boolean']['output'];
  attributes: Array<AttributeDefinition>;
  categories: Array<Category>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  photo: Scalars['String']['output'];
};

export type KeyValuePairOfStringAndString__Input = {
  key: Scalars['String']['input'];
  value: Array<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginUserResult = {
  __typename?: 'LoginUserResult';
  message: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiry?: Maybe<Scalars['DateTime']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  tokenExpiry?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Decimal']['output'];
  currency: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOpinion: Opinion;
  createOpinionReaction: Opinion;
  createOrUpdateCategory: Category;
  createOrUpdateGroup: Group;
  createOrUpdateProduct: Product;
  createOrUpdateRecipient: UserRecipient;
  createOrUpdateSubCategory: SubCategory;
  createOrder: Order;
  deleteCategory: Scalars['Boolean']['output'];
  deleteGroup: Scalars['Boolean']['output'];
  deleteRecipient: Scalars['Boolean']['output'];
  deleteSubCategory: Scalars['Boolean']['output'];
  loginUser: LoginUserResult;
  logoutUser: Scalars['Boolean']['output'];
  refreshToken: RefreshTokenResult;
  registerUser: RegisterUserResult;
  updateOrder: Order;
  validateCart: ValidateCartType;
};


export type MutationCreateOpinionArgs = {
  input: CreateOpinionInput;
};


export type MutationCreateOpinionReactionArgs = {
  input: CreateOpinionReactionInput;
};


export type MutationCreateOrUpdateCategoryArgs = {
  input: CreateOrUpdateCategoryInput;
};


export type MutationCreateOrUpdateGroupArgs = {
  input: CreateOrUpdateGroupInput;
};


export type MutationCreateOrUpdateProductArgs = {
  input: CreateOrUpdateProductInput;
};


export type MutationCreateOrUpdateRecipientArgs = {
  input: CreateOrUpdateRecipientInput;
};


export type MutationCreateOrUpdateSubCategoryArgs = {
  input: CreateOrUpdateSubCategoryInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRecipientArgs = {
  recipientId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type MutationDeleteSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


export type MutationValidateCartArgs = {
  input: ValidateCartInput;
};

export type Opinion = {
  __typename?: 'Opinion';
  addReaction: OpinionReaction;
  authorDisplayName: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dislikesCount: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  likesCount: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  reactions: Array<OpinionReaction>;
  userId: Scalars['UUID']['output'];
  userReaction?: Maybe<OpinionReactionType>;
};


export type OpinionAddReactionArgs = {
  reactionType: OpinionReactionType;
  userId: Scalars['UUID']['input'];
};

export type OpinionReaction = {
  __typename?: 'OpinionReaction';
  createdAt: Scalars['DateTime']['output'];
  opinionId: Scalars['UUID']['output'];
  reaction: OpinionReactionType;
  userId: Scalars['UUID']['output'];
};

export enum OpinionReactionType {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type OpinionsStats = {
  __typename?: 'OpinionsStats';
  count: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  delivery: Delivery;
  id: Scalars['UUID']['output'];
  number: Scalars['Int']['output'];
  payment: Payment;
  products: Array<OrderProduct>;
  recipient: Recipient;
  status: OrderStatus;
  totalPrice: Money;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['UUID']['output'];
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  price: Money;
  product: Product;
  quantity: Scalars['Int']['output'];
  totalPrice: Money;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Paid = 'PAID',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export type PaginatedResultOfOpinion = {
  __typename?: 'PaginatedResultOfOpinion';
  items: Array<Opinion>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedResultOfOrder = {
  __typename?: 'PaginatedResultOfOrder';
  items: Array<Order>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedResultOfProduct = {
  __typename?: 'PaginatedResultOfProduct';
  items: Array<Product>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  cost: Money;
  id: Scalars['UUID']['output'];
  method: PaymentMethod;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  status: PaymentStatus;
};

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Blik = 'BLIK',
  CreditCard = 'CREDIT_CARD',
  GooglePay = 'GOOGLE_PAY',
  InstantTransfer = 'INSTANT_TRANSFER'
}

export enum PaymentStatus {
  Failed = 'FAILED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type Product = {
  __typename?: 'Product';
  addOpinion: Opinion;
  addOpinionReaction: OpinionReaction;
  attributes: Array<AttributeValue>;
  averageOpinionRating?: Maybe<Scalars['Float']['output']>;
  category?: Maybe<Category>;
  description: Scalars['String']['output'];
  effectivePrice: Money;
  group?: Maybe<Group>;
  id: Scalars['UUID']['output'];
  isAvailableToBuy: Scalars['Boolean']['output'];
  isVisible: Scalars['Boolean']['output'];
  mainPhoto?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  opinionCount?: Maybe<Scalars['Int']['output']>;
  opinions: Array<Opinion>;
  photos: Array<Scalars['String']['output']>;
  price: Money;
  promotion?: Maybe<ProductPromotion>;
  status: ProductStatus;
  stockQuantity: Scalars['Int']['output'];
  subCategory?: Maybe<SubCategory>;
};


export type ProductAddOpinionArgs = {
  authorDisplayName: Scalars['String']['input'];
  content: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  userId: Scalars['UUID']['input'];
};


export type ProductAddOpinionReactionArgs = {
  opinionId: Scalars['UUID']['input'];
  reactionType: OpinionReactionType;
  userId: Scalars['UUID']['input'];
};

export type ProductPromotion = {
  __typename?: 'ProductPromotion';
  endDate: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  isCurrentlyActive: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  promotionalPrice: Money;
  startDate: Scalars['DateTime']['output'];
};

export enum ProductStatus {
  Active = 'ACTIVE',
  Discontinued = 'DISCONTINUED',
  Draft = 'DRAFT'
}

export type Query = {
  __typename?: 'Query';
  attributesDefinitions: Array<AttributeDefinition>;
  bestsellerProducts: Array<Product>;
  cart: Cart;
  catalogProducts: PaginatedResultOfProduct;
  category: Category;
  featuredProducts: Array<Product>;
  group: Group;
  menu: Array<Group>;
  order: Order;
  orders: PaginatedResultOfOrder;
  product?: Maybe<Product>;
  productFilters: Array<SearchFilterModel>;
  productHierarchy: Array<Group>;
  productOpinions: PaginatedResultOfOpinion;
  productOpinionsStats: Array<OpinionsStats>;
  promotionHighlightProduct: Product;
  recipients: Array<UserRecipient>;
  searchProducts: PaginatedResultOfProduct;
  similarProducts: Array<Product>;
  subCategory: SubCategory;
  userOrder: Order;
  userOrders: PaginatedResultOfOrder;
};


export type QueryAttributesDefinitionsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBestsellerProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCartArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryCatalogProductsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFeaturedProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGroupArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryOrdersArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProductFiltersArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductOpinionsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  productId: Scalars['UUID']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductOpinionsStatsArgs = {
  productId: Scalars['UUID']['input'];
};


export type QueryRecipientsArgs = {
  userId: Scalars['UUID']['input'];
};


export type QuerySearchProductsArgs = {
  input: GetSearchProductsInput;
};


export type QuerySimilarProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  productId: Scalars['UUID']['input'];
};


export type QuerySubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserOrderArgs = {
  orderId: Scalars['UUID']['input'];
};


export type QueryUserOrdersArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  userId: Scalars['UUID']['input'];
};

export type Recipient = {
  __typename?: 'Recipient';
  city: Scalars['String']['output'];
  companyName?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  houseNumber: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  street: Scalars['String']['output'];
  surname?: Maybe<Scalars['String']['output']>;
  taxIdentificationNumber?: Maybe<Scalars['String']['output']>;
  type: RecipientType;
};

export enum RecipientType {
  Company = 'COMPANY',
  Personal = 'PERSONAL'
}

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type RefreshTokenResult = {
  __typename?: 'RefreshTokenResult';
  message: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiry?: Maybe<Scalars['DateTime']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  tokenExpiry?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterUserResult = {
  __typename?: 'RegisterUserResult';
  message: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiry?: Maybe<Scalars['DateTime']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  tokenExpiry?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type SearchFilterModel = {
  __typename?: 'SearchFilterModel';
  attributeDefinitionId: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  type: AttributeType;
  values: Array<Scalars['String']['output']>;
};

export type SubCategory = {
  __typename?: 'SubCategory';
  active: Scalars['Boolean']['output'];
  attributes: Array<AttributeDefinition>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
};

export type UpdateOrderInput = {
  orderId: Scalars['UUID']['input'];
  recipient?: InputMaybe<UpdateOrderRecipientInput>;
  status: OrderStatus;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderRecipientInput = {
  city: Scalars['String']['input'];
  companyName?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  houseNumber: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  street: Scalars['String']['input'];
  surname?: InputMaybe<Scalars['String']['input']>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  type: RecipientType;
};

export type UserRecipient = {
  __typename?: 'UserRecipient';
  city: Scalars['String']['output'];
  companyName?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  houseNumber: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  phoneNumber: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  street: Scalars['String']['output'];
  surname?: Maybe<Scalars['String']['output']>;
  taxIdentificationNumber?: Maybe<Scalars['String']['output']>;
  type: RecipientType;
  userId: Scalars['UUID']['output'];
};

export type ValidateCartInput = {
  products: Array<ValidateCartProductInput>;
};

export type ValidateCartProductInput = {
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type ValidateCartType = {
  __typename?: 'ValidateCartType';
  cart: Cart;
  errors: Array<Scalars['String']['output']>;
};

export type AccountOrdersPageOrdersQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type AccountOrdersPageOrdersQuery = { __typename?: 'Query', userOrders: { __typename?: 'PaginatedResultOfOrder', page: number, pageSize: number, totalPages: number, items: Array<{ __typename?: 'Order', id: any, status: OrderStatus, number: number, createdAt: any, totalPrice: { __typename?: 'Money', amount: any, currency: string }, products: Array<{ __typename?: 'OrderProduct', id: any, quantity: number, name: string, product: { __typename?: 'Product', id: any, mainPhoto?: string | null }, price: { __typename?: 'Money', amount: any, currency: string } }> }> } };

export type AccountOrdersPageOrderQueryVariables = Exact<{
  orderId: Scalars['UUID']['input'];
}>;


export type AccountOrdersPageOrderQuery = { __typename?: 'Query', userOrder: { __typename?: 'Order', id: any, number: number, status: OrderStatus, createdAt: any, updatedAt: any, totalPrice: { __typename?: 'Money', amount: any, currency: string }, products: Array<{ __typename?: 'OrderProduct', id: any, quantity: number, totalPrice: { __typename?: 'Money', amount: any, currency: string }, product: { __typename?: 'Product', id: any, name: string, mainPhoto?: string | null, price: { __typename?: 'Money', amount: any, currency: string } } }>, payment: { __typename?: 'Payment', id: any, method: PaymentMethod, status: PaymentStatus, paidAt?: any | null, cost: { __typename?: 'Money', amount: any, currency: string } }, delivery: { __typename?: 'Delivery', id: any, method: DeliveryMethod, status: DeliveryStatus, trackingNumber?: string | null, shippedAt?: any | null, deliveredAt?: any | null, cost: { __typename?: 'Money', amount: any, currency: string } }, recipient: { __typename?: 'Recipient', type: RecipientType, firstName?: string | null, surname?: string | null, companyName?: string | null, taxIdentificationNumber?: string | null, phoneNumber: string, street: string, houseNumber: string, postalCode: string, city: string } } };

export type AdminOrdersPageOrdersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type AdminOrdersPageOrdersQuery = { __typename?: 'Query', orders: { __typename?: 'PaginatedResultOfOrder', page: number, pageSize: number, totalPages: number, items: Array<{ __typename?: 'Order', id: any, status: OrderStatus, createdAt: any, totalPrice: { __typename?: 'Money', amount: any, currency: string } }> } };

export type AdminOrdersPageOrderQueryVariables = Exact<{
  orderId: Scalars['UUID']['input'];
}>;


export type AdminOrdersPageOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: any, number: number, status: OrderStatus, createdAt: any, updatedAt: any, totalPrice: { __typename?: 'Money', amount: any, currency: string }, products: Array<{ __typename?: 'OrderProduct', id: any, quantity: number, name: string, price: { __typename?: 'Money', amount: any, currency: string }, totalPrice: { __typename?: 'Money', amount: any, currency: string }, product: { __typename?: 'Product', id: any, mainPhoto?: string | null } }>, payment: { __typename?: 'Payment', id: any, method: PaymentMethod, status: PaymentStatus, paidAt?: any | null, cost: { __typename?: 'Money', amount: any, currency: string } }, delivery: { __typename?: 'Delivery', id: any, method: DeliveryMethod, status: DeliveryStatus, trackingNumber?: string | null, shippedAt?: any | null, deliveredAt?: any | null, cost: { __typename?: 'Money', amount: any, currency: string } }, recipient: { __typename?: 'Recipient', type: RecipientType, firstName?: string | null, surname?: string | null, companyName?: string | null, taxIdentificationNumber?: string | null, phoneNumber: string, street: string, houseNumber: string, postalCode: string, city: string } } };

export type AdminOrdersPageUpdateOrderMutationVariables = Exact<{
  input: UpdateOrderInput;
}>;


export type AdminOrdersPageUpdateOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'Order', id: any, number: number, status: OrderStatus, createdAt: any, updatedAt: any, totalPrice: { __typename?: 'Money', amount: any, currency: string }, products: Array<{ __typename?: 'OrderProduct', id: any, quantity: number, name: string, price: { __typename?: 'Money', amount: any, currency: string }, totalPrice: { __typename?: 'Money', amount: any, currency: string }, product: { __typename?: 'Product', id: any, mainPhoto?: string | null } }>, payment: { __typename?: 'Payment', id: any, method: PaymentMethod, status: PaymentStatus, paidAt?: any | null, cost: { __typename?: 'Money', amount: any, currency: string } }, delivery: { __typename?: 'Delivery', id: any, method: DeliveryMethod, status: DeliveryStatus, trackingNumber?: string | null, shippedAt?: any | null, deliveredAt?: any | null, cost: { __typename?: 'Money', amount: any, currency: string } }, recipient: { __typename?: 'Recipient', type: RecipientType, firstName?: string | null, surname?: string | null, companyName?: string | null, taxIdentificationNumber?: string | null, phoneNumber: string, street: string, houseNumber: string, postalCode: string, city: string } } };

export type AdminProductCatalogPageProductsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type AdminProductCatalogPageProductsQuery = { __typename?: 'Query', catalogProducts: { __typename?: 'PaginatedResultOfProduct', page: number, pageSize: number, totalPages: number, items: Array<{ __typename?: 'Product', id: any, name: string, mainPhoto?: string | null, status: ProductStatus, stockQuantity: number, price: { __typename?: 'Money', amount: any, currency: string } }> } };

export type AdminProductPageProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type AdminProductPageProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: any, name: string, description: string, photos: Array<string>, status: ProductStatus, stockQuantity: number, averageOpinionRating?: number | null, opinionCount?: number | null, price: { __typename?: 'Money', amount: any, currency: string }, group?: { __typename?: 'Group', id: number } | null, category?: { __typename?: 'Category', id: number } | null, subCategory?: { __typename?: 'SubCategory', id: number } | null, promotion?: { __typename?: 'ProductPromotion', id: any, startDate: any, endDate: any, isEnabled: boolean, promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null, attributes: Array<{ __typename?: 'AttributeValue', value: string, isPrimary: boolean, attributeDefinition: { __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType } }> } | null };

export type AdminProductPageProductHierarchyQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminProductPageProductHierarchyQuery = { __typename?: 'Query', productHierarchy: Array<{ __typename?: 'Group', id: number, name: string, photo: string, icon: string, categories: Array<{ __typename?: 'Category', id: number, name: string, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string }> }> }> };

export type AdminProductPageAttributesDefinitionsQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminProductPageAttributesDefinitionsQuery = { __typename?: 'Query', attributesDefinitions: Array<{ __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType, isRequired: boolean, description: string, isFilterable: boolean }> };

export type AdminProductPageCreateOrUpdateProductMutationVariables = Exact<{
  input: CreateOrUpdateProductInput;
}>;


export type AdminProductPageCreateOrUpdateProductMutation = { __typename?: 'Mutation', createOrUpdateProduct: { __typename?: 'Product', id: any } };

export type AdminProductHierarchyPageProductHierarchyQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminProductHierarchyPageProductHierarchyQuery = { __typename?: 'Query', productHierarchy: Array<{ __typename?: 'Group', id: number, name: string, photo: string, icon: string, categories: Array<{ __typename?: 'Category', id: number, name: string, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string }> }> }> };

export type AdminProductHierarchyPageGroupQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminProductHierarchyPageGroupQuery = { __typename?: 'Query', group: { __typename?: 'Group', id: number, name: string, photo: string, icon: string, description: string, active: boolean, displayOrder: number, createdAt: any, modifiedAt: any, attributes: Array<{ __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType, isRequired: boolean, isFilterable: boolean, description: string }> } };

export type AdminProductHierarchyPageCategoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminProductHierarchyPageCategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: number, name: string, description: string, active: boolean, displayOrder: number, createdAt: any, modifiedAt: any, groupId?: number | null, attributes: Array<{ __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType, isRequired: boolean, isFilterable: boolean, description: string }> } };

export type AdminProductHierarchyPageSubCategoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminProductHierarchyPageSubCategoryQuery = { __typename?: 'Query', subCategory: { __typename?: 'SubCategory', id: number, name: string, description: string, active: boolean, displayOrder: number, createdAt: any, modifiedAt: any, categoryId?: number | null, attributes: Array<{ __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType, isRequired: boolean, isFilterable: boolean, description: string }> } };

export type AdminProductHierarchyPageCreateOrUpdateGroupMutationVariables = Exact<{
  input: CreateOrUpdateGroupInput;
}>;


export type AdminProductHierarchyPageCreateOrUpdateGroupMutation = { __typename?: 'Mutation', createOrUpdateGroup: { __typename?: 'Group', id: number, name: string, icon: string, photo: string, description: string, active: boolean, displayOrder: number, createdAt: any, modifiedAt: any, attributes: Array<{ __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType, isRequired: boolean, description: string, isFilterable: boolean }> } };

export type AdminProductHierarchyPageDeleteGroupMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminProductHierarchyPageDeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: boolean };

export type AdminProductHierarchyPageCreateOrUpdateCategoryMutationVariables = Exact<{
  input: CreateOrUpdateCategoryInput;
}>;


export type AdminProductHierarchyPageCreateOrUpdateCategoryMutation = { __typename?: 'Mutation', createOrUpdateCategory: { __typename?: 'Category', id: number, name: string, description: string, active: boolean, displayOrder: number, createdAt: any, modifiedAt: any, attributes: Array<{ __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType, isRequired: boolean, isFilterable: boolean, description: string }> } };

export type AdminProductHierarchyPageDeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminProductHierarchyPageDeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type AdminProductHierarchyPageCreateOrUpdateSubCategoryMutationVariables = Exact<{
  input: CreateOrUpdateSubCategoryInput;
}>;


export type AdminProductHierarchyPageCreateOrUpdateSubCategoryMutation = { __typename?: 'Mutation', createOrUpdateSubCategory: { __typename?: 'SubCategory', id: number, name: string, description: string, active: boolean, displayOrder: number, createdAt: any, modifiedAt: any, categoryId?: number | null, attributes: Array<{ __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType, isRequired: boolean, isFilterable: boolean, description: string }> } };

export type AdminProductHierarchyPageDeleteSubCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminProductHierarchyPageDeleteSubCategoryMutation = { __typename?: 'Mutation', deleteSubCategory: boolean };

export type AuthPageRegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type AuthPageRegisterMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterUserResult', success: boolean, message: string, userId?: any | null, token?: string | null, tokenExpiry?: any | null, refreshToken?: string | null, refreshTokenExpiry?: any | null, roles?: Array<string> | null } };

export type AuthPageLoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type AuthPageLoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUserResult', success: boolean, message: string, userId?: any | null, token?: string | null, tokenExpiry?: any | null, refreshToken?: string | null, refreshTokenExpiry?: any | null, roles?: Array<string> | null } };

export type AuthPageRefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type AuthPageRefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResult', success: boolean, message: string, userId?: any | null, token?: string | null, tokenExpiry?: any | null, refreshToken?: string | null, refreshTokenExpiry?: any | null, roles?: Array<string> | null } };

export type AuthPageLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthPageLogoutMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type CartPageCartQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type CartPageCartQuery = { __typename?: 'Query', cart: { __typename?: 'Cart', id: any, totalQuantity: number, totalPrice: { __typename?: 'Money', amount: any, currency: string }, products: Array<{ __typename?: 'CartProduct', quantity: number, product: { __typename?: 'Product', id: any, mainPhoto?: string | null, name: string, promotion?: { __typename?: 'ProductPromotion', promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null, price: { __typename?: 'Money', amount: any, currency: string } } }> } };

export type CartPageValidateCartMutationVariables = Exact<{
  input: ValidateCartInput;
}>;


export type CartPageValidateCartMutation = { __typename?: 'Mutation', validateCart: { __typename?: 'ValidateCartType', errors: Array<string>, cart: { __typename?: 'Cart', id: any, totalQuantity: number, totalPrice: { __typename?: 'Money', amount: any, currency: string }, products: Array<{ __typename?: 'CartProduct', quantity: number, product: { __typename?: 'Product', id: any, mainPhoto?: string | null, name: string, promotion?: { __typename?: 'ProductPromotion', promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null, price: { __typename?: 'Money', amount: any, currency: string } } }> } } };

export type CartPageRecipientsQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type CartPageRecipientsQuery = { __typename?: 'Query', recipients: Array<{ __typename?: 'UserRecipient', id: any, firstName?: string | null, surname?: string | null, companyName?: string | null, taxIdentificationNumber?: string | null, type: RecipientType, phoneNumber: string, street: string, houseNumber: string, postalCode: string, city: string }> };

export type CartPageCreateOrUpdateRecipientMutationVariables = Exact<{
  input: CreateOrUpdateRecipientInput;
}>;


export type CartPageCreateOrUpdateRecipientMutation = { __typename?: 'Mutation', createOrUpdateRecipient: { __typename?: 'UserRecipient', id: any, firstName?: string | null, surname?: string | null, companyName?: string | null, taxIdentificationNumber?: string | null, type: RecipientType, phoneNumber: string, street: string, houseNumber: string, postalCode: string, city: string } };

export type CartPageDeleteRecipientMutationVariables = Exact<{
  recipientId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type CartPageDeleteRecipientMutation = { __typename?: 'Mutation', deleteRecipient: boolean };

export type CartPageCreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CartPageCreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: any, status: OrderStatus } };

export type LayoutMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type LayoutMenuQuery = { __typename?: 'Query', menu: Array<{ __typename?: 'Group', id: number, name: string, photo: string, icon: string, categories: Array<{ __typename?: 'Category', id: number, name: string, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string }> }> }> };

export type ProductPageProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type ProductPageProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: any, name: string, description: string, photos: Array<string>, status: ProductStatus, stockQuantity: number, averageOpinionRating?: number | null, opinionCount?: number | null, price: { __typename?: 'Money', amount: any, currency: string }, group?: { __typename?: 'Group', id: number } | null, category?: { __typename?: 'Category', id: number } | null, subCategory?: { __typename?: 'SubCategory', id: number } | null, promotion?: { __typename?: 'ProductPromotion', id: any, startDate: any, endDate: any, isEnabled: boolean, promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null, attributes: Array<{ __typename?: 'AttributeValue', value: string, isPrimary: boolean, attributeDefinition: { __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType } }> } | null };

export type ProductPageOpinionsQueryVariables = Exact<{
  productId: Scalars['UUID']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductPageOpinionsQuery = { __typename?: 'Query', productOpinions: { __typename?: 'PaginatedResultOfOpinion', page: number, pageSize: number, totalPages: number, items: Array<{ __typename?: 'Opinion', id: any, content: string, rating: number, createdAt: any, authorDisplayName: string, userReaction?: OpinionReactionType | null, likesCount: number, dislikesCount: number }> } };

export type ProductPageOpinionsStatsQueryVariables = Exact<{
  productId: Scalars['UUID']['input'];
}>;


export type ProductPageOpinionsStatsQuery = { __typename?: 'Query', productOpinionsStats: Array<{ __typename?: 'OpinionsStats', rating: number, count: number }> };

export type ProductPageCreateOpinionReactionMutationVariables = Exact<{
  input: CreateOpinionReactionInput;
}>;


export type ProductPageCreateOpinionReactionMutation = { __typename?: 'Mutation', createOpinionReaction: { __typename?: 'Opinion', userReaction?: OpinionReactionType | null, likesCount: number, dislikesCount: number } };

export type ProductPageCreateOpinionMutationVariables = Exact<{
  input: CreateOpinionInput;
}>;


export type ProductPageCreateOpinionMutation = { __typename?: 'Mutation', createOpinion: { __typename?: 'Opinion', id: any, content: string, rating: number, createdAt: any, authorDisplayName: string } };

export type ProductPageSimilarProductsQueryVariables = Exact<{
  productId: Scalars['UUID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductPageSimilarProductsQuery = { __typename?: 'Query', similarProducts: Array<{ __typename?: 'Product', id: any, name: string, photos: Array<string>, price: { __typename?: 'Money', amount: any, currency: string }, promotion?: { __typename?: 'ProductPromotion', promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null }> };

export type SearchPageProductsQueryVariables = Exact<{
  input: GetSearchProductsInput;
}>;


export type SearchPageProductsQuery = { __typename?: 'Query', searchProducts: { __typename?: 'PaginatedResultOfProduct', page: number, pageSize: number, totalPages: number, items: Array<{ __typename?: 'Product', id: any, name: string, mainPhoto?: string | null, status: ProductStatus, averageOpinionRating?: number | null, opinionCount?: number | null, price: { __typename?: 'Money', amount: any, currency: string }, attributes: Array<{ __typename?: 'AttributeValue', value: string, isPrimary: boolean, attributeDefinition: { __typename?: 'AttributeDefinition', id: any, name: string, type: AttributeType } }>, promotion?: { __typename?: 'ProductPromotion', promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null }> } };

export type SeachPageFiltersQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SeachPageFiltersQuery = { __typename?: 'Query', productFilters: Array<{ __typename?: 'SearchFilterModel', attributeDefinitionId: any, type: AttributeType, name: string, values: Array<string> }> };

export type SeachPageProductHierarchyQueryVariables = Exact<{ [key: string]: never; }>;


export type SeachPageProductHierarchyQuery = { __typename?: 'Query', menu: Array<{ __typename?: 'Group', id: number, name: string, photo: string, icon: string, categories: Array<{ __typename?: 'Category', id: number, name: string, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string }> }> }> };

export type RootPageBestsellerProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RootPageBestsellerProductsQuery = { __typename?: 'Query', bestsellerProducts: Array<{ __typename?: 'Product', id: any, name: string, mainPhoto?: string | null, price: { __typename?: 'Money', amount: any, currency: string }, promotion?: { __typename?: 'ProductPromotion', promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null }> };

export type RootPageFeaturedProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RootPageFeaturedProductsQuery = { __typename?: 'Query', featuredProducts: Array<{ __typename?: 'Product', id: any, name: string, mainPhoto?: string | null, price: { __typename?: 'Money', amount: any, currency: string }, promotion?: { __typename?: 'ProductPromotion', promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null }> };

export type RootPagePromotionHightlightQueryVariables = Exact<{ [key: string]: never; }>;


export type RootPagePromotionHightlightQuery = { __typename?: 'Query', promotionHighlightProduct: { __typename?: 'Product', id: any, name: string, mainPhoto?: string | null, price: { __typename?: 'Money', amount: any, currency: string }, promotion?: { __typename?: 'ProductPromotion', promotionalPrice: { __typename?: 'Money', amount: any, currency: string } } | null } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AccountOrdersPageOrdersDocument = new TypedDocumentString(`
    query AccountOrdersPageOrders($userId: UUID!, $page: Int!, $pageSize: Int!) {
  userOrders(userId: $userId, page: $page, pageSize: $pageSize) {
    items {
      id
      status
      number
      createdAt
      totalPrice {
        amount
        currency
      }
      products {
        id
        quantity
        name
        product {
          id
          mainPhoto
        }
        price {
          amount
          currency
        }
      }
    }
    page
    pageSize
    totalPages
  }
}
    `) as unknown as TypedDocumentString<AccountOrdersPageOrdersQuery, AccountOrdersPageOrdersQueryVariables>;
export const AccountOrdersPageOrderDocument = new TypedDocumentString(`
    query AccountOrdersPageOrder($orderId: UUID!) {
  userOrder(orderId: $orderId) {
    id
    number
    status
    createdAt
    updatedAt
    totalPrice {
      amount
      currency
    }
    products {
      id
      quantity
      totalPrice {
        amount
        currency
      }
      product {
        id
        name
        mainPhoto
        price {
          amount
          currency
        }
      }
    }
    payment {
      id
      method
      cost {
        amount
        currency
      }
      status
      paidAt
    }
    delivery {
      id
      method
      cost {
        amount
        currency
      }
      status
      trackingNumber
      shippedAt
      deliveredAt
    }
    recipient {
      type
      firstName
      surname
      companyName
      taxIdentificationNumber
      phoneNumber
      street
      houseNumber
      postalCode
      city
    }
  }
}
    `) as unknown as TypedDocumentString<AccountOrdersPageOrderQuery, AccountOrdersPageOrderQueryVariables>;
export const AdminOrdersPageOrdersDocument = new TypedDocumentString(`
    query AdminOrdersPageOrders($page: Int!, $pageSize: Int!) {
  orders(page: $page, pageSize: $pageSize) {
    items {
      id
      status
      totalPrice {
        amount
        currency
      }
      createdAt
    }
    page
    pageSize
    totalPages
  }
}
    `) as unknown as TypedDocumentString<AdminOrdersPageOrdersQuery, AdminOrdersPageOrdersQueryVariables>;
export const AdminOrdersPageOrderDocument = new TypedDocumentString(`
    query AdminOrdersPageOrder($orderId: UUID!) {
  order(id: $orderId) {
    id
    number
    status
    totalPrice {
      amount
      currency
    }
    createdAt
    updatedAt
    products {
      id
      quantity
      name
      price {
        amount
        currency
      }
      totalPrice {
        amount
        currency
      }
      product {
        id
        mainPhoto
      }
    }
    payment {
      id
      method
      cost {
        amount
        currency
      }
      status
      paidAt
    }
    delivery {
      id
      method
      cost {
        amount
        currency
      }
      status
      trackingNumber
      shippedAt
      deliveredAt
    }
    recipient {
      type
      firstName
      surname
      companyName
      taxIdentificationNumber
      phoneNumber
      street
      houseNumber
      postalCode
      city
    }
  }
}
    `) as unknown as TypedDocumentString<AdminOrdersPageOrderQuery, AdminOrdersPageOrderQueryVariables>;
export const AdminOrdersPageUpdateOrderDocument = new TypedDocumentString(`
    mutation AdminOrdersPageUpdateOrder($input: UpdateOrderInput!) {
  updateOrder(input: $input) {
    id
    number
    status
    totalPrice {
      amount
      currency
    }
    createdAt
    updatedAt
    products {
      id
      quantity
      name
      price {
        amount
        currency
      }
      totalPrice {
        amount
        currency
      }
      product {
        id
        mainPhoto
      }
    }
    payment {
      id
      method
      cost {
        amount
        currency
      }
      status
      paidAt
    }
    delivery {
      id
      method
      cost {
        amount
        currency
      }
      status
      trackingNumber
      shippedAt
      deliveredAt
    }
    recipient {
      type
      firstName
      surname
      companyName
      taxIdentificationNumber
      phoneNumber
      street
      houseNumber
      postalCode
      city
    }
  }
}
    `) as unknown as TypedDocumentString<AdminOrdersPageUpdateOrderMutation, AdminOrdersPageUpdateOrderMutationVariables>;
export const AdminProductCatalogPageProductsDocument = new TypedDocumentString(`
    query AdminProductCatalogPageProducts($page: Int!, $pageSize: Int!) {
  catalogProducts(page: $page, pageSize: $pageSize) {
    items {
      id
      name
      price {
        amount
        currency
      }
      mainPhoto
      status
      stockQuantity
    }
    page
    pageSize
    totalPages
  }
}
    `) as unknown as TypedDocumentString<AdminProductCatalogPageProductsQuery, AdminProductCatalogPageProductsQueryVariables>;
export const AdminProductPageProductDocument = new TypedDocumentString(`
    query AdminProductPageProduct($id: UUID!) {
  product(id: $id) {
    id
    name
    description
    price {
      amount
      currency
    }
    photos
    status
    group {
      id
    }
    category {
      id
    }
    subCategory {
      id
    }
    stockQuantity
    averageOpinionRating
    opinionCount
    promotion {
      id
      startDate
      endDate
      promotionalPrice {
        amount
        currency
      }
      isEnabled
    }
    attributes {
      value
      isPrimary
      attributeDefinition {
        id
        name
        type
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductPageProductQuery, AdminProductPageProductQueryVariables>;
export const AdminProductPageProductHierarchyDocument = new TypedDocumentString(`
    query AdminProductPageProductHierarchy {
  productHierarchy {
    id
    name
    photo
    icon
    categories {
      id
      name
      subCategories {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductPageProductHierarchyQuery, AdminProductPageProductHierarchyQueryVariables>;
export const AdminProductPageAttributesDefinitionsDocument = new TypedDocumentString(`
    query AdminProductPageAttributesDefinitions($groupId: Int, $categoryId: Int, $subCategoryId: Int) {
  attributesDefinitions(
    groupId: $groupId
    categoryId: $categoryId
    subCategoryId: $subCategoryId
  ) {
    id
    name
    type
    isRequired
    description
    isFilterable
  }
}
    `) as unknown as TypedDocumentString<AdminProductPageAttributesDefinitionsQuery, AdminProductPageAttributesDefinitionsQueryVariables>;
export const AdminProductPageCreateOrUpdateProductDocument = new TypedDocumentString(`
    mutation AdminProductPageCreateOrUpdateProduct($input: CreateOrUpdateProductInput!) {
  createOrUpdateProduct(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<AdminProductPageCreateOrUpdateProductMutation, AdminProductPageCreateOrUpdateProductMutationVariables>;
export const AdminProductHierarchyPageProductHierarchyDocument = new TypedDocumentString(`
    query AdminProductHierarchyPageProductHierarchy {
  productHierarchy {
    id
    name
    photo
    icon
    categories {
      id
      name
      subCategories {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageProductHierarchyQuery, AdminProductHierarchyPageProductHierarchyQueryVariables>;
export const AdminProductHierarchyPageGroupDocument = new TypedDocumentString(`
    query AdminProductHierarchyPageGroup($id: Int!) {
  group(id: $id) {
    id
    name
    photo
    icon
    description
    active
    displayOrder
    createdAt
    modifiedAt
    attributes {
      id
      name
      type
      isRequired
      isFilterable
      description
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageGroupQuery, AdminProductHierarchyPageGroupQueryVariables>;
export const AdminProductHierarchyPageCategoryDocument = new TypedDocumentString(`
    query AdminProductHierarchyPageCategory($id: Int!) {
  category(id: $id) {
    id
    name
    description
    active
    displayOrder
    createdAt
    modifiedAt
    groupId
    attributes {
      id
      name
      type
      isRequired
      isFilterable
      description
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageCategoryQuery, AdminProductHierarchyPageCategoryQueryVariables>;
export const AdminProductHierarchyPageSubCategoryDocument = new TypedDocumentString(`
    query AdminProductHierarchyPageSubCategory($id: Int!) {
  subCategory(id: $id) {
    id
    name
    description
    active
    displayOrder
    createdAt
    modifiedAt
    categoryId
    attributes {
      id
      name
      type
      isRequired
      isFilterable
      description
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageSubCategoryQuery, AdminProductHierarchyPageSubCategoryQueryVariables>;
export const AdminProductHierarchyPageCreateOrUpdateGroupDocument = new TypedDocumentString(`
    mutation AdminProductHierarchyPageCreateOrUpdateGroup($input: CreateOrUpdateGroupInput!) {
  createOrUpdateGroup(input: $input) {
    id
    name
    icon
    photo
    description
    active
    displayOrder
    createdAt
    modifiedAt
    attributes {
      id
      name
      type
      isRequired
      description
      isFilterable
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageCreateOrUpdateGroupMutation, AdminProductHierarchyPageCreateOrUpdateGroupMutationVariables>;
export const AdminProductHierarchyPageDeleteGroupDocument = new TypedDocumentString(`
    mutation AdminProductHierarchyPageDeleteGroup($id: Int!) {
  deleteGroup(id: $id)
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageDeleteGroupMutation, AdminProductHierarchyPageDeleteGroupMutationVariables>;
export const AdminProductHierarchyPageCreateOrUpdateCategoryDocument = new TypedDocumentString(`
    mutation AdminProductHierarchyPageCreateOrUpdateCategory($input: CreateOrUpdateCategoryInput!) {
  createOrUpdateCategory(input: $input) {
    id
    name
    description
    active
    displayOrder
    createdAt
    modifiedAt
    attributes {
      id
      name
      type
      isRequired
      isFilterable
      description
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageCreateOrUpdateCategoryMutation, AdminProductHierarchyPageCreateOrUpdateCategoryMutationVariables>;
export const AdminProductHierarchyPageDeleteCategoryDocument = new TypedDocumentString(`
    mutation AdminProductHierarchyPageDeleteCategory($id: Int!) {
  deleteCategory(id: $id)
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageDeleteCategoryMutation, AdminProductHierarchyPageDeleteCategoryMutationVariables>;
export const AdminProductHierarchyPageCreateOrUpdateSubCategoryDocument = new TypedDocumentString(`
    mutation AdminProductHierarchyPageCreateOrUpdateSubCategory($input: CreateOrUpdateSubCategoryInput!) {
  createOrUpdateSubCategory(input: $input) {
    id
    name
    description
    active
    displayOrder
    createdAt
    modifiedAt
    categoryId
    attributes {
      id
      name
      type
      isRequired
      isFilterable
      description
    }
  }
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageCreateOrUpdateSubCategoryMutation, AdminProductHierarchyPageCreateOrUpdateSubCategoryMutationVariables>;
export const AdminProductHierarchyPageDeleteSubCategoryDocument = new TypedDocumentString(`
    mutation AdminProductHierarchyPageDeleteSubCategory($id: Int!) {
  deleteSubCategory(id: $id)
}
    `) as unknown as TypedDocumentString<AdminProductHierarchyPageDeleteSubCategoryMutation, AdminProductHierarchyPageDeleteSubCategoryMutationVariables>;
export const AuthPageRegisterDocument = new TypedDocumentString(`
    mutation AuthPageRegister($input: RegisterInput!) {
  registerUser(input: $input) {
    success
    message
    userId
    token
    tokenExpiry
    refreshToken
    refreshTokenExpiry
    roles
  }
}
    `) as unknown as TypedDocumentString<AuthPageRegisterMutation, AuthPageRegisterMutationVariables>;
export const AuthPageLoginDocument = new TypedDocumentString(`
    mutation AuthPageLogin($input: LoginInput!) {
  loginUser(input: $input) {
    success
    message
    userId
    token
    tokenExpiry
    refreshToken
    refreshTokenExpiry
    roles
  }
}
    `) as unknown as TypedDocumentString<AuthPageLoginMutation, AuthPageLoginMutationVariables>;
export const AuthPageRefreshTokenDocument = new TypedDocumentString(`
    mutation AuthPageRefreshToken($input: RefreshTokenInput!) {
  refreshToken(input: $input) {
    success
    message
    userId
    token
    tokenExpiry
    refreshToken
    refreshTokenExpiry
    roles
  }
}
    `) as unknown as TypedDocumentString<AuthPageRefreshTokenMutation, AuthPageRefreshTokenMutationVariables>;
export const AuthPageLogoutDocument = new TypedDocumentString(`
    mutation AuthPageLogout {
  logoutUser
}
    `) as unknown as TypedDocumentString<AuthPageLogoutMutation, AuthPageLogoutMutationVariables>;
export const CartPageCartDocument = new TypedDocumentString(`
    query CartPageCart($userId: UUID!) {
  cart(userId: $userId) {
    id
    totalQuantity
    totalPrice {
      amount
      currency
    }
    products {
      quantity
      product {
        id
        promotion {
          promotionalPrice {
            amount
            currency
          }
        }
        price {
          amount
          currency
        }
        mainPhoto
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartPageCartQuery, CartPageCartQueryVariables>;
export const CartPageValidateCartDocument = new TypedDocumentString(`
    mutation CartPageValidateCart($input: ValidateCartInput!) {
  validateCart(input: $input) {
    cart {
      id
      totalQuantity
      totalPrice {
        amount
        currency
      }
      products {
        quantity
        product {
          id
          promotion {
            promotionalPrice {
              amount
              currency
            }
          }
          price {
            amount
            currency
          }
          mainPhoto
          name
        }
      }
    }
    errors
  }
}
    `) as unknown as TypedDocumentString<CartPageValidateCartMutation, CartPageValidateCartMutationVariables>;
export const CartPageRecipientsDocument = new TypedDocumentString(`
    query CartPageRecipients($userId: UUID!) {
  recipients(userId: $userId) {
    id
    firstName
    surname
    companyName
    taxIdentificationNumber
    type
    phoneNumber
    street
    houseNumber
    postalCode
    city
  }
}
    `) as unknown as TypedDocumentString<CartPageRecipientsQuery, CartPageRecipientsQueryVariables>;
export const CartPageCreateOrUpdateRecipientDocument = new TypedDocumentString(`
    mutation CartPageCreateOrUpdateRecipient($input: CreateOrUpdateRecipientInput!) {
  createOrUpdateRecipient(input: $input) {
    id
    firstName
    surname
    companyName
    taxIdentificationNumber
    type
    phoneNumber
    street
    houseNumber
    postalCode
    city
  }
}
    `) as unknown as TypedDocumentString<CartPageCreateOrUpdateRecipientMutation, CartPageCreateOrUpdateRecipientMutationVariables>;
export const CartPageDeleteRecipientDocument = new TypedDocumentString(`
    mutation CartPageDeleteRecipient($recipientId: UUID!, $userId: UUID!) {
  deleteRecipient(recipientId: $recipientId, userId: $userId)
}
    `) as unknown as TypedDocumentString<CartPageDeleteRecipientMutation, CartPageDeleteRecipientMutationVariables>;
export const CartPageCreateOrderDocument = new TypedDocumentString(`
    mutation CartPageCreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    status
  }
}
    `) as unknown as TypedDocumentString<CartPageCreateOrderMutation, CartPageCreateOrderMutationVariables>;
export const LayoutMenuDocument = new TypedDocumentString(`
    query LayoutMenu {
  menu {
    id
    name
    photo
    icon
    categories {
      id
      name
      subCategories {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<LayoutMenuQuery, LayoutMenuQueryVariables>;
export const ProductPageProductDocument = new TypedDocumentString(`
    query ProductPageProduct($id: UUID!) {
  product(id: $id) {
    id
    name
    description
    price {
      amount
      currency
    }
    photos
    status
    group {
      id
    }
    category {
      id
    }
    subCategory {
      id
    }
    stockQuantity
    averageOpinionRating
    opinionCount
    promotion {
      id
      startDate
      endDate
      promotionalPrice {
        amount
        currency
      }
      isEnabled
    }
    attributes {
      value
      isPrimary
      attributeDefinition {
        id
        name
        type
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductPageProductQuery, ProductPageProductQueryVariables>;
export const ProductPageOpinionsDocument = new TypedDocumentString(`
    query ProductPageOpinions($productId: UUID!, $page: Int!, $pageSize: Int!, $rating: Int) {
  productOpinions(
    productId: $productId
    page: $page
    pageSize: $pageSize
    rating: $rating
  ) {
    items {
      id
      content
      rating
      createdAt
      authorDisplayName
      userReaction
      likesCount
      dislikesCount
    }
    page
    pageSize
    totalPages
  }
}
    `) as unknown as TypedDocumentString<ProductPageOpinionsQuery, ProductPageOpinionsQueryVariables>;
export const ProductPageOpinionsStatsDocument = new TypedDocumentString(`
    query ProductPageOpinionsStats($productId: UUID!) {
  productOpinionsStats(productId: $productId) {
    rating
    count
  }
}
    `) as unknown as TypedDocumentString<ProductPageOpinionsStatsQuery, ProductPageOpinionsStatsQueryVariables>;
export const ProductPageCreateOpinionReactionDocument = new TypedDocumentString(`
    mutation ProductPageCreateOpinionReaction($input: CreateOpinionReactionInput!) {
  createOpinionReaction(input: $input) {
    userReaction
    likesCount
    dislikesCount
  }
}
    `) as unknown as TypedDocumentString<ProductPageCreateOpinionReactionMutation, ProductPageCreateOpinionReactionMutationVariables>;
export const ProductPageCreateOpinionDocument = new TypedDocumentString(`
    mutation ProductPageCreateOpinion($input: CreateOpinionInput!) {
  createOpinion(input: $input) {
    id
    content
    rating
    createdAt
    authorDisplayName
  }
}
    `) as unknown as TypedDocumentString<ProductPageCreateOpinionMutation, ProductPageCreateOpinionMutationVariables>;
export const ProductPageSimilarProductsDocument = new TypedDocumentString(`
    query ProductPageSimilarProducts($productId: UUID!, $limit: Int) {
  similarProducts(productId: $productId, limit: $limit) {
    id
    name
    price {
      amount
      currency
    }
    photos
    promotion {
      promotionalPrice {
        amount
        currency
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductPageSimilarProductsQuery, ProductPageSimilarProductsQueryVariables>;
export const SearchPageProductsDocument = new TypedDocumentString(`
    query SearchPageProducts($input: GetSearchProductsInput!) {
  searchProducts(input: $input) {
    items {
      id
      name
      price {
        amount
        currency
      }
      mainPhoto
      status
      averageOpinionRating
      opinionCount
      attributes {
        value
        isPrimary
        attributeDefinition {
          id
          name
          type
        }
      }
      promotion {
        promotionalPrice {
          amount
          currency
        }
      }
    }
    page
    pageSize
    totalPages
  }
}
    `) as unknown as TypedDocumentString<SearchPageProductsQuery, SearchPageProductsQueryVariables>;
export const SeachPageFiltersDocument = new TypedDocumentString(`
    query SeachPageFilters($groupId: Int, $categoryId: Int, $subCategoryId: Int) {
  productFilters(
    groupId: $groupId
    categoryId: $categoryId
    subCategoryId: $subCategoryId
  ) {
    attributeDefinitionId
    type
    name
    values
  }
}
    `) as unknown as TypedDocumentString<SeachPageFiltersQuery, SeachPageFiltersQueryVariables>;
export const SeachPageProductHierarchyDocument = new TypedDocumentString(`
    query SeachPageProductHierarchy {
  menu {
    id
    name
    photo
    icon
    categories {
      id
      name
      subCategories {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SeachPageProductHierarchyQuery, SeachPageProductHierarchyQueryVariables>;
export const RootPageBestsellerProductsDocument = new TypedDocumentString(`
    query RootPageBestsellerProducts($limit: Int) {
  bestsellerProducts(limit: $limit) {
    id
    name
    price {
      amount
      currency
    }
    mainPhoto
    promotion {
      promotionalPrice {
        amount
        currency
      }
    }
  }
}
    `) as unknown as TypedDocumentString<RootPageBestsellerProductsQuery, RootPageBestsellerProductsQueryVariables>;
export const RootPageFeaturedProductsDocument = new TypedDocumentString(`
    query RootPageFeaturedProducts($limit: Int) {
  featuredProducts(limit: $limit) {
    id
    name
    price {
      amount
      currency
    }
    mainPhoto
    promotion {
      promotionalPrice {
        amount
        currency
      }
    }
  }
}
    `) as unknown as TypedDocumentString<RootPageFeaturedProductsQuery, RootPageFeaturedProductsQueryVariables>;
export const RootPagePromotionHightlightDocument = new TypedDocumentString(`
    query RootPagePromotionHightlight {
  promotionHighlightProduct {
    id
    name
    price {
      amount
      currency
    }
    mainPhoto
    promotion {
      promotionalPrice {
        amount
        currency
      }
    }
  }
}
    `) as unknown as TypedDocumentString<RootPagePromotionHightlightQuery, RootPagePromotionHightlightQueryVariables>;