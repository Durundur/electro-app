import {
	ProductStatus as RestProductStatus,
	DeliveryMethod as RestDeliveryMethod,
	DeliveryStatus as RestDeliveryStatus,
	PaymentMethod as RestPaymentMethod,
	PaymentStatus as RestPaymentStatus,
	OrderStatus as RestOrderStatus,
	AttributeType as RestAttributeType,
	OpinionReactionType as RestOpinionReactionType,
} from "@/libs/api-contract/rest-api-contract";

import {
	ProductStatus as GraphQLProductStatus,
	DeliveryMethod as GraphQLDeliveryMethod,
	DeliveryStatus as GraphQLDeliveryStatus,
	PaymentMethod as GraphQLPaymentMethod,
	PaymentStatus as GraphQLPaymentStatus,
	OrderStatus as GraphQLOrderStatus,
	AttributeType as GraphQLAttributeType,
	OpinionReactionType as GraphQLOpinionReactionType,
} from "@/libs/api-contract/graphql-api-contract/graphql";

export const mapProductStatus = (status: GraphQLProductStatus): RestProductStatus => {
	const statusMap: Record<GraphQLProductStatus, RestProductStatus> = {
		[GraphQLProductStatus.Active]: RestProductStatus.Active,
		[GraphQLProductStatus.Draft]: RestProductStatus.Draft,
		[GraphQLProductStatus.Discontinued]: RestProductStatus.Discontinued,
	};
	return statusMap[status];
};

export const mapDeliveryMethod = (method: GraphQLDeliveryMethod): RestDeliveryMethod => {
	const methodMap: Record<GraphQLDeliveryMethod, RestDeliveryMethod> = {
		[GraphQLDeliveryMethod.CourierExpress]: RestDeliveryMethod.CourierExpress,
		[GraphQLDeliveryMethod.CourierStandard]: RestDeliveryMethod.CourierStandard,
		[GraphQLDeliveryMethod.CourierCashOnDelivery]: RestDeliveryMethod.CourierCashOnDelivery,
		[GraphQLDeliveryMethod.Locker]: RestDeliveryMethod.Locker,
		[GraphQLDeliveryMethod.PickupZabka]: RestDeliveryMethod.PickupZabka,
	};
	return methodMap[method];
};

export const mapDeliveryStatus = (status: GraphQLDeliveryStatus): RestDeliveryStatus => {
	const statusMap: Record<GraphQLDeliveryStatus, RestDeliveryStatus> = {
		[GraphQLDeliveryStatus.Pending]: RestDeliveryStatus.Pending,
		[GraphQLDeliveryStatus.Shipped]: RestDeliveryStatus.Shipped,
		[GraphQLDeliveryStatus.Delivered]: RestDeliveryStatus.Delivered,
		[GraphQLDeliveryStatus.Cancelled]: RestDeliveryStatus.Cancelled,
	};
	return statusMap[status];
};

export const mapPaymentMethod = (method: GraphQLPaymentMethod): RestPaymentMethod => {
	const methodMap: Record<GraphQLPaymentMethod, RestPaymentMethod> = {
		[GraphQLPaymentMethod.CreditCard]: RestPaymentMethod.CreditCard,
		[GraphQLPaymentMethod.InstantTransfer]: RestPaymentMethod.InstantTransfer,
		[GraphQLPaymentMethod.BankTransfer]: RestPaymentMethod.BankTransfer,
		[GraphQLPaymentMethod.GooglePay]: RestPaymentMethod.GooglePay,
		[GraphQLPaymentMethod.Blik]: RestPaymentMethod.Blik,
	};
	return methodMap[method];
};

export const mapPaymentStatus = (status: GraphQLPaymentStatus): RestPaymentStatus => {
	const statusMap: Record<GraphQLPaymentStatus, RestPaymentStatus> = {
		[GraphQLPaymentStatus.Pending]: RestPaymentStatus.Pending,
		[GraphQLPaymentStatus.Paid]: RestPaymentStatus.Paid,
		[GraphQLPaymentStatus.Failed]: RestPaymentStatus.Failed,
		[GraphQLPaymentStatus.Refunded]: RestPaymentStatus.Refunded,
	};
	return statusMap[status];
};

export const mapAttributeType = (type: GraphQLAttributeType): RestAttributeType => {
	const typeMap: Record<GraphQLAttributeType, RestAttributeType> = {
		[GraphQLAttributeType.Text]: RestAttributeType.Text,
		[GraphQLAttributeType.List]: RestAttributeType.List,
		[GraphQLAttributeType.Boolean]: RestAttributeType.Boolean,
	};
	return typeMap[type];
};

export const mapOpinionReactionTypeToGraphQL = (type: RestOpinionReactionType): GraphQLOpinionReactionType => {
    const typeMap: Record<RestOpinionReactionType, GraphQLOpinionReactionType> = {
        [RestOpinionReactionType.Like]: GraphQLOpinionReactionType.Like,
        [RestOpinionReactionType.Dislike]: GraphQLOpinionReactionType.Dislike,
    };
    return typeMap[type];
};

export const mapOpinionReactionTypeFromGraphQL = (type: GraphQLOpinionReactionType): RestOpinionReactionType => {
    const typeMap: Record<GraphQLOpinionReactionType, RestOpinionReactionType> = {
        [GraphQLOpinionReactionType.Like]: RestOpinionReactionType.Like,
        [GraphQLOpinionReactionType.Dislike]: RestOpinionReactionType.Dislike,
    };
    return typeMap[type];
};
