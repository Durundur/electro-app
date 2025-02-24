import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AccountOrderDetailsHeaderProps {
	orderId: string;
	orderNumber: number;
}

const AccountOrderDetailsHeader: FC<AccountOrderDetailsHeaderProps> = ({ orderId, orderNumber }) => {
	return (
		<Stack>
			<Typography variant={"h6"}>Szczegóły zamówienia</Typography>
			<Typography>#{orderNumber}</Typography>
		</Stack>
	);
};

export default AccountOrderDetailsHeader;
