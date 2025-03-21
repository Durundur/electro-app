"use client";
import ProductCard from "@/components/Shared/ProductCard/ProductCard";
import ProductCardContainer from "@/components/Shared/ProductCardContainer/ProductCardContainer";
import { clearFeaturedProductsState } from "@/libs/ShopRootPage/slice";
import { getFeaturedProducts } from "@/libs/ShopRootPage/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const ShopRootFeaturedSection = () => {
	const dispatch = useDispatch();
	const featuredProductsSelector = useSelector((state) => state.ShopRootPageStore.featured.data?.products);

	useEffect(() => {
		dispatch(getFeaturedProducts());

		return () => {
			dispatch(clearFeaturedProductsState());
		};
	}, []);

	const productCards = featuredProductsSelector?.map((product) => (
		<ProductCard key={product.id} id={product.id!} name={product.name!} photo={product.photo!} amount={product.amount!} currency={product.currency!} />
	));

	return (
		productCards && (
			<>
				<Typography variant="h6">Polecane</Typography>
				<ProductCardContainer cols={{ xs: 2, sm: 3, md: 4 }} rows={2} navigation={false}>
					{productCards}
				</ProductCardContainer>
			</>
		)
	);
};

export default ShopRootFeaturedSection;
