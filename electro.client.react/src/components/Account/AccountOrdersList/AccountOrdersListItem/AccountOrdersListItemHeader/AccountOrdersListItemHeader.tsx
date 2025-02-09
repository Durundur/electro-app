import { translateOrderStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { OrderStatus } from "@/libs/api-contract/api-contract";
import { Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AccountOrdersListItemHeaderProps {
	orderNumber: string;
	status: OrderStatus;
	createdAt: Date;
}

const AccountOrdersListItemHeader: FC<AccountOrdersListItemHeaderProps> = ({ orderNumber = "#2367", status, createdAt }) => {
	return (
		<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
			<Stack direction={"column"}>
				<Typography variant="caption">Zamówienie nr</Typography>
				<Typography fontWeight={500}>#2367</Typography>
			</Stack>
			<Stack direction={"row"}>
				<Chip label={translateOrderStatus(status)} color="primary" variant="outlined" />
			</Stack>
		</Stack>
	);
};

export default AccountOrdersListItemHeader;
