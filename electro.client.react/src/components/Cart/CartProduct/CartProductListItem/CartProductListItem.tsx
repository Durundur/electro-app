"use client";
import { formatAmount } from "@/libs/Helpers/Formatters";
import { Box, CardMedia, Grid2, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import QuantityInput from "@/components/Shared/QuantityInput/QuantityInput";
import { GetCartResultProduct } from "@/libs/api-contract/api-contract";
import { useDispatch, useSelector } from "@/libs/Store";
import { validateCart } from "@/libs/Cart/thunks";
import { getValidateCartCommand } from "@/libs/Cart/services";

interface CartProductListItemProps {
	product: GetCartResultProduct;
}

const CartProductListItem: FC<CartProductListItemProps> = ({ product }) => {
	const dispatch = useDispatch();
	const cartSelector = useSelector((store) => store.CartStore.data);

	const handleQuantityChange = (quantity: number, id: string) => {
		const cart = {
			...cartSelector,
			products: cartSelector?.products?.map((product) => ({ ...product })),
		};

		let cartProduct = cart?.products?.find((cp) => cp.productId === id);
		if (!cartProduct || !cart) return;

		cartProduct.quantity = quantity;
		dispatch(validateCart(getValidateCartCommand(cart)));
	};

	return (
		<Box>
			<Grid2 container alignItems={"center"}>
				<Grid2 size={{ xs: 2 }} alignSelf={"center"}>
					<CardMedia
						component="img"
						image={product.photo}
						alt={product.name}
						sx={{
							aspectRatio: "4 / 3",
							objectFit: "contain",
						}}
					></CardMedia>
				</Grid2>
				<Grid2 size={{ xs: 10, md: 4 }}>
					<Typography paddingX={1} variant="body1">
						{product.name}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4, md: 2 }}>
					<Typography variant="body1" textAlign={"center"} fontWeight={500} sx={{ whiteSpace: "nowrap" }}>
						{formatAmount(product.price?.amount!, product.price?.currency!)}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: "auto" }}>
					<QuantityInput value={product.quantity!} id={product.productId!} onChange={handleQuantityChange}></QuantityInput>
				</Grid2>
				<Grid2 size={{ xs: 4, md: 2 }}>
					<Typography variant="body1" textAlign={"center"} fontWeight={500} sx={{ whiteSpace: "nowrap" }}>
						{formatAmount(product.price?.amount!, product.price?.currency!)}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: "auto" }} display={"flex"} justifyContent={"end"}>
					<IconButton>
						<DeleteOutlineOutlined />
					</IconButton>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default CartProductListItem;
