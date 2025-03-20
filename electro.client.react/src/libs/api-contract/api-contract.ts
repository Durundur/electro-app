//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.1.0.0 (NJsonSchema v11.0.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming



export interface AttributeDefinitionCommand {
    id?: string | undefined;
    name?: string | undefined;
    type?: AttributeType;
    isRequired?: boolean;
    description?: string | undefined;
    isFilterable?: boolean;
}

export interface AttributeDefinitionResult {
    id?: string;
    name?: string | undefined;
    type?: AttributeType;
    isRequired?: boolean;
    description?: string | undefined;
    isFilterable?: boolean;
}

export enum AttributeType {
    Text = "Text",
    List = "List",
    Boolean = "Boolean",
}

export interface CreateOpinionCommand {
    productId?: string;
    content?: string | undefined;
    rating?: number;
    authorDisplayName?: string | undefined;
}

export interface CreateOpinionReactionResult {
    reactionType?: OpinionReactionType;
    likesCount?: number;
    dislikesCount?: number;
}

export interface CreateOpinionResult {
    id?: string;
    content?: string | undefined;
    rating?: number;
    createdAt?: Date;
    authorDisplayName?: string | undefined;
}

export interface CreateOrUpdateCategoryCommand {
    id?: number | undefined;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    groupId?: number;
    attributes?: AttributeDefinitionCommand[] | undefined;
}

export interface CreateOrUpdateCategoryResult {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    groupId?: number | undefined;
    createdAt?: Date;
    modifiedAt?: Date;
    attributes?: AttributeDefinitionResult[] | undefined;
}

export interface CreateOrUpdateGroupCommand {
    id?: number | undefined;
    name?: string | undefined;
    icon?: string | undefined;
    photo?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    attributes?: AttributeDefinitionCommand[] | undefined;
}

export interface CreateOrUpdateGroupResult {
    id?: number;
    name?: string | undefined;
    icon?: string | undefined;
    photo?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    createdAt?: Date;
    modifiedAt?: Date;
    attributes?: AttributeDefinitionResult[] | undefined;
}

export interface CreateOrUpdateProductCommand {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    amount?: number;
    currency?: string | undefined;
    photos?: string[] | undefined;
    active?: boolean;
    stockQuantity?: number;
    status?: string | undefined;
    groupId?: number | undefined;
    categoryId?: number | undefined;
    subCategoryId?: number | undefined;
    attributes?: CreateOrUpdateProductCommandAttributeDefinitionValue[] | undefined;
}

export interface CreateOrUpdateProductCommandAttributeDefinitionValue {
    id?: string;
    value?: string | undefined;
    isPrimary?: boolean;
}

export interface CreateOrUpdateProductResult {
    id?: string;
    name?: string | undefined;
    description?: string | undefined;
    amount?: number;
    currency?: string | undefined;
    photos?: string[] | undefined;
    status?: string | undefined;
    groupId?: number | undefined;
    categoryId?: number | undefined;
    subCategoryId?: number | undefined;
    attributes?: ProductAttributeResult[] | undefined;
}

export interface CreateOrUpdateRecipientCommand {
    id?: string | undefined;
    firstName?: string | undefined;
    surname?: string | undefined;
    companyName?: string | undefined;
    taxIdentificationNumber?: string | undefined;
    type?: RecipientType;
    phoneNumber?: string | undefined;
    street?: string | undefined;
    houseNumber?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
}

export interface CreateOrUpdateRecipientResult {
    id?: string;
    firstName?: string | undefined;
    surname?: string | undefined;
    companyName?: string | undefined;
    taxIdentificationNumber?: string | undefined;
    type?: RecipientType;
    phoneNumber?: string | undefined;
    street?: string | undefined;
    houseNumber?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
}

export interface CreateOrUpdateSubCategoryCommand {
    id?: number | undefined;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    categoryId?: number;
    attributes?: AttributeDefinitionCommand[] | undefined;
}

export interface CreateOrUpdateSubCategoryResult {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    categoryId?: number | undefined;
    createdAt?: Date;
    modifiedAt?: Date;
    attributes?: AttributeDefinitionResult[] | undefined;
}

export interface CreateOrderCommand {
    products?: CreateOrderCommandOrderProduct[] | undefined;
    paymentMethod?: PaymentMethod;
    deliveryMethod?: DeliveryMethod;
    recipient?: CreateOrderCommandRecipient;
}

export interface CreateOrderCommandOrderProduct {
    productId?: string;
    quantity?: number;
    price?: Money;
}

