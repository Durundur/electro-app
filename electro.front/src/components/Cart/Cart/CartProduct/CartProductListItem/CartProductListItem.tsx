"use client";
import { formatAmount } from "@/libs/Helpers/Formatters";
import { Box, CardMedia, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import QuantityInput from "@/components/Shared/QuantityInput/QuantityInput";
import { GetCartResultProduct } from "@/libs/api-contract/rest-api-contract";
import { useDispatch, useSelector } from "@/libs/Store";
import { validateCart } from "@/libs/Cart/thunks";
import { getValidateCartCommand } from "@/libs/Cart/services";
import Link from "next/link";

interface CartProductListItemProps {
	product: GetCartResultProduct;
}

const CartProductListItem: FC<CartProductListItemProps> = ({ product }) => {
	const dispatch = useDispatch();
	const cartSelector = useSelector((store) => store.CartStore.cart.data);
	const productTotalPrice = product.quantity! * (product.promotion?.amount ?? product.price?.amount!);

	const handleQuantityChange = (quantity: number, id: string) => {
		const cart = {
			...cartSelector,
			products: cartSelector?.products?.map((product) => ({ ...product })),
		};

		const cartProduct = cart?.products?.find((cp) => cp.productId === id);
		if (!cartProduct || !cart) return;

		cartProduct.quantity = quantity;
		dispatch(validateCart(getValidateCartCommand(cart)));
	};

	const handleItemDelete = () => {
		const cart = {
			...cartSelector,
		};
		cart.products = cartSelector?.products?.filter((p) => p.productId !== product.productId);
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
				<Grid2 size={{ xs: 10, md: 3 }}>
					<Link href={`/product/${product.productId}`}>
						<Typography paddingX={1} variant="body2">
							{product.name}
						</Typography>
					</Link>
				</Grid2>
				<Grid2 size={{ xs: 4, md: 2 }}>
					<Stack spacing={1}>
						{product.promotion && (
							<Typography variant="body1" textAlign={"center"} fontWeight={500} sx={{ whiteSpace: "nowrap" }}>
								{formatAmount(product.promotion.amount!, product.promotion.currency!)}
							</Typography>
						)}
						<Typography
							variant={product.promotion ? "body2" : "body1"}
							textAlign={"center"}
							fontWeight={product.promotion ? 400 : 500}
							sx={{ whiteSpace: "nowrap", textDecoration: product.promotion ? "line-through" : "none" }}
						>
							{formatAmount(product.price?.amount!, product.price?.currency!)}
						</Typography>
					</Stack>
				</Grid2>
				<Grid2 size={{ xs: "grow" }} alignSelf={"center"}>
					<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
						<QuantityInput value={product.quantity!} id={product.productId!} onChange={handleQuantityChange}></QuantityInput>
					</Box>
				</Grid2>
				<Grid2 size={{ xs: 4, md: 2 }}>
					<Typography variant="body1" textAlign={"center"} fontWeight={500} sx={{ whiteSpace: "nowrap" }}>
						{formatAmount(productTotalPrice, product.price?.currency!)}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: "auto" }} display={"flex"} justifyContent={"end"}>
					<IconButton size="small" onClick={handleItemDelete}>
						<DeleteOutlineOutlined fontSize="small" />
					</IconButton>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default CartProductListItem;
