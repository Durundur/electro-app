import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetCartResultProduct } from "@/libs/api-contract/rest-api-contract";
import { CardMedia, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface CartCheckoutConfirmProduct {
	product: GetCartResultProduct;
}

const CartCheckoutConfirmProduct: FC<CartCheckoutConfirmProduct> = ({ product }) => {
	const unitPrice = product.promotion ?? product.price;

	return (
		<Grid2 container spacing={2} alignItems={"center"}>
			<Grid2 size={{ xs: 2 }}>
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
			<Grid2 size={{ xs: 6 }}>
				<Link href={`/product/${product.productId}`}>
					<Typography
						sx={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: "2",
							WebkitBoxOrient: "vertical",
						}}
					>
						{product.name}
					</Typography>
				</Link>
			</Grid2>
			<Grid2 size={{ xs: 2 }} textAlign={"center"}>
				<Typography>{product.quantity} szt.</Typography>
			</Grid2>
			<Grid2 size={{ xs: 2 }} textAlign={"center"}>
				<Typography>{formatAmount(unitPrice?.amount!, unitPrice?.currency!)}</Typography>
			</Grid2>
		</Grid2>
	);
};

export default CartCheckoutConfirmProduct;
