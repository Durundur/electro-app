"use client";
import ProductCard from "@/components/Shared/ProductCard/ProductCard";
import ProductCardContainer from "@/components/Shared/ProductCardContainer/ProductCardContainer";
import { clearBestsellerProductsState } from "@/libs/ShopRootPage/slice";
import { getBestsellerProducts } from "@/libs/ShopRootPage/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const ShopRootBestsellersSection = () => {
	const dispatch = useDispatch();
	const bestsellerProductsSelector = useSelector((state) => state.ShopRootPageStore.bestsellers.data?.products);

	useEffect(() => {
		dispatch(getBestsellerProducts());

		return () => {
			dispatch(clearBestsellerProductsState());
		};
	}, []);

	const productCards = bestsellerProductsSelector?.map((product) => (
		<ProductCard key={product.id} id={product.id!} name={product.name!} photo={product.photo!} amount={product.amount!} currency={product.currency!} />
	));

	return (
		productCards && (
			<>
				<Typography variant="h6">Bestsellery</Typography>
				<ProductCardContainer cols={{ xs: 2, sm: 3, md: 4, lg: 5 }} slidesPerGroup={{ xs: 1, sm: 2 }}>
					{productCards}
				</ProductCardContainer>
			</>
		)
	);
};

export default ShopRootBestsellersSection;
