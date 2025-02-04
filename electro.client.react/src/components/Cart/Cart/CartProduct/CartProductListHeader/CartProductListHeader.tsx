import { validateCart } from "@/libs/Cart/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { getValidateCartCommand } from "@/libs/Cart/services";
import { FC } from "react";

interface CartProductListHeaderProps {}

const CartProductListHeader: FC<CartProductListHeaderProps> = () => {
	const dispatch = useDispatch();
	const cartTotalQuantitySelector = useSelector((store) => store.CartStore.cart.data?.totalQuantity);
	const cartSelector = useSelector((store) => store.CartStore.cart.data);
	const userProfileId = useSelector((store) => store.AuthStore.userProfile.id);

	const handleClearCart = () => {
		const cart = {
			...cartSelector,
		};
		cart.products = [];
		dispatch(validateCart(getValidateCartCommand(cart, userProfileId)));
	};

	return (
		<Stack direction={"row"} justifyContent={"space-between"}>
			<Stack direction={"row"} spacing={1} alignItems={"baseline"}>
				<Typography variant="h6" fontWeight={500}>
					Koszyk
				</Typography>
				<Typography variant="body2" fontWeight={300}>
					({cartTotalQuantitySelector} produkty)
				</Typography>
			</Stack>
			<Button startIcon={<DeleteOutlineOutlined />} onClick={handleClearCart} variant="text">
				Wyczyść koszyk
			</Button>
		</Stack>
	);
};

export default CartProductListHeader;
