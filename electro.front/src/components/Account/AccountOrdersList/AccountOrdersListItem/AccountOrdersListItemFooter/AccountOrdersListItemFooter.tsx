import { formatAmount } from "@/libs/Helpers/Formatters";
import { Money } from "@/libs/api-contract/rest-api-contract";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface AccountOrdersListItemFooterProps {
	totalPrice: Money;
	totalQuantity: number;
	orderId: string;
}

const AccountOrdersListItemFooter: FC<AccountOrdersListItemFooterProps> = ({ orderId, totalPrice, totalQuantity }) => {
	return (
		<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
			<Stack direction={"row"} alignItems={"baseline"} spacing={1}>
				<Typography fontWeight={500}>{formatAmount(totalPrice.amount!, totalPrice.currency!)}</Typography>
				<Typography variant="caption" color="textSecondary">{`(${totalQuantity} produktów)`}</Typography>
			</Stack>
			<Button LinkComponent={Link} href={`/account/orders/${orderId}`} variant="contained">
				Szczegóły
			</Button>
		</Stack>
	);
};

export default AccountOrdersListItemFooter;
