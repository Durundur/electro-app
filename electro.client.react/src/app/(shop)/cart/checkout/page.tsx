"use client";
import CartCheckoutSections from "@/components/Cart/CartCheckout/CartCheckoutSections/CartCheckoutSections";
import CartCheckoutSummary from "@/components/Cart/CartCheckout/CartCheckoutSummary/CartCheckoutSummary";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { Grid2 } from "@mui/material";
import { FC } from "react";

const CartCheckoutPage: FC = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 8 }}>
				<CartCheckoutSections />
			</Grid2>
			<Grid2 size={{ xs: 12, md: 4 }}>
				<CartCheckoutSummary />
			</Grid2>
			<FullScreenLoader isVisible={false} />
		</Grid2>
	);
};

export default CartCheckoutPage;
