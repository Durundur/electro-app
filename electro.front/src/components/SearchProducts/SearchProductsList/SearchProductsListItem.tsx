import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetSearchProductsResultProduct } from "@/libs/api-contract/api-contract";
import { Card, CardActionArea, CardContent, CardMedia, Grid2, IconButton, Rating, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface SearchProductsListItemProps {
	product: GetSearchProductsResultProduct;
}

const SearchProductsListItem: FC<SearchProductsListItemProps> = ({ product }) => {
	const attributes = [...(product.attributes ?? [])].sort();
	
	return (
		<Card>
			<CardActionArea LinkComponent={Link} href={`/product/${product.id}`}>
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
								<Typography variant="subtitle2" fontWeight={400}>
									{product.name}
								</Typography>
								<Stack direction={"row"} spacing={1}>
									<Rating value={product.averageOpinionRating} precision={0.5} size="small" readOnly />
									<Typography variant="caption" component="span">
										({product.opinionCount})
									</Typography>
								</Stack>
								<Stack spacing={0.5}>
									{attributes.map((item, i) => (
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
			</CardActionArea>
		</Card>
	);
};

export default SearchProductsListItem;
