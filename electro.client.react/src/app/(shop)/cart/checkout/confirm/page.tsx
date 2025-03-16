"use client";
import CartCheckoutConfirmSections from "@/components/Cart/CartCheckoutConfirm/CartCheckoutConfirmSections/CartCheckoutConfirmSections";
import CartCheckoutConfirmSummary from "@/components/Cart/CartCheckoutConfirm/CartCheckoutConfirmSummary/CartCheckoutConfirmSummary";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { Grid2 } from "@mui/material";
import { FC } from "react";

const CartCheckoutConfirmPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Koszyk", link: "/cart" },
	]);

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 8 }}>
				<CartCheckoutConfirmSections />
			</Grid2>
			<Grid2 size={{ xs: 12, md: 4 }}>
				<CartCheckoutConfirmSummary />
			</Grid2>
		</Grid2>
	);
};

export default CartCheckoutConfirmPage;
