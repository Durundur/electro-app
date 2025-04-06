"use client";
import ShopRootBestsellersSection from "@/components/ShopRootPage/ShopRootBestsellersSection/ShopRootBestsellersSection";
import ShopRootFeaturedSection from "@/components/ShopRootPage/ShopRootFeaturedSection/ShopRootFeaturedSection";
import ShopRootPromotionHighlight from "@/components/ShopRootPage/ShopRootPromotionHighlight/ShopRootPromotionHighlight";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";
import { useSelector } from "@/libs/Store";
import { Grid2 } from "@mui/material";
import { FC } from "react";

const ShopRootPage: FC = () => {
	const isLoadingFeaturedProductsSelector = useSelector((store) => store.ShopRootPageStore.featured.isLoading);
	const isLoadingBestsellerProductsSelector = useSelector((store) => store.ShopRootPageStore.bestsellers.isLoading);
	const isLoadingPromotionHighlightSelector = useSelector((store) => store.ShopRootPageStore.promotionHighlight.isLoading);

	usePageTransition([isLoadingFeaturedProductsSelector, isLoadingBestsellerProductsSelector, isLoadingPromotionHighlightSelector]);

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 4 }} marginBottom={1}>
				<ShopRootPromotionHighlight></ShopRootPromotionHighlight>
			</Grid2>
			<Grid2 size={{ xs: 12, md: 8 }}>
				<ShopRootFeaturedSection></ShopRootFeaturedSection>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<ShopRootBestsellersSection></ShopRootBestsellersSection>
			</Grid2>
		</Grid2>
	);
};

export default ShopRootPage;
