import { FC } from "react";
import CheckoutReceiverSection from "./CheckoutReceiverSection/CheckoutReceiverSection";
import { Stack } from "@mui/material";
import CheckoutPaymentSection from "./CheckoutPaymentSection/CheckoutPaymentSection";
import CheckoutDeliverySection from "./CheckoutDeliverySection/CheckoutDeliverySection";

const CartCheckoutSections: FC = () => {
	return (
		<Stack spacing={2}>
			<CheckoutReceiverSection />
			<CheckoutPaymentSection />
			<CheckoutDeliverySection />
		</Stack>
	);
};

export default CartCheckoutSections;
