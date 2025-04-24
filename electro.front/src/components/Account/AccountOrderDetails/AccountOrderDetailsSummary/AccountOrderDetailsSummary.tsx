import { formatAmount } from "@/libs/Helpers/Formatters";
import { Money } from "@/libs/api-contract/rest-api-contract";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AccountOrderDetailsSummaryProps {
	totalCost: Money;
	totalProductsCost: Money;
	deliveryCost: Money;
	paymentCost: Money;
}

const AccountOrderDetailsSummary: FC<AccountOrderDetailsSummaryProps> = ({ deliveryCost, paymentCost, totalProductsCost, totalCost }) => {
	return (
		<Stack spacing={1}>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<Typography variant="body2">Wartość produktów</Typography>
				<Typography fontWeight={500} variant="body2">
					{formatAmount(totalProductsCost.amount!, totalProductsCost.currency!)}
				</Typography>
			</Stack>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<Typography variant="body2">Dostawa</Typography>
				<Typography fontWeight={500} variant="body2">
					{formatAmount(deliveryCost.amount!, deliveryCost.currency!)}
				</Typography>
			</Stack>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<Typography variant="body2">Płatność</Typography>
				<Typography fontWeight={500} variant="body2">
					{formatAmount(paymentCost.amount!, paymentCost.currency!)}
				</Typography>
			</Stack>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<Typography>Do zapłaty</Typography>
				<Typography variant="h6" fontWeight={500}>
					{formatAmount(totalCost.amount!, totalCost.currency!)}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default AccountOrderDetailsSummary;
