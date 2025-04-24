import { GetUserOrdersResultOrder } from "@/libs/api-contract/rest-api-contract";
import { Card, CardContent, Stack } from "@mui/material";
import { FC } from "react";
import AccountOrdersListItemHeader from "./AccountOrdersListItemHeader/AccountOrdersListItemHeader";
import AccountOrdersListItemFooter from "./AccountOrdersListItemFooter/AccountOrdersListItemFooter";
import AccountOrdersListItemProducts from "./AccountOrdersListItemProducts/AccountOrdersListItemProducts";

interface AccountOrdersListItemProps {
	order: GetUserOrdersResultOrder;
}

const AccountOrdersListItem: FC<AccountOrdersListItemProps> = ({ order }) => {
	const totalProductsQuantity = order.products?.reduce((acc, item) => (acc += item.quantity ?? 0), 0);

	return (
		<Card>
			<CardContent>
				<Stack direction={"column"} spacing={2}>
					<AccountOrdersListItemHeader orderNumber={order.number!} status={order.status!} createdAt={order.createdAt!}></AccountOrdersListItemHeader>
					<AccountOrdersListItemProducts products={order.products ?? []}></AccountOrdersListItemProducts>
					<AccountOrdersListItemFooter orderId={order.id!} totalPrice={order.totalPrice!} totalQuantity={totalProductsQuantity!}></AccountOrdersListItemFooter>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default AccountOrdersListItem;
