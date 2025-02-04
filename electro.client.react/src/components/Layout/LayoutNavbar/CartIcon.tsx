import { Badge, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useSelector } from "@/libs/Store";

const CartIcon: FC = () => {
	const cartTotalItemsSelector = useSelector((store) => store.CartStore.cart.data?.totalQuantity);

	return (
		<Tooltip title="Koszyk">
			<IconButton LinkComponent={Link} href="/cart">
				<Badge badgeContent={cartTotalItemsSelector ?? null} color="primary">
					<ShoppingCartOutlined></ShoppingCartOutlined>
				</Badge>
			</IconButton>
		</Tooltip>
	);
};

export default CartIcon;
