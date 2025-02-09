import { StoredCartState, restoreCart } from "@/libs/Cart/slice";
import { fetchCart } from "@/libs/Cart/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { FC, ReactNode, useEffect } from "react";

interface CartProviderProps {
	children: ReactNode;
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
	const dispatch = useDispatch();
	const cartStateSelector = useSelector((store) => store.CartStore.cart.data);
	const isAuthenticatedSelector = useSelector((store) => store.AuthStore.auth.isAuthenticated);
	const userId = useSelector((store) => store.AuthStore.user.id);
	const localStorageKey = "electro-cart";

	useEffect(() => {
		if (isAuthenticatedSelector && userId) {
			dispatch(fetchCart(userId));
		} else {
			if (typeof window === "undefined") return;
			const storedCart = localStorage.getItem(localStorageKey);
			if (!storedCart) return;
			try {
				const parsedStoredCart: StoredCartState = JSON.parse(storedCart) as StoredCartState;
				dispatch(restoreCart(parsedStoredCart));
			} catch (e) {}
		}
	}, [isAuthenticatedSelector, userId]);

	useEffect(() => {
		if (typeof window === "undefined" || isAuthenticatedSelector) return;
		localStorage.setItem(localStorageKey, JSON.stringify(cartStateSelector as StoredCartState));
	}, [cartStateSelector, isAuthenticatedSelector]);

	return children;
};

export default CartProvider;
