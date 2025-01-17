import { Payment } from "@/libs/api-contract/api-contract";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AdminOrderDetailsPaymentProps {
	payment: Payment;
}

const AdminOrderDetailsPayment: FC<AdminOrderDetailsPaymentProps> = ({ payment }) => {
	return (
		<Stack>
			<Typography fontWeight={500} variant="subtitle1">
				Płatność
			</Typography>
			<Typography variant="body2">Sposób płatności: {payment.method}</Typography>
		</Stack>
	);
};

export default AdminOrderDetailsPayment;
