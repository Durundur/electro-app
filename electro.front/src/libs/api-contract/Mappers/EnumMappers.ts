import {
	ProductStatus as RestProductStatus,
	DeliveryMethod as RestDeliveryMethod,
	DeliveryStatus as RestDeliveryStatus,
	PaymentMethod as RestPaymentMethod,
	PaymentStatus as RestPaymentStatus,
	OrderStatus as RestOrderStatus,
	AttributeType as RestAttributeType,
	OpinionReactionType as RestOpinionReactionType,
	RecipientType as RestRecipientType,

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
	RecipientType as GraphQLRecipientType,
} from "@/libs/api-contract/graphql-api-contract/graphql";

export const mapOrderStatusFromGraphQL = (status: GraphQLOrderStatus): RestOrderStatus => {
	const statusMap: Record<GraphQLOrderStatus, RestOrderStatus> = {
		[GraphQLOrderStatus.Created]: RestOrderStatus.Created,
		[GraphQLOrderStatus.Paid]: RestOrderStatus.Paid,
		[GraphQLOrderStatus.Processing]: RestOrderStatus.Processing,
		[GraphQLOrderStatus.Shipped]: RestOrderStatus.Shipped,
		[GraphQLOrderStatus.Completed]: RestOrderStatus.Completed,
		[GraphQLOrderStatus.Cancelled]: RestOrderStatus.Cancelled,
	};
	return statusMap[status];
};

export const mapOrderStatusToGraphQL = (status: RestOrderStatus): GraphQLOrderStatus => {
	const statusMap: Record<RestOrderStatus, GraphQLOrderStatus> = {
		[RestOrderStatus.Created]: GraphQLOrderStatus.Created,
		[RestOrderStatus.Paid]: GraphQLOrderStatus.Paid,
		[RestOrderStatus.Processing]: GraphQLOrderStatus.Processing,
		[RestOrderStatus.Shipped]: GraphQLOrderStatus.Shipped,
		[RestOrderStatus.Completed]: GraphQLOrderStatus.Completed,
		[RestOrderStatus.Cancelled]: GraphQLOrderStatus.Cancelled,
	};
	return statusMap[status];
};

export const mapProductStatusFromGraphQL = (status: GraphQLProductStatus): RestProductStatus => {
	const statusMap: Record<GraphQLProductStatus, RestProductStatus> = {
		[GraphQLProductStatus.Active]: RestProductStatus.Active,
		[GraphQLProductStatus.Draft]: RestProductStatus.Draft,
		[GraphQLProductStatus.Discontinued]: RestProductStatus.Discontinued,
	};
	return statusMap[status];
};

export const mapProductStatusToGraphQL = (status: RestProductStatus): GraphQLProductStatus => {
	const statusMap: Record<RestProductStatus, GraphQLProductStatus> = {
		[RestProductStatus.Active]: GraphQLProductStatus.Active,
		[RestProductStatus.Draft]: GraphQLProductStatus.Draft,
		[RestProductStatus.Discontinued]: GraphQLProductStatus.Discontinued,
	};
	return statusMap[status];
};

export const mapDeliveryMethodFromGraphQL = (method: GraphQLDeliveryMethod): RestDeliveryMethod => {
	const methodMap: Record<GraphQLDeliveryMethod, RestDeliveryMethod> = {
		[GraphQLDeliveryMethod.CourierExpress]: RestDeliveryMethod.CourierExpress,
		[GraphQLDeliveryMethod.CourierStandard]: RestDeliveryMethod.CourierStandard,
		[GraphQLDeliveryMethod.CourierCashOnDelivery]: RestDeliveryMethod.CourierCashOnDelivery,
		[GraphQLDeliveryMethod.Locker]: RestDeliveryMethod.Locker,
		[GraphQLDeliveryMethod.PickupZabka]: RestDeliveryMethod.PickupZabka,
	};
	return methodMap[method];
};

