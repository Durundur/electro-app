"use client";
import CartCheckoutSuccess from "@/components/Cart/CartCheckoutSuccess/CartCheckoutSuccess";
import { useSelector } from "@/libs/Store";
import { FC } from "react";

const CartCheckoutSuccessPage: FC = () => {
	const orderIdSelector = useSelector((store) => store.CartStore.createOrder.result?.orderId);

	return <CartCheckoutSuccess orderId={orderIdSelector as string} />;
};

export default CartCheckoutSuccessPage;
