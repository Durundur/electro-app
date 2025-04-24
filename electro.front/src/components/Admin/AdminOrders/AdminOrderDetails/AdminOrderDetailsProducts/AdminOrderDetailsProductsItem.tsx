import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetOrderDetailsResultProduct } from "@/libs/api-contract/rest-api-contract";
import { Card, CardActionArea, CardContent, CardMedia, Grid2, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface AdminOrderDetailsProductsItemProps {
	product: GetOrderDetailsResultProduct;
}

const AdminOrderDetailsProductsItem: FC<AdminOrderDetailsProductsItemProps> = ({ product }) => {
	return (
		<Card sx={{ height: "100%" }}>
			<CardActionArea sx={{ height: "100%" }} LinkComponent={Link} href={`/product/${product.productId}`}>
				<CardContent sx={{ height: "100%" }}>
					<Grid2 container spacing={1} sx={{ height: "100%" }}>
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
						<Grid2 size={{ xs: "grow" }}>
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
									<Typography>{product.quantity} szt.</Typography>
									<Typography>{formatAmount(product.price?.amount!, product.price?.currency!)}</Typography>
								</Stack>
							</Stack>
						</Grid2>
					</Grid2>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default AdminOrderDetailsProductsItem;
