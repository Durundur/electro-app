import { formatAmount } from "@/libs/Helpers/Formatters";
import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
	id: string | number;
	name: string;
	photo: string;
	amount: number;
	currency: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, photo, amount, currency }) => {
	return (
		<Card>
			<CardActionArea component={Link} href={`/product/${id}`}>
				<CardMedia
					component="img"
					image={photo}
					alt={name}
					sx={{
						aspectRatio: "4 / 3",
						objectFit: "contain",
					}}
				></CardMedia>
				<CardContent>
					<Stack direction={"column"} spacing={1}>
						<Typography
							sx={{
								height: "38px",
								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: "2",
								WebkitBoxOrient: "vertical",
							}}
						>
							{name}
						</Typography>
						<Typography fontWeight={500}>{formatAmount(amount, currency)}</Typography>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
