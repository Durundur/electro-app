import { translateOrderStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { OrderStatus } from "@/libs/api-contract/api-contract";
import { Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AccountOrdersListItemHeaderProps {
	orderNumber: number;
	status: OrderStatus;
	createdAt: Date;
}

const AccountOrdersListItemHeader: FC<AccountOrdersListItemHeaderProps> = ({ orderNumber, status, createdAt }) => {
	return (
		<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
			<Stack direction={"column"}>
				<Typography variant="body2">Zamówienie nr</Typography>
				<Typography variant="h6">#{orderNumber}</Typography>
			</Stack>
			<Stack direction={"row"}>
				<Chip label={translateOrderStatus(status)} color="primary" variant="outlined" />
			</Stack>
		</Stack>
	);
};

export default AccountOrdersListItemHeader;
