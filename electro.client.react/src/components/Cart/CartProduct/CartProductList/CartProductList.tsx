import { Card, CardContent, Stack } from "@mui/material";
import { FC } from "react";
import CartProductListHeader from "../CartProductListHeader/CartProductListHeader";
import CartProductListItem from "../CartProductListItem/CartProductListItem";
import { useSelector } from "@/libs/Store";

const CartProductList: FC = () => {
	const cartSelector = useSelector((store) => store.CartStore);
	const cartProducts = cartSelector.data?.products;
	
	return (
		<Card>
			<CardContent>
				<CartProductListHeader></CartProductListHeader>
				<Stack rowGap={2}>{cartProducts?.map((p) => <CartProductListItem key={p.productId} product={p}></CartProductListItem>)}</Stack>
			</CardContent>
		</Card>
	);
};

export default CartProductList;
