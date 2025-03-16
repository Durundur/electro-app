import { FC } from "react";
import { Grid2 as Grid, Stack, Typography, Rating, Button } from "@mui/material";
import { KeyboardDoubleArrowDownRounded, StarBorderRounded } from "@mui/icons-material";
import ProductPageSlider from "./ProductPageSlider/ProductPageSlider";
import ProductPageSpecificationPrimary from "../ProductPageSpecification/ProductPageSpecificationPrimary";
import { GetProductResult } from "@/libs/api-contract/api-contract";
import ProductPageActionCard from "./ProductPageActionCard/ProductPageActionCard";
import Link from "next/link";
import useScrollTo from "@/hooks/ScrollTo/useScrollTo";

interface ProductPageOverviewProps {
	product: GetProductResult;
	onAddToCart: (quantity: number) => void;
}

const ProductPageOverview: FC<ProductPageOverviewProps> = ({ product, onAddToCart }) => {
	const scrollTo = useScrollTo();

	return (
		<Grid container spacing={2}>
			<Grid size={{ xs: 12, md: 6 }}>
				<ProductPageSlider photos={product?.photos ?? []} />
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<Stack spacing={1}>
					<Typography variant="h6">{product?.name}</Typography>
					<Stack direction="row" alignItems="center" spacing={1}>
						<Rating size="small" value={product?.averageOpinionRating} readOnly precision={0.5} emptyIcon={<StarBorderRounded style={{ opacity: 0.5 }} fontSize="inherit" />} />
						<Typography variant="caption">({product?.opinionCount}) opinii</Typography>
					</Stack>
					<Grid container direction="row" size={{ xs: 12 }} spacing={2}>
						<Grid size={{ xs: 12, sm: 6 }} order={{ xs: 2, sm: 1 }}>
							<Stack spacing={1}>
								<ProductPageSpecificationPrimary specification={product?.attributes ?? []} />
								<Button onClick={() => scrollTo("specification")} color="inherit" variant="text" fullWidth endIcon={<KeyboardDoubleArrowDownRounded />}>
									Przewiń do pełnej specyfikacji
								</Button>
							</Stack>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }} order={{ xs: 1, sm: 2 }}>
							<ProductPageActionCard product={product} onAddToCart={onAddToCart} />
						</Grid>
					</Grid>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default ProductPageOverview;
