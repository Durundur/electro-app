import { formatAmount } from "@/libs/Helpers/Formatters";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { FC } from "react";
import CartCheckoutSummaryProductsList from "./CartCheckoutSummaryProductsList/CartCheckoutSummaryProductsList";
import { useDispatch, useSelector } from "@/libs/Store";
import { setDeliveryOptionValidation, setPaymentOptionValidation, setRecipientOptionValidation } from "@/libs/Cart/slice";
import { useRouter } from "next/navigation";

const CartCheckoutSummary: FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const cartStoreSelector = useSelector((store) => store.CartStore.cart);
	const paymentOptionSelector = useSelector((store) => store.CartStore.checkout.paymentOption);
	const deliveryOptionSelector = useSelector((store) => store.CartStore.checkout.deliveryOption);
	const recipientOptionSelector = useSelector((store) => store.CartStore.checkout.recipientOption);

	const paymentAmount = paymentOptionSelector?.amount ?? 0;
	const paymentCurrency = paymentOptionSelector?.currency ?? "PLN";

	const deliveryAmount = deliveryOptionSelector?.amount ?? 0;
	const deliveryCurrency = deliveryOptionSelector?.currency ?? "PLN";

	const totalQuantity = cartStoreSelector.data?.totalQuantity ?? 0;
	const totalProductsAmount = cartStoreSelector.data?.totalPrice?.amount ?? 0;
	const totalProductsAmountCurrency = cartStoreSelector.data?.totalPrice?.currency ?? "PLN";

	const totalAmount = paymentAmount + deliveryAmount + totalProductsAmount;
	const totalAmountCurrency = "PLN";

	const handleNextStepClick = () => {
		const validations = [
			{ condition: !!(paymentOptionSelector && paymentOptionSelector.value), action: setPaymentOptionValidation },
			{ condition: !!(deliveryOptionSelector && deliveryOptionSelector.value), action: setDeliveryOptionValidation },
			{ condition: !!(recipientOptionSelector && recipientOptionSelector.id), action: setRecipientOptionValidation },
		];

		let allValid = true;
		validations.forEach(({ condition, action }) => {
			dispatch(action(condition));
			if (!condition) {
				allValid = false;
			}
		});

		if (allValid) {
			router.prefetch("/cart/checkout/confirm");
		}
	};

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<CartCheckoutSummaryProductsList />
					<Stack spacing={1}>
						<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
							<Typography variant="body2">Wartość produktów ({totalQuantity})</Typography>
							<Typography fontWeight={500} variant="body2">
								{formatAmount(totalProductsAmount, totalProductsAmountCurrency)}
							</Typography>
						</Stack>
						<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
							<Typography variant="body2">Dostawa</Typography>
							<Typography fontWeight={500} variant="body2">
								{formatAmount(deliveryAmount, deliveryCurrency)}
							</Typography>
						</Stack>
						<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
							<Typography variant="body2">Płatność</Typography>
							<Typography fontWeight={500} variant="body2">
								{formatAmount(paymentAmount, paymentCurrency)}
							</Typography>
						</Stack>
						<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
							<Typography>Do zapłaty</Typography>
							<Typography variant="h6" fontWeight={500}>
								{formatAmount(totalAmount, totalAmountCurrency)}
							</Typography>
						</Stack>
						<Button variant="contained" fullWidth onClick={handleNextStepClick}>
							Przejdź do podsumowania
						</Button>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CartCheckoutSummary;
