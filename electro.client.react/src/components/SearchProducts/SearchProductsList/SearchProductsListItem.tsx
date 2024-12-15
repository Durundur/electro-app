import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetSearchProductsResultProduct } from "@/libs/api-contract/api-contract";
import { Box, Card, CardContent, CardMedia, Grid2, IconButton, Rating, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface SearchProductsListItemProps {
	product: GetSearchProductsResultProduct;
}

const SearchProductsListItem: FC<SearchProductsListItemProps> = ({ product }) => {
	return (
		<Link href={`/product/${product.id}`}>
			<Card variant="elevation">
				<Grid2 container>
					<Grid2 size={{ xs: 3 }} alignSelf={"center"}>
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
					<Grid2 size={{ xs: 7 }}>
						<CardContent>
							<Stack spacing={1}>
								<Typography variant="body1" component="p">
									{product.name}
								</Typography>
								<Stack direction={"row"} spacing={1}>
									<Rating value={product.averageOpinionRating} precision={0.5} size="small" readOnly />
									<Typography variant="caption" component="span">
										({product.opinionCount})
									</Typography>
								</Stack>
								<Stack spacing={0.5}>
									{product.attributes?.map((item, i) => (
										<Typography component={"p"} variant="caption" noWrap key={`small-specification-item-${i}`}>
											{item.name}: {item.value}
										</Typography>
									))}
								</Stack>
							</Stack>
						</CardContent>
					</Grid2>
					<Grid2 size={{ xs: 2 }}>
						<CardContent>
							<Typography variant="h6" align="right" sx={{ whiteSpace: "nowrap" }}>
								{formatAmount(product.amount!, product.currency!)}
							</Typography>
						</CardContent>
					</Grid2>
				</Grid2>
			</Card>
		</Link>
	);
};

export default SearchProductsListItem;
