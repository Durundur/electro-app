"use client";
import CartCheckoutSections from "@/components/Cart/CartCheckout/CartCheckoutSections/CartCheckoutSections";
import CartCheckoutSummary from "@/components/Cart/CartCheckout/CartCheckoutSummary/CartCheckoutSummary";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { useOrderFlowGuard } from "@/hooks/OrderFlowGuard/useOrderFlowGuard";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";
import { useSelector } from "@/libs/Store";
import { Button, Grid2 } from "@mui/material";
import { FC } from "react";

const CartCheckoutPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Koszyk", link: "/cart" },
	]);

	const isLoadingRecipientsSelector = useSelector((store) => store.CartStore.checkoutRecipients.isLoading);

	usePageTransition([isLoadingRecipientsSelector]);

	useOrderFlowGuard({ requiredStep: "checkout" });

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 8 }}>
				<CartCheckoutSections />
			</Grid2>
			<Grid2 size={{ xs: 12, md: 4 }}>
				<CartCheckoutSummary />
			</Grid2>
		</Grid2>
	);
};

export default CartCheckoutPage;
