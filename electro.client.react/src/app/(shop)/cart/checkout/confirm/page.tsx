"use client";
import CartCheckoutConfirmSections from "@/components/Cart/CartCheckoutConfirm/CartCheckoutConfirmSections/CartCheckoutConfirmSections";
import CartCheckoutConfirmSummary from "@/components/Cart/CartCheckoutConfirm/CartCheckoutConfirmSummary/CartCheckoutConfirmSummary";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { Grid2, Stack } from "@mui/material";
import { FC } from "react";

const CartCheckoutConfirmPage: FC = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 8 }}>
				<CartCheckoutConfirmSections />
			</Grid2>
			<Grid2 size={{ xs: 12, md: 4 }}>
				<CartCheckoutConfirmSummary />
			</Grid2>
			<FullScreenLoader isVisible={false} />
		</Grid2>
	);
};

export default CartCheckoutConfirmPage;
