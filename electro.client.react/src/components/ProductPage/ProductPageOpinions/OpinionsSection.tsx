import { FC, useEffect, useState } from "react";
import OpinionsStats from "./OpinionsStats";
import OpinionsWall from "./OpinionsWall";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "@/libs/Store";
import { getOpinions, getOpinionsStats } from "@/libs/ProductPage/thunk";
import { clearOpinionsState, clearOpinionsStatsState } from "@/libs/ProductPage/slice";
import Error from "@/components/Layout/Error/Error";
import CreateOpinion from "./CreateOpinion";

interface OpinionsSectionProps {
	productId?: string;
}

const OpinionsSection: FC<OpinionsSectionProps> = ({ productId }) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);

	const opinionsSelector = useSelector((store) => store.ProductPageStore.opinions.data?.items);
	const opinionsTotalPagesSelector = useSelector((store) => store.ProductPageStore.opinions.data?.totalPages) ?? 1;
	const opinionsCurrentPageSelector = useSelector((store) => store.ProductPageStore.opinions.data?.page);

	const opinionsErrorSelector = useSelector((store) => store.ProductPageStore.opinions.error);
	const opinionsIsLoadingSelector = useSelector((store) => store.ProductPageStore.opinions.isLoading);

	const opinionsStatsSelector = useSelector((store) => store.ProductPageStore.opinionsStats.data?.stats);
	const opinionsStatsErrorSelector = useSelector((store) => store.ProductPageStore.opinionsStats.error);
	const opinionsStatsIsLoadingSelector = useSelector((store) => store.ProductPageStore.opinionsStats.isLoading);

	const opinionsCountSelector = useSelector((store) => store.ProductPageStore.product.data?.opinionCount) ?? 0;
	const opinionsAvgRatingSelector = useSelector((store) => store.ProductPageStore.product.data?.averageOpinionRating) ?? 0;

	useEffect(() => {
		if (!productId) return;

		dispatch(
			getOpinions(productId, {
				page: currentPage,
				pageSize: 8,
				rating: selectedRating,
			})
		);

		return () => {
			dispatch(clearOpinionsState());
		};
	}, [productId, currentPage, selectedRating]);

	useEffect(() => {
		if (!productId) return;

		dispatch(getOpinionsStats(productId));

		return () => {
			dispatch(clearOpinionsStatsState());
		};
	}, [productId]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleRatingFilter = (rating: number | undefined) => {
		setSelectedRating(rating);
		setCurrentPage(1);
	};

	if (opinionsErrorSelector || opinionsStatsErrorSelector) {
		return <Error message="Wystąpił błąd podczas ładowania opinii"></Error>;
	}

	return (
		<Stack spacing={2}>
			<OpinionsStats
				avgOpinionsRating={opinionsAvgRatingSelector}
				opinionsCount={opinionsCountSelector}
				opinionsStats={opinionsStatsSelector ?? []}
				onRatingChnage={handleRatingFilter}
				selectedRating={selectedRating}
			/>
			 <CreateOpinion 
				productId={productId}
			/>
			<OpinionsWall 
				opinions={opinionsSelector ?? []} 
				totalPages={opinionsTotalPagesSelector} 
				currentPage={currentPage} 
				onPageChange={handlePageChange} 
			/>
		</Stack>
	);
};

export default OpinionsSection;