export const mapDeliveryMethodToGraphQL = (method: RestDeliveryMethod): GraphQLDeliveryMethod => {
	const methodMap: Record<RestDeliveryMethod, GraphQLDeliveryMethod> = {
		[RestDeliveryMethod.CourierExpress]: GraphQLDeliveryMethod.CourierExpress,
		[RestDeliveryMethod.CourierStandard]: GraphQLDeliveryMethod.CourierStandard,
		[RestDeliveryMethod.CourierCashOnDelivery]: GraphQLDeliveryMethod.CourierCashOnDelivery,
		[RestDeliveryMethod.Locker]: GraphQLDeliveryMethod.Locker,
		[RestDeliveryMethod.PickupZabka]: GraphQLDeliveryMethod.PickupZabka,
	};
	return methodMap[method];
};

export const mapDeliveryStatusFromGraphQL = (status: GraphQLDeliveryStatus): RestDeliveryStatus => {
	const statusMap: Record<GraphQLDeliveryStatus, RestDeliveryStatus> = {
		[GraphQLDeliveryStatus.Pending]: RestDeliveryStatus.Pending,
		[GraphQLDeliveryStatus.Shipped]: RestDeliveryStatus.Shipped,
		[GraphQLDeliveryStatus.Delivered]: RestDeliveryStatus.Delivered,
		[GraphQLDeliveryStatus.Cancelled]: RestDeliveryStatus.Cancelled,
	};
	return statusMap[status];
};

export const mapPaymentMethodFromGraphQL = (method: GraphQLPaymentMethod): RestPaymentMethod => {
	const methodMap: Record<GraphQLPaymentMethod, RestPaymentMethod> = {
		[GraphQLPaymentMethod.CreditCard]: RestPaymentMethod.CreditCard,
		[GraphQLPaymentMethod.InstantTransfer]: RestPaymentMethod.InstantTransfer,
		[GraphQLPaymentMethod.BankTransfer]: RestPaymentMethod.BankTransfer,
		[GraphQLPaymentMethod.GooglePay]: RestPaymentMethod.GooglePay,
		[GraphQLPaymentMethod.Blik]: RestPaymentMethod.Blik,
	};
	return methodMap[method];
};

export const mapPaymentMethodToGraphQL = (method: RestPaymentMethod): GraphQLPaymentMethod => {
	const methodMap: Record<RestPaymentMethod, GraphQLPaymentMethod> = {
		[RestPaymentMethod.CreditCard]: GraphQLPaymentMethod.CreditCard,
		[RestPaymentMethod.InstantTransfer]: GraphQLPaymentMethod.InstantTransfer,
		[RestPaymentMethod.BankTransfer]: GraphQLPaymentMethod.BankTransfer,
		[RestPaymentMethod.GooglePay]: GraphQLPaymentMethod.GooglePay,
		[RestPaymentMethod.Blik]: GraphQLPaymentMethod.Blik,
	};
	return methodMap[method];
};

export const mapPaymentStatusFromGraphQL = (status: GraphQLPaymentStatus): RestPaymentStatus => {
	const statusMap: Record<GraphQLPaymentStatus, RestPaymentStatus> = {
		[GraphQLPaymentStatus.Pending]: RestPaymentStatus.Pending,
		[GraphQLPaymentStatus.Paid]: RestPaymentStatus.Paid,
		[GraphQLPaymentStatus.Failed]: RestPaymentStatus.Failed,
		[GraphQLPaymentStatus.Refunded]: RestPaymentStatus.Refunded,
	};
	return statusMap[status];
};

export const mapAttributeTypeFromGraphQL = (type: GraphQLAttributeType): RestAttributeType => {
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

export const mapRecipientTypeFromGraphQL = (type: GraphQLRecipientType): RestRecipientType => {
	const typeMap: Record<GraphQLRecipientType, RestRecipientType> = {
		[GraphQLRecipientType.Company]: RestRecipientType.Company,
		[GraphQLRecipientType.Personal]: RestRecipientType.Personal,
	};
	return typeMap[type];
};

export const mapRecipientTypeToGraphQL = (type: RestRecipientType): GraphQLRecipientType => {
	const typeMap: Record<RestRecipientType, GraphQLRecipientType> = {
		[RestRecipientType.Company]: GraphQLRecipientType.Company,
		[RestRecipientType.Personal]: GraphQLRecipientType.Personal,
	};
	return typeMap[type];
};
