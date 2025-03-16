"use client";
import { Alert, Grid2, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { fetchCart } from "@/libs/Cart/thunks";
import CartProductList from "@/components/Cart/Cart/CartProduct/CartProductList/CartProductList";
import CartSummary from "@/components/Cart/Cart/CartSummary/CartSummary";
import CartEmpty from "@/components/Cart/Cart/CartEmpty/CartEmpty";
import Error from "@/components/Layout/Error/Error";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";

const CartPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Koszyk", link: "/cart" },
	]);
	const dispatch = useDispatch();
	const cartDataSelector = useSelector((store) => store.CartStore.cart.data);
	const cartIsLoadingSelector = useSelector((store) => store.CartStore.cart.isLoading);
	const cartErrorSelector = useSelector((store) => store.CartStore.cart.error);
	const cartValidationErrorsSelector = useSelector((store) => store.CartStore.cart.validationErrors);
	const userId = useSelector((store) => store.AuthStore.user.id);

	usePageTransition([cartIsLoadingSelector]);

	const alerts = cartValidationErrorsSelector.map((message, index) => (
		<Alert key={`cart-validation-msg-${index}`} variant="outlined" severity="warning">
			{message}
		</Alert>
	));

	useEffect(() => {
		if (!userId) return;
		dispatch(fetchCart(userId));
	}, []);

	if (cartErrorSelector) {
		return <Error message="Wystąpił błąd podczas ładowania koszyka"></Error>;
	}
	if (cartDataSelector && cartDataSelector.products?.length === 0) {
		return <CartEmpty />;
	}
	return (
		cartDataSelector && (
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
		)
	);
};

export default CartPage;
