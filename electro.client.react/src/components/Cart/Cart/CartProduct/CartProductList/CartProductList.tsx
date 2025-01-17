import { Card, CardContent, Stack } from "@mui/material";
import { FC } from "react";
import CartProductListHeader from "../CartProductListHeader/CartProductListHeader";
import CartProductListItem from "../CartProductListItem/CartProductListItem";
import { useSelector } from "@/libs/Store";

const CartProductList: FC = () => {
	const cartProductsSelector = useSelector((store) => store.CartStore.cart.data?.products);

	return (
		<Card>
			<CardContent>
				<CartProductListHeader></CartProductListHeader>
				<Stack rowGap={2}>{cartProductsSelector?.map((p) => <CartProductListItem key={p.productId} product={p}></CartProductListItem>)}</Stack>
			</CardContent>
		</Card>
	);
};

export default CartProductList;
