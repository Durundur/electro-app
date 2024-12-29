"use client";
import EmptyCartInfo from "@/components/Cart/EmptyCartInfo/EmptyCartInfo";
import { Alert, Grid2, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import CartSummary from "@/components/Cart/CartSummary/CartSummary";
import CartProductList from "@/components/Cart/CartProduct/CartProductList/CartProductList";
import { useDispatch, useSelector } from "@/libs/Store";
import { fetchCart } from "@/libs/Cart/thunks";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";

const CartPage: FC = () => {
	const dispatch = useDispatch();
	const cartDataSelector = useSelector((store) => store.CartStore.data);
	const cartIsLoadingSelector = useSelector((store) => store.CartStore.isLoading);
	const cartErrorSelector = useSelector((store) => store.CartStore.error);
	const cartValidationErrorsSelector = useSelector((store) => store.CartStore.validationErrors);

	const alerts = cartValidationErrorsSelector.map((message, index) => (
		<Alert key={`cart-validation-msg-${index}`} variant="outlined" severity="warning">
			{message}
		</Alert>
	));

	useEffect(() => {
		dispatch(fetchCart());
	}, []);

	if (cartIsLoadingSelector) {
		return <FullScreenLoader isVisible />;
	}
	if (cartErrorSelector) {
		return <p>Error: {cartErrorSelector.message}</p>;
	}
	if (!cartDataSelector || cartDataSelector.products?.length === 0) {
		return <EmptyCartInfo />;
	}
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 8 }}>
				<Stack spacing={2}>
					{alerts}
					<CartProductList />
				</Stack>
			</Grid2>
			<Grid2 size={{ xs: 12, md: 4 }}>
				<CartSummary />
			</Grid2>
		</Grid2>
	);
};

export default CartPage;
