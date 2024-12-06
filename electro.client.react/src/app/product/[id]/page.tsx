"use client";
import { FC, useEffect } from "react";
import { Box, Button, Card, CircularProgress, Grid2 as Grid, Paper, Rating, Stack, Typography } from "@mui/material";
import { ShoppingCartOutlined, StarBorderRounded, CheckCircleOutlineRounded, AccessTimeRounded, LocalShippingOutlined, KeyboardDoubleArrowDownRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "@/libs/Store";
import ProductPageBreadcrumbs from "@/components/ProductPage/ProductPageBreadcrumbs/ProductPageBreadcrumbs";
import { fetchProduct } from "@/libs/ProductPage/thunk";
import { clearProductState } from "@/libs/ProductPage/slice";
import ProductPageSlider from "@/components/ProductPage/ProductPageSlider/ProductPageSlider";
import ProductPageSpecificationTable from "@/components/ProductPage/ProductPageSpecification/ProductPageSpecificationTable";
import OpinionsSection from "@/components/ProductPage/ProductPageOpinions/OpinionsSection";
import ProductPageSpecificationPrimary from "@/components/ProductPage/ProductPageSpecification/ProductPageSpecificationPrimary";

interface ProductPageParams {
	params: { id: string };
}

const ProductPage: FC<ProductPageParams> = ({ params }) => {
	const dispatch = useDispatch();
	const productSelector = useSelector((state) => state.ProductPage.product);
	const product = productSelector.data;

	useEffect(() => {
		dispatch(fetchProduct(params.id));

		return () => {
			dispatch(clearProductState());
		};
	}, []);

	if (productSelector.isLoading) return <CircularProgress />;
	if (productSelector.error) return <p>error</p>;

	return (
		product && (
			<Box>
				<ProductPageBreadcrumbs product={product} />
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, md: 6 }}>
						<ProductPageSlider photos={product.photos!}></ProductPageSlider>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<Stack spacing={1}>
							<Typography variant="h5">{product.name}</Typography>
							<Stack direction={"row"} alignItems={"center"} spacing={1}>
								<Rating size="small" value={3.5} readOnly precision={0.5} emptyIcon={<StarBorderRounded style={{ opacity: 0.5 }} fontSize="inherit" />} />
								<Typography variant="caption">({90}) opinii</Typography>
							</Stack>
							<div>
								<Grid container direction={"row"} size={{ xs: 12 }} spacing={2}>
									<Grid size={{ xs: 6 }}>
										<ProductPageSpecificationPrimary specification={product.attributes!} />
										<Button color="inherit" variant="text" size="small" fullWidth endIcon={<KeyboardDoubleArrowDownRounded />}>
											Przewiń do pełnej specyfikacji
										</Button>
									</Grid>
									<Grid size={{ xs: 6 }}>
										<Card sx={{ padding: 2 }}>
											<Stack spacing={1}>
												<Typography variant="h5" textAlign={"end"}>
													{product.amount} zł
												</Typography>
												<Button variant="contained" color="success" startIcon={<ShoppingCartOutlined />}>
													Dodaj do koszyka
												</Button>
												<Stack direction={"row"} sx={{ padding: 1 }} spacing={2} alignItems={"center"}>
													<CheckCircleOutlineRounded />
													<div>
														<Typography variant="body2">Dostępny</Typography>
														<Typography variant="caption">Dowiedz się więcej</Typography>
													</div>
												</Stack>
												<Stack direction={"row"} sx={{ padding: 1 }} spacing={2} alignItems={"center"}>
													<AccessTimeRounded />
													<div>
														<Typography variant="body2">Kup teraz, a otrzymasz jutro</Typography>
														<Typography variant="caption">Dowiedz się więcej</Typography>
													</div>
												</Stack>
												<Stack direction={"row"} sx={{ padding: 1 }} spacing={2} alignItems={"center"}>
													<LocalShippingOutlined />
													<div>
														<Typography variant="body2">Darmowa dostawa</Typography>
														<Typography variant="caption">Sprawdz szczegóły</Typography>
													</div>
												</Stack>
											</Stack>
										</Card>
									</Grid>
								</Grid>
							</div>
						</Stack>
					</Grid>
				</Grid>
				<Stack component={Card} spacing={1} direction={"row"}>
					<Button color="inherit">Opis</Button>
					<Button color="inherit">Specyfikacja</Button>
					<Button color="inherit">Akcesoria</Button>
					<Button color="inherit">Opinie</Button>
				</Stack>
				<Box>
					<Typography variant="h6">Opis</Typography>
					<div dangerouslySetInnerHTML={{ __html: product.description! }} />
				</Box>
				<Box>
					<Typography variant="h6">Specyfikacja</Typography>
					<ProductPageSpecificationTable specification={product.attributes!} />
				</Box>
				<Box>
					<Typography variant="h6">Akcesoria</Typography>
				</Box>
				<Box>
					<Typography variant="h6">Opinie</Typography>
					<OpinionsSection />
				</Box>
			</Box>
		)
	);
};

export default ProductPage;