export interface CreateOrderCommandRecipient {
    firstName?: string | undefined;
    surname?: string | undefined;
    companyName?: string | undefined;
    taxIdentificationNumber?: string | undefined;
    type?: RecipientType;
    phoneNumber?: string | undefined;
    street?: string | undefined;
    houseNumber?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
}

export interface CreateOrderResult {
    orderId?: string;
    status?: OrderStatus;
}

export interface Delivery {
    readonly id?: string;
    method?: DeliveryMethod;
    cost?: Money;
    readonly trackingNumber?: string | undefined;
    status?: DeliveryStatus;
    readonly shippedAt?: Date | undefined;
    readonly deliveredAt?: Date | undefined;
}

export enum DeliveryMethod {
    CourierExpress = "CourierExpress",
    CourierStandard = "CourierStandard",
    CourierCashOnDelivery = "CourierCashOnDelivery",
    Locker = "Locker",
    PickupZabka = "PickupZabka",
}

export enum DeliveryStatus {
    Pending = "Pending",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
}

export interface GetAllProductHierarchyCategory {
    id?: number;
    name?: string | undefined;
    subCategories?: GetAllProductHierarchySubCategory[] | undefined;
}

export interface GetAllProductHierarchyGroup {
    id?: number;
    name?: string | undefined;
    photo?: string | undefined;
    icon?: string | undefined;
    categories?: GetAllProductHierarchyCategory[] | undefined;
}

export interface GetAllProductHierarchyResult {
    groups?: GetAllProductHierarchyGroup[] | undefined;
}

export interface GetAllProductHierarchySubCategory {
    id?: number;
    name?: string | undefined;
}

export interface GetAttributesDefinitionsResult {
    attributesDefinitions?: AttributeDefinitionResult[] | undefined;
}

export interface GetBestsellerProductsResult {
    products?: GetBestsellerProductsResultProduct[] | undefined;
}

export interface GetBestsellerProductsResultProduct {
    id?: string;
    name?: string | undefined;
    amount?: number;
    currency?: string | undefined;
    photo?: string | undefined;
}

export interface GetCartResult {
    id?: string;
    totalQuantity?: number;
    totalPrice?: Money;
    products?: GetCartResultProduct[] | undefined;
}

export interface GetCartResultProduct {
    productId?: string;
    quantity?: number;
    price?: Money;
    name?: string | undefined;
    photo?: string | undefined;
}

export interface GetCategoryResult {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    groupId?: number | undefined;
    createdAt?: Date;
    modifiedAt?: Date;
    attributes?: AttributeDefinitionResult[] | undefined;
}

export interface GetGroupResult {
    id?: number;
    name?: string | undefined;
    photo?: string | undefined;
    icon?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    createdAt?: Date;
    modifiedAt?: Date;
    attributes?: AttributeDefinitionResult[] | undefined;
}

export interface GetMenuCategory {
    id?: number;
    name?: string | undefined;
    subCategories?: GetMenuSubCategory[] | undefined;
}

export interface GetMenuGroup {
    id?: number;
    name?: string | undefined;
    photo?: string | undefined;
    icon?: string | undefined;
    categories?: GetMenuCategory[] | undefined;
}

export interface GetMenuResult {
    groups?: GetMenuGroup[] | undefined;
}

export interface GetMenuSubCategory {
    id?: number;
    name?: string | undefined;
}

export interface GetOpinionResult {
    id?: string;
    content?: string | undefined;
    rating?: number;
    createdAt?: Date;
    authorDisplayName?: string | undefined;
    userReaction?: OpinionReactionType;
    likesCount?: number;
    dislikesCount?: number;
}

