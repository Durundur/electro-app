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
	const userProfileIdSelector = useSelector((store) => store.AuthStore.userProfile.id);
	const localStorageKey = "electro-cart";

	useEffect(() => {
		if (isAuthenticatedSelector && userProfileIdSelector) {
			dispatch(fetchCart(userProfileIdSelector));
		} else {
			if (typeof window === "undefined") return;
			const storedCart = localStorage.getItem(localStorageKey);
			if (!storedCart) return;
			try {
				const parsedStoredCart: StoredCartState = JSON.parse(storedCart) as StoredCartState;
				dispatch(restoreCart(parsedStoredCart));
			} catch (e) {}
		}
	}, [isAuthenticatedSelector, userProfileIdSelector]);

	useEffect(() => {
		if (typeof window === "undefined" || isAuthenticatedSelector) return;
		localStorage.setItem(localStorageKey, JSON.stringify(cartStateSelector as StoredCartState));
	}, [cartStateSelector, isAuthenticatedSelector]);

	return children;
};

export default CartProvider;
