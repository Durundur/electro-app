import type { IPaginationParams } from "~/types/Api/PagedResult";
import type { ICreateOpinion, IOpinionWithUserAction, IProductOpinionsResult, UserOpinionAction } from "~/types/Opinion/Opinion";
import utlis from "~/utlis";

export const useOpinionStore = defineStore("opinion-store", () => {
	const getProductOpinions = (
		productId: string,
		paginationParams?: IPaginationParams,
		rating?: number,
	) => {
		const { $api } = useNuxtApp();
		const params = utlis.paramsToString(paginationParams, { rating });
		const result = $api.get<IProductOpinionsResult>(
			`api/opinions/product/${productId}?${params}`,
		);
		return result;
	};

	const createProductOpinion = (productId: string, opinion: ICreateOpinion) => {
        const { $api } = useNuxtApp();
		const result = $api.post<IOpinionWithUserAction>(`api/opinions/product/${productId}`, opinion);
		return result;
	};

	const rateProductOpinion = (opinionId: string, action: UserOpinionAction) => {
		const { $api } = useNuxtApp();
		const result = $api.post<IOpinionWithUserAction>(`api/opinions/${opinionId}/${action.toString()}`);
		return result;
	}

	return {
		getProductOpinions,
        createProductOpinion,
		rateProductOpinion
	};
});
