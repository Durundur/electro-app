import { translateOrderStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { OrderStatus } from "@/libs/api-contract/api-contract";
import { Button, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AccountOrdersListItemHeaderProps {
	orderNumber: number;
	status: OrderStatus;
	createdAt: Date;
}

const AccountOrdersListItemHeader: FC<AccountOrdersListItemHeaderProps> = ({ orderNumber, status, createdAt }) => {
	const getStatusButton = (status: OrderStatus) => {
		const getStatusColor = (status: OrderStatus) => {
			switch (status) {
				case OrderStatus.Created:
					return "inherit";
				case OrderStatus.Processing:
					return "info";
				case OrderStatus.Paid:
					return "primary";
				case OrderStatus.Shipped:
					return "warning";
				case OrderStatus.Completed:
					return "success";
				case OrderStatus.Cancelled:
					return "error";
				default:
					return "inherit";
			}
		};

		return (
			<Button variant="contained" color={getStatusColor(status)}>
				{translateOrderStatus(status)}
			</Button>
		);
	};

	return (
		<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
			<Stack direction={"column"}>
				<Typography variant="body2">Zamówienie nr</Typography>
				<Typography variant="h6">#{orderNumber}</Typography>
			</Stack>
			<Stack direction={"row"} alignItems={"baseline"} spacing={2}>
				<Typography>{new Date(createdAt).toLocaleDateString()}</Typography>
				{getStatusButton(status)}
			</Stack>
		</Stack>
	);
};

export default AccountOrdersListItemHeader;