export interface GetOrderDetailsResult {
    id?: string;
    number?: number;
    status?: OrderStatus;
    products?: GetOrderDetailsResultProduct[] | undefined;
    payment?: Payment;
    delivery?: Delivery;
    recipient?: Recipient;
    totalPrice?: Money;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GetOrderDetailsResultProduct {
    id?: string;
    productId?: string;
    name?: string | undefined;
    photo?: string | undefined;
    quantity?: number;
    price?: Money;
    totalPrice?: Money;
}

export interface GetOrdersResult {
    orders?: GetOrdersResultOrder[] | undefined;
    pageCount?: number;
    pageSize?: number;
    page?: number;
}

export interface GetOrdersResultOrder {
    id?: string;
    totalPrice?: Money;
    status?: OrderStatus;
    createdAt?: Date;
}

export interface GetProductCatalogResult {
    products?: GetProductCatalogResultProduct[] | undefined;
    pageCount?: number;
    pageSize?: number;
    page?: number;
}

export interface GetProductCatalogResultProduct {
    id?: string;
    name?: string | undefined;
    price?: Money;
    photo?: string | undefined;
    status?: ProductStatus;
    stockQuantity?: number;
}

export interface GetProductOpinionsResult {
    items?: GetProductOpinionsResultOpinion[] | undefined;
    page?: number;
    pageSize?: number;
    readonly totalPages?: number;
}

export interface GetProductOpinionsResultOpinion {
    id?: string;
    content?: string | undefined;
    rating?: number;
    createdAt?: Date;
    authorDisplayName?: string | undefined;
    reactionType?: OpinionReactionType;
    likesCount?: number;
    dislikesCount?: number;
}

export interface GetProductOpinionsStatsResult {
    stats?: OpinionsStatsItem[] | undefined;
}

export interface GetProductResult {
    id?: string;
    name?: string | undefined;
    description?: string | undefined;
    amount?: number;
    currency?: string | undefined;
    photos?: string[] | undefined;
    status?: ProductStatus;
    groupId?: number | undefined;
    categoryId?: number | undefined;
    subCategoryId?: number | undefined;
    active?: boolean;
    stockQuantity?: number;
    averageOpinionRating?: number;
    opinionCount?: number;
    attributes?: ProductAttributeResult[] | undefined;
}

export interface GetRecipientsResult {
    recipients?: GetRecipientsResultItem[] | undefined;
}

export interface GetRecipientsResultItem {
    id?: string;
    firstName?: string | undefined;
    surname?: string | undefined;
    companyName?: string | undefined;
    taxIdentificationNumber?: string | undefined;
    type?: RecipientType;
    phoneNumber?: string | undefined;
    street?: string | undefined;
    houseNumber?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
}

export interface GetSearchFiltersResult {
    filters?: GetSearchFiltersResultElement[] | undefined;
}

export interface GetSearchFiltersResultElement {
    attributeDefinitionId?: string;
    type?: AttributeType;
    name?: string | undefined;
    values?: string[] | undefined;
}

export interface GetSearchProductsResult {
    items?: GetSearchProductsResultProduct[] | undefined;
    page?: number;
    pageSize?: number;
    readonly totalPages?: number;
}

export interface GetSearchProductsResultProduct {
    id?: string;
    name?: string | undefined;
    amount?: number;
    currency?: string | undefined;
    photo?: string | undefined;
    status?: ProductStatus;
    averageOpinionRating?: number;
    opinionCount?: number;
    attributes?: ProductAttributeResult[] | undefined;
}

export interface GetSimilarProductsResult {
    products?: GetSimilarProductsResultProduct[] | undefined;
}

export interface GetSimilarProductsResultProduct {
    id?: string;
    name?: string | undefined;
    amount?: number;
    currency?: string | undefined;
    photo?: string | undefined;
}

export interface GetSubCategoryResult {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean;
    displayOrder?: number;
    categoryId?: number | undefined;
    createdAt?: Date;
    modifiedAt?: Date;
    attributes?: AttributeDefinitionResult[] | undefined;
}

export interface GetUserOrderDetailsResult {
    id?: string;
    number?: number;
    status?: OrderStatus;
    products?: GetUserOrderDetailsResultProduct[] | undefined;
    payment?: Payment;
    delivery?: Delivery;
    recipient?: Recipient;
    totalPrice?: Money;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GetUserOrderDetailsResultProduct {
    id?: string;
    productId?: string;
    name?: string | undefined;
    photo?: string | undefined;
    quantity?: number;
    price?: Money;
    totalPrice?: Money;
}

export interface GetUserOrdersResult {
    orders?: GetUserOrdersResultOrder[] | undefined;
    pageCount?: number;
    pageSize?: number;
    page?: number;
}

export interface GetUserOrdersResultOrder {
    id?: string;
    number?: number;
    totalPrice?: Money;
    status?: OrderStatus;
    products?: GetUserOrdersResultOrderProduct[] | undefined;
    createdAt?: Date;
}

export interface GetUserOrdersResultOrderProduct {
    id?: string;
    quantity?: number;
    price?: Money;
    name?: string | undefined;
    photo?: string | undefined;
}

export interface LoginUserCommand {
    email?: string | undefined;
    password?: string | undefined;
}

export interface LoginUserErrorResult {
    success?: boolean;
    message?: string | undefined;
}

export interface LoginUserSuccessResult {
    success?: boolean;
    message?: string | undefined;
    userId?: string;
    token?: string | undefined;
    refreshToken?: string | undefined;
    refreshTokenExpiry?: Date;
    roles?: string[] | undefined;
}

export interface Money {
    amount?: number;
    currency?: string | undefined;
}

export enum OpinionReactionType {
    Like = "Like",
    Dislike = "Dislike",
}

export interface OpinionsStatsItem {
    rating?: number;
    count?: number;
}

export enum OrderStatus {
    Created = "Created",
    Paid = "Paid",
    Processing = "Processing",
    Shipped = "Shipped",
    Completed = "Completed",
    Cancelled = "Cancelled",
}

export interface Payment {
    readonly id?: string;
    method?: PaymentMethod;
    cost?: Money;
    status?: PaymentStatus;
    readonly paidAt?: Date | undefined;
}

export enum PaymentMethod {
    CreditCard = "CreditCard",
    InstantTransfer = "InstantTransfer",
    BankTransfer = "BankTransfer",
    GooglePay = "GooglePay",
    Blik = "Blik",
}

export enum PaymentStatus {
    Pending = "Pending",
    Paid = "Paid",
    Failed = "Failed",
    Refunded = "Refunded",
}

export interface ProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;
}

export interface ProductAttributeResult {
    id?: string;
    name?: string | undefined;
    type?: AttributeType;
    value?: string | undefined;
    isPrimary?: boolean;
}

export enum ProductStatus {
    Draft = "Draft",
    Active = "Active",
    Inactive = "Inactive",
    Discontinued = "Discontinued",
}

export interface Recipient {
    readonly firstName?: string | undefined;
    readonly surname?: string | undefined;
    readonly companyName?: string | undefined;
    readonly taxIdentificationNumber?: string | undefined;
    type?: RecipientType;
    readonly phoneNumber?: string | undefined;
    readonly street?: string | undefined;
    readonly houseNumber?: string | undefined;
    readonly postalCode?: string | undefined;
    readonly city?: string | undefined;
}

export enum RecipientType {
    Personal = "Personal",
    Company = "Company",
}

export interface RefreshTokenCommand {
    refreshToken?: string | undefined;
    token?: string | undefined;
}

export interface RefreshTokenResult {
    userId?: string;
    roles?: string[] | undefined;
    token?: string | undefined;
    refreshToken?: string | undefined;
    refreshTokenExpiry?: Date;
    success?: boolean;
    message?: string | undefined;
}

export interface RegisterUserCommand {
    email?: string | undefined;
    password?: string | undefined;
}

export interface RegisterUserErrorResult {
    success?: boolean;
    message?: string | undefined;
}

export interface RegisterUserSuccessResult {
    success?: boolean;
    message?: string | undefined;
    userId?: string;
    token?: string | undefined;
    refreshToken?: string | undefined;
    refreshTokenExpiry?: Date;
    roles?: string[] | undefined;
}

export interface UpdateOrderCommand {
    orderId?: string;
    status?: OrderStatus;
    trackingNumber?: string | undefined;
    recipient?: UpdateOrderCommandRecipient;
}

export interface UpdateOrderCommandRecipient {
    firstName?: string | undefined;
    surname?: string | undefined;
    companyName?: string | undefined;
    taxIdentificationNumber?: string | undefined;
    type?: RecipientType;
    phoneNumber?: string | undefined;
    street?: string | undefined;
    houseNumber?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
}

export interface UpdateOrderResult {
    id?: string;
    number?: number;
    status?: OrderStatus;
    products?: UpdateOrderResultProduct[] | undefined;
    payment?: Payment;
    delivery?: Delivery;
    recipient?: Recipient;
    totalPrice?: Money;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UpdateOrderResultProduct {
    id?: string;
    productId?: string;
    name?: string | undefined;
    photo?: string | undefined;
    quantity?: number;
    price?: Money;
    totalPrice?: Money;
}

export interface ValidateCartCommand {
    products?: ValidateCartCommandProduct[] | undefined;
}

export interface ValidateCartCommandProduct {
    productId?: string;
    quantity?: number;
    price?: Money;
}

export interface ValidateCartResult {
    id?: string | undefined;
    totalQuantity?: number;
    totalPrice?: Money;
    products?: ValidateCartResultProduct[] | undefined;
    errors?: string[] | undefined;
}

export interface ValidateCartResultProduct {
    productId?: string;
    quantity?: number;
    price?: Money;
    name?: string | undefined;
    photo?: string | undefined;
}