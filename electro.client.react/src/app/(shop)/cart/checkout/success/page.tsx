"use client";
import CartCheckoutSuccess from "@/components/Cart/CartCheckoutSuccess/CartCheckoutSuccess";
import { useOrderFlowGuard } from "@/hooks/OrderFlowGuard/useOrderFlowGuard";
import { clearCheckoutRecipientsState, clearCheckoutState, clearCreateOrderState } from "@/libs/Cart/slice";
import { fetchCart } from "@/libs/Cart/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { FC, useEffect } from "react";

const CartCheckoutSuccessPage: FC = () => {
	const dispatch = useDispatch();
	const orderIdSelector = useSelector((store) => store.CartStore.createOrder.result?.orderId);
	const userId = useSelector((store) => store.AuthStore.user.id);

	useOrderFlowGuard({ requiredStep: "success" });

	useEffect(() => {
		if (userId) dispatch(fetchCart(userId));

		return () => {
			dispatch(clearCheckoutRecipientsState());
			dispatch(clearCheckoutState());
			dispatch(clearCreateOrderState());
		};
	}, []);

	return <CartCheckoutSuccess orderId={orderIdSelector as string} />;
};

export default CartCheckoutSuccessPage;
