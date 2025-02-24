import { StoredCartState, restoreCart } from "@/libs/Cart/slice";
import { fetchCart } from "@/libs/Cart/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { FC, ReactNode, useEffect } from "react";

interface CartProviderProps {
	children: ReactNode;
}

const initialCart: StoredCartState = {
	id: undefined,
	products: [],
	totalPrice: {
		amount: 0,
		currency: "PLN",
	},
	totalQuantity: 0,
};

const CartProvider: FC<CartProviderProps> = ({ children }) => {
	const dispatch = useDispatch();
	const cartStateSelector = useSelector((store) => store.CartStore.cart.data);
	const isAuthenticatedSelector = useSelector((store) => store.AuthStore.auth.isAuthenticated);
	const userSelector = useSelector((store) => store.AuthStore.user);
	const localStorageKey = "electro-cart";

	useEffect(() => {
		if (isAuthenticatedSelector && userSelector.id) {
			dispatch(fetchCart(userSelector.id));
			return;
		}

		if (typeof window === "undefined") return;

		const storedCart = localStorage.getItem(localStorageKey);
		if (!storedCart) {
			dispatch(restoreCart(initialCart));
			return;
		}

		try {
			const parsedStoredCart = JSON.parse(storedCart);
			if (parsedStoredCart && typeof parsedStoredCart === "object") {
				dispatch(restoreCart(parsedStoredCart));
			} else {
				dispatch(restoreCart(initialCart));
			}
		} catch (error) {
			console.log("Error while parsing cart from local storage", error);
			dispatch(restoreCart(initialCart));
		}
	}, [isAuthenticatedSelector, userSelector, userSelector.id]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (!isAuthenticatedSelector && cartStateSelector && typeof cartStateSelector === "object") {
			localStorage.setItem(localStorageKey, JSON.stringify(cartStateSelector));
		}
	}, [cartStateSelector, isAuthenticatedSelector]);

	return children;
};

export default CartProvider;
