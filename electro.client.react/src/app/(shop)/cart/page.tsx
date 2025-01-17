"use client";
import { Alert, Grid2, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { fetchCart } from "@/libs/Cart/thunks";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import EmptyCartInfo from "@/components/Cart/Cart/EmptyCartInfo/EmptyCartInfo";
import CartProductList from "@/components/Cart/Cart/CartProduct/CartProductList/CartProductList";
import CartSummary from "@/components/Cart/Cart/CartSummary/CartSummary";

const CartPage: FC = () => {
	const dispatch = useDispatch();
	const cartDataSelector = useSelector((store) => store.CartStore.cart.data);
	const cartIsLoadingSelector = useSelector((store) => store.CartStore.cart.isLoading);
	const cartErrorSelector = useSelector((store) => store.CartStore.cart.error);
	const cartValidationErrorsSelector = useSelector((store) => store.CartStore.cart.validationErrors);

	const alerts = cartValidationErrorsSelector.map((message, index) => (
		<Alert key={`cart-validation-msg-${index}`} variant="outlined" severity="warning">
			{message}
		</Alert>
	));

	useEffect(() => {
		dispatch(fetchCart());
	}, []);

	if (cartErrorSelector) {
		return <p>Error: {cartErrorSelector.message}</p>;
	}
	if (cartDataSelector && cartDataSelector.products?.length === 0) {
		return <EmptyCartInfo />;
	}
	if (cartDataSelector) {
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
				<FullScreenLoader isVisible={cartIsLoadingSelector} />
			</Grid2>
		);
	}
	return <FullScreenLoader isVisible />;
};

export default CartPage;
