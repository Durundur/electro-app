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
  attributes: Array<AttributeValue>;
  category?: Maybe<Category>;
  description: Scalars['String']['output'];
  effectivePrice: Money;
  group?: Maybe<Group>;
  id: Scalars['UUID']['output'];
  isAvailableToBuy: Scalars['Boolean']['output'];
  isVisible: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
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

export type ProductPromotion = {
  __typename?: 'ProductPromotion';
  endDate: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isValid: Scalars['Boolean']['output'];
  productId: Scalars['UUID']['output'];
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
