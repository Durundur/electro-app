import { Stack } from "@mui/material";
import { FC } from "react";
import CartCheckoutSummaryProduct from "./CartCheckoutSummaryProduct/CartCheckoutSummaryProduct";
import { useSelector } from "@/libs/Store";

const CartCheckoutSummaryProductsList: FC = () => {
	const cartProducts = useSelector((store) => store.CartStore.cart.data?.products);

	return (
		<Stack spacing={2} sx={{ maxHeight: "275px", overflowY: "auto" }}>
			{cartProducts?.map((p) => <CartCheckoutSummaryProduct product={p} key={p.productId} />)}
		</Stack>
	);
};

export default CartCheckoutSummaryProductsList;
