"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Card, CircularProgress, Grid2 as Grid, Paper, Rating, Stack, Typography } from "@mui/material";
import { ShoppingCartOutlined, StarBorderRounded, CheckCircleOutlineRounded, AccessTimeRounded, LocalShippingOutlined, KeyboardDoubleArrowDownRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "@/libs/Store";
import { fetchProduct } from "@/libs/ProductPage/thunk";
import { clearProductState } from "@/libs/ProductPage/slice";
import ProductPageSlider from "@/components/ProductPage/ProductPageSlider/ProductPageSlider";
import ProductPageSpecificationTable from "@/components/ProductPage/ProductPageSpecification/ProductPageSpecificationTable";
import OpinionsSection from "@/components/ProductPage/ProductPageOpinions/OpinionsSection";
import ProductPageSpecificationPrimary from "@/components/ProductPage/ProductPageSpecification/ProductPageSpecificationPrimary";
import { formatAmount } from "@/libs/Helpers/Formatters";
import QuantityInput from "@/components/Shared/QuantityInput/QuantityInput";
import { addProductToCart } from "@/libs/Cart/thunks";
import { Breadcrumb, useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import Error from "@/components/Layout/Error/Error";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";

interface ProductPageParams {
	params: { id: string };
}

const ProductPage: FC<ProductPageParams> = ({ params }) => {
	const dispatch = useDispatch();

	const [quantity, setQuantity] = useState(1);

	const productSelector = useSelector((state) => state.ProductPageStore.product.data);
	const errorSelector = useSelector((state) => state.ProductPageStore.product.error);
	const isLoadingSelector = useSelector((state) => state.ProductPageStore.product.error);
	const productHierarchySelector = useSelector((store) => store.LayoutStore.productHierarchy.data);

	useEffect(() => {
		dispatch(fetchProduct(params.id));

		return () => {
			dispatch(clearProductState());
		};
	}, []);

	const handleAddToCart = () => {
		dispatch(addProductToCart(productSelector?.id!, quantity, productSelector?.amount!, productSelector?.currency!));
	};

	const breadcrumbsItems = useMemo<Breadcrumb[]>(() => {
		const breadcrumbs: Breadcrumb[] = [];

		breadcrumbs.push({ label: "electro", link: "/" });

		if (!productSelector) return breadcrumbs;

		const group = productHierarchySelector.groups?.find((g) => g.id === productSelector.groupId);
		const category = group?.categories?.find((c) => c.id === productSelector.categoryId);
		const subCategory = category?.subCategories?.find((sc) => sc.id === productSelector.subCategoryId);

		if (group && group.name) {
			breadcrumbs.push({ label: group.name, link: `/search?group=${group.id}` });
		}
		if (category && category.name && group) {
			breadcrumbs.push({ label: category.name, link: `/search?group=${group.id}&category=${category.id}` });
		}
		if (subCategory && subCategory.name && category && group) {
			breadcrumbs.push({ label: subCategory.name, link: `/search?group=${group.id}&category=${category.id}&subCategory=${subCategory.id}` });
		}

		return breadcrumbs;
	}, [productSelector, productHierarchySelector]);

	useBreadcrumbs(breadcrumbsItems);

	if (errorSelector) return <Error message="Błąd podczas pobierania produktu"></Error>;
	if (productSelector)
		return (
			<Box>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, md: 6 }}>
						<ProductPageSlider photos={productSelector.photos ?? []}></ProductPageSlider>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<Stack spacing={1}>
							<Typography variant="h6">{productSelector.name}</Typography>
							<Stack direction={"row"} alignItems={"center"} spacing={1}>
								<Rating size="small" value={productSelector.averageOpinionRating} readOnly precision={0.5} emptyIcon={<StarBorderRounded style={{ opacity: 0.5 }} fontSize="inherit" />} />
								<Typography variant="caption">({productSelector.opinionCount}) opinii</Typography>
							</Stack>
							<div>
								<Grid container direction={"row"} size={{ xs: 12 }} spacing={2}>
									<Grid size={{ xs: 6 }}>
										<ProductPageSpecificationPrimary specification={productSelector.attributes ?? []} />
										<Button color="inherit" variant="text" fullWidth endIcon={<KeyboardDoubleArrowDownRounded />}>
											Przewiń do pełnej specyfikacji
										</Button>
									</Grid>
									<Grid size={{ xs: 6 }}>
										<Card sx={{ padding: 2 }}>
											<Stack spacing={1}>
												<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
													<QuantityInput value={quantity} id={productSelector.id!} onChange={(q) => setQuantity(q)}></QuantityInput>
													<Typography variant="h6" textAlign={"end"}>
														{formatAmount(productSelector.amount!, productSelector.currency!)}
													</Typography>
												</Stack>
												<Button onClick={handleAddToCart} variant="contained" color="success" startIcon={<ShoppingCartOutlined />}>
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
					<div dangerouslySetInnerHTML={{ __html: productSelector.description! }} />
				</Box>
				<Box>
					<Typography variant="h6">Specyfikacja</Typography>
					<ProductPageSpecificationTable specification={productSelector.attributes ?? []} />
				</Box>
				<Box>
					<Typography variant="h6">Akcesoria</Typography>
				</Box>
				<Box>
					<Typography variant="h6">Opinie</Typography>
					<OpinionsSection productId={productSelector.id} />
				</Box>
			</Box>
		);
	return <FullScreenLoader isVisible></FullScreenLoader>;
};

export default ProductPage;
