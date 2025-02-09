import { Grid2 } from "@mui/material";
import { FC } from "react";
import AccountOrdersListItem from "./AccountOrdersListItem/AccountOrdersListItem";
import { useSelector } from "@/libs/Store";

interface AccountOrdersListProps {}

const AccountOrdersList: FC<AccountOrdersListProps> = () => {
	const accountOrders = useSelector((store) => store.AccountStore.list.data?.orders);

	return (
		<Grid2 container columnSpacing={2} rowSpacing={2}>
			{accountOrders?.map((order) => (
				<Grid2 size={{ xs: 12, sm: 6 }} key={order.id}>
					<AccountOrdersListItem order={order}></AccountOrdersListItem>
				</Grid2>
			))}
		</Grid2>
	);
};

export default AccountOrdersList;
