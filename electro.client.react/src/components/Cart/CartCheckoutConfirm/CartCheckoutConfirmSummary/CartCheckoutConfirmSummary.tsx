import { getCreateOrderCommand } from "@/libs/Cart/services";
import { createOrder } from "@/libs/Cart/thunks";
import { formatAmount } from "@/libs/Helpers/Formatters";
import { useDispatch, useSelector } from "@/libs/Store";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const CartCheckoutConfirmSummary: FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const cartSelector = useSelector((store) => store.CartStore.cart.data);
	const paymentOptionSelector = useSelector((store) => store.CartStore.checkout.paymentOption);
	const deliveryOptionSelector = useSelector((store) => store.CartStore.checkout.deliveryOption);
	const cartProductsSelector = useSelector((store) => store.CartStore.cart.data?.products);
	const recipientSelector = useSelector((store) => store.CartStore.checkout.recipientOption);
	const userId = useSelector((store) => store.AuthStore.user.id);

	const createOrderResultSelector = useSelector((store) => store.CartStore.createOrder.result);
	const createOrderErrorSelector = useSelector((store) => store.CartStore.createOrder.error);
	const createOrderIsLoadingSelector = useSelector((store) => store.CartStore.createOrder.isLoading);

	const paymentAmount = paymentOptionSelector?.amount ?? 0;
	const paymentCurrency = paymentOptionSelector?.currency ?? "PLN";

	const deliveryAmount = deliveryOptionSelector?.amount ?? 0;
	const deliveryCurrency = deliveryOptionSelector?.currency ?? "PLN";

	const totalQuantity = cartSelector?.totalQuantity ?? 0;
	const totalProductsAmount = cartSelector?.totalPrice?.amount ?? 0;
	const totalProductsAmountCurrency = cartSelector?.totalPrice?.currency ?? "PLN";

	const totalAmount = paymentAmount + deliveryAmount + totalProductsAmount;
	const totalAmountCurrency = "PLN";

	const handleCreateOrder = async () => {
		if (!cartProductsSelector || !paymentOptionSelector?.value || !deliveryOptionSelector?.value || !recipientSelector || !userId) return;
		const createOrderCommand = getCreateOrderCommand(cartProductsSelector, paymentOptionSelector?.value, deliveryOptionSelector?.value, recipientSelector);
		dispatch(createOrder(createOrderCommand));
	};

	useEffect(() => {
		if (createOrderIsLoadingSelector) return;
		if (!createOrderErrorSelector && createOrderResultSelector) {
			router.replace("/cart/checkout/success");
		}
	}, [createOrderErrorSelector, createOrderIsLoadingSelector, createOrderResultSelector]);

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
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
						<Button variant="contained" fullWidth onClick={handleCreateOrder}>
							Kupuję i płacę
						</Button>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CartCheckoutConfirmSummary;
