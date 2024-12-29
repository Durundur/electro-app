import { clearCart } from "@/libs/Cart/slice";
import { useSelector } from "@/libs/Store";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";

interface CartProductListHeaderProps {}

const CartProductListHeader: FC<CartProductListHeaderProps> = () => {
	const dispatch = useDispatch();
	const cartSelector = useSelector((store) => store.CartStore.data?.totalQuantity);

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	return (
		<Stack direction={"row"} justifyContent={"space-between"}>
			<Stack direction={"row"} spacing={1} alignItems={"baseline"}>
				<Typography variant="h6" fontWeight={500}>
					Koszyk
				</Typography>
				<Typography variant="body2" fontWeight={300}>
					({cartSelector} produkty)
				</Typography>
			</Stack>
			<Button startIcon={<DeleteOutlineOutlined />} onClick={handleClearCart} variant="text">
				Wyczyść koszyk
			</Button>
		</Stack>
	);
};

export default CartProductListHeader;
