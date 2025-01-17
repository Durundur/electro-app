import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetCartResultProduct } from "@/libs/api-contract/api-contract";
import { CardMedia, Grid2, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface CheckoutProductProps {
	product: GetCartResultProduct;
}

const CartCheckoutSummaryProduct: FC<CheckoutProductProps> = ({ product }) => {
	return (
		<Grid2 container spacing={1} alignItems={"center"}>
			<Grid2 size={{ xs: 3 }}>
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
			<Grid2 size={{ xs: "grow" }}>
				<Stack justifyContent={"space-between"} sx={{ height: "100%" }} spacing={1}>
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

					<Stack direction={"row"} justifyContent={"space-between"}>
						<Typography>{product.quantity} szt.</Typography>
						<Typography>{formatAmount(product.price?.amount!, product.price?.currency!)}</Typography>
					</Stack>
				</Stack>
			</Grid2>
		</Grid2>
	);
};

export default CartCheckoutSummaryProduct;
