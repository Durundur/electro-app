import { translatePaymentMethod } from "@/libs/Helpers/Translations/OrdersTranslations";
import { Payment } from "@/libs/api-contract/rest-api-contract";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AccountOrderDetailsPaymentProps {
	payment: Payment;
}

const AccountOrderDetailsPayment: FC<AccountOrderDetailsPaymentProps> = ({ payment }) => {
	return (
		<Stack>
			<Typography fontWeight={500}>Płatność</Typography>
			<Typography variant="body2">Sposób płatności: {translatePaymentMethod(payment.method!)}</Typography>
		</Stack>
	);
};

export default AccountOrderDetailsPayment;
