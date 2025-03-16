"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Card, Grid2 as Grid, Paper, Rating, Stack, Typography } from "@mui/material";
import { ShoppingCartOutlined, StarBorderRounded, CheckCircleOutlineRounded, AccessTimeRounded, LocalShippingOutlined, KeyboardDoubleArrowDownRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "@/libs/Store";
import { fetchProduct } from "@/libs/ProductPage/thunk";
import { clearProductState } from "@/libs/ProductPage/slice";
import ProductPageSlider from "@/components/ProductPage/ProductPageOverview/ProductPageSlider/ProductPageSlider";
import ProductPageSpecificationTable from "@/components/ProductPage/ProductPageSpecification/ProductPageSpecificationTable";
import OpinionsSection from "@/components/ProductPage/ProductPageOpinions/OpinionsSection";
import ProductPageSpecificationPrimary from "@/components/ProductPage/ProductPageSpecification/ProductPageSpecificationPrimary";
import { formatAmount } from "@/libs/Helpers/Formatters";
import QuantityInput from "@/components/Shared/QuantityInput/QuantityInput";
import { addProductToCart } from "@/libs/Cart/thunks";
import { Breadcrumb, useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import Error from "@/components/Layout/Error/Error";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import ProductPageOverview from "@/components/ProductPage/ProductPageOverview/ProductPageOverview";
import Link from "next/link";
import useScrollTo from "@/hooks/ScrollTo/useScrollTo";

interface ProductPageParams {
	params: { id: string };
}

const ProductPage: FC<ProductPageParams> = ({ params }) => {
	const dispatch = useDispatch();
	const scrollTo = useScrollTo();

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
			<Stack spacing={2}>
				<ProductPageOverview product={productSelector} onAddToCart={handleAddToCart}></ProductPageOverview>
				<Stack component={Card} spacing={1} direction={"row"}>
					<Button color="inherit" onClick={() => scrollTo("description")}>
						Opis
					</Button>
					<Button color="inherit" onClick={() => scrollTo("specification")}>
						Specyfikacja
					</Button>
					<Button color="inherit" onClick={() => scrollTo("accessories")}>
						Akcesoria
					</Button>
					<Button color="inherit" onClick={() => scrollTo("opinions")}>
						Opinie
					</Button>
				</Stack>
				<Box>
					<Typography id="description" variant="h6">
						Opis
					</Typography>
					<div dangerouslySetInnerHTML={{ __html: productSelector.description! }} />
				</Box>
				<Box>
					<Typography id="specification" variant="h6">
						Specyfikacja
					</Typography>
					<ProductPageSpecificationTable specification={productSelector.attributes ?? []} />
				</Box>
				<Box>
					<Typography id="accessories" variant="h6">
						Akcesoria
					</Typography>
				</Box>
				<Box>
					<Typography id="opinions" variant="h6">
						Opinie
					</Typography>
					<OpinionsSection productId={productSelector.id} />
				</Box>
			</Stack>
		);
	return <FullScreenLoader isVisible></FullScreenLoader>;
};

export default ProductPage;
