"use client";
import ProductCard from "@/components/Shared/ProductCard/ProductCard";
import ProductContainer from "@/components/Shared/ProductCardContainer/ProductCardContainer";
import { clearBestsellerProductsState } from "@/libs/ShopRootPage/slice";
import { getBestsellerProducts } from "@/libs/ShopRootPage/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
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
			<ProductContainer cols={4} slidesPerGroup={2}>
				{productCards}
			</ProductContainer>
		)
	);
};

export default ShopRootBestsellersSection;
