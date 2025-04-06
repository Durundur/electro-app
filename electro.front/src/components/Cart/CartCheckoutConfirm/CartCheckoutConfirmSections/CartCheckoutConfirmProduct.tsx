import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetCartResultProduct } from "@/libs/api-contract/api-contract";
import { CardMedia, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface CartCheckoutConfirmProduct {
	product: GetCartResultProduct;
}

const CartCheckoutConfirmProduct: FC<CartCheckoutConfirmProduct> = ({ product }) => {
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
				{product.price?.amount && product.price?.currency && <Typography>{formatAmount(product.price.amount, product.price.currency)}</Typography>}
			</Grid2>
		</Grid2>
	);
};

export default CartCheckoutConfirmProduct;
