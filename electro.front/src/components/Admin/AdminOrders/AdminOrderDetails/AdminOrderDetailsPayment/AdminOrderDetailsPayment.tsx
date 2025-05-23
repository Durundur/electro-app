import { translatePaymentMethod } from "@/libs/Helpers/Translations/OrdersTranslations";
import { Payment } from "@/libs/api-contract/rest-api-contract";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AdminOrderDetailsPaymentProps {
	payment: Payment;
}

const AdminOrderDetailsPayment: FC<AdminOrderDetailsPaymentProps> = ({ payment }) => {
	return (
		<Stack>
			<Typography fontWeight={500}>Płatność</Typography>
			<Typography variant="body2">Sposób płatności: {translatePaymentMethod(payment.method!)}</Typography>
		</Stack>
	);
};

export default AdminOrderDetailsPayment;
