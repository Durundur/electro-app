import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetUserOrdersResultOrderProduct } from "@/libs/api-contract/api-contract";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid2, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface AccountOrdersListItemProductsProps {
	products: GetUserOrdersResultOrderProduct[];
}

const AccountOrdersListItemProducts: FC<AccountOrdersListItemProductsProps> = ({ products }) => {
	return (
		<Grid2
			container
			sx={(theme) => ({
				overflowY: "auto",
				height: "140px",
				"&::-webkit-scrollbar": {
					width: "0.33rem",
				},
				"&::-webkit-scrollbar-thumb": {
					background: theme.palette.primary.main,
					borderRadius: theme.shape.borderRadius,
				},
			})}
		>
			{products.map((product) => (
				<Grid2 size={{ xs: 12 }} key={product.id}>
					<AccountOrdersListItemProduct product={product}></AccountOrdersListItemProduct>
				</Grid2>
			))}
		</Grid2>
	);
};

interface AccountOrdersListItemProductProps {
	product: GetUserOrdersResultOrderProduct;
}

const AccountOrdersListItemProduct: FC<AccountOrdersListItemProductProps> = ({ product }) => {
	return (
		<Card elevation={0}>
			<CardActionArea LinkComponent={Link} href={`/product/${product.id}`}>
				<CardContent sx={{ height: "100%" }}>
					<Grid2 container spacing={1}>
						<Grid2 size={{ xs: 4 }} alignSelf={"center"} sx={{ maxHeight: "100px" }}>
							<CardMedia
								component="img"
								image={product.photo}
								alt={product.name}
								sx={{
									aspectRatio: "4 / 3",
									objectFit: "contain",
									maxHeight: "100px",
								}}
							></CardMedia>
						</Grid2>
						<Grid2 size={{ xs: "grow" }} sx={{ maxHeight: "100px" }}>
							<Stack justifyContent={"space-between"} spacing={1} sx={{ height: "100%" }}>
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
								<Stack direction={"row"} justifyContent={"space-between"}>
									<Typography>{formatAmount(product.price?.amount!, product.price?.currency!)}</Typography>
									<Typography>{product.quantity} szt.</Typography>
								</Stack>
							</Stack>
						</Grid2>
					</Grid2>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default AccountOrdersListItemProducts;
