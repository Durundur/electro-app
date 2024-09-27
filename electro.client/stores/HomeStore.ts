import { parseError, type IError } from "~/types/Api/Error";
import type { IPagedResult, IPaginationParams } from "~/types/Api/PagedResult";
import type { IProductOverview } from "~/types/Product/Product";

interface IHomeStore {
	recommendedProducts: IRecommendedProductsStore;
	bestsellersProducts: IBestsellersProductsStore;
	productsHits: IProductsHitsStore;
}

interface IRecommendedProductsStore {
	isPending: boolean;
	error?: IError;
	products: IProductOverview[];
}

interface IBestsellersProductsStore {
	isPending: boolean;
	error?: IError;
	products: IProductOverview[];
}

interface IProductsHitsStore {
	isPending: boolean;
	error?: IError;
	products: IProductOverview[];
}

const initialHomeStore: IHomeStore = {
	recommendedProducts: {
		isPending: false,
		error: undefined,
		products: []
	},
	bestsellersProducts: {
		isPending: false,
		error: undefined,
		products: []
	},
	productsHits: {
		isPending: false,
		error: undefined,
		products: []
	}
}

export const useHomeStore = defineStore("home-store", () => {
	const config = useRuntimeConfig();
	const store = ref<IHomeStore>(initialHomeStore);

	const getRecommendedProducts = async (paginationParams: IPaginationParams) => {
		store.value.recommendedProducts.isPending = true;
		try{
			const result = await $fetch<IPagedResult<IProductOverview>>(`${config.public.API_BASE}/api/products/recommended`, {params: paginationParams});
			store.value.recommendedProducts.products = result.data;
			store.value.recommendedProducts.error = undefined;
		}
		catch(e){
			const error = parseError(e);
			store.value.recommendedProducts.error = error;
		}
		finally {
			store.value.recommendedProducts.isPending = false;
		}
	};

	const getBestsellersProducts = async (paginationParams: IPaginationParams) => {
		store.value.bestsellersProducts.isPending = true;
		try{
			const result = await $fetch<IPagedResult<IProductOverview>>(`${config.public.API_BASE}/api/products/bestsellers`, {params: paginationParams});
			store.value.bestsellersProducts.products = result.data;
			store.value.bestsellersProducts.error = undefined;
		}
		catch(e){
			const error = parseError(e);
			store.value.bestsellersProducts.error = error;
		}
		finally {
			store.value.bestsellersProducts.isPending = false;
		}
	};

	const getProductsHits = async (paginationParams: IPaginationParams) => {
		store.value.productsHits.isPending = true;
		try{
			const result = await $fetch<IPagedResult<IProductOverview>>(`${config.public.API_BASE}/api/products/hits`, {params: paginationParams});
			store.value.productsHits.products = result.data;
			store.value.productsHits.error = undefined;
		}
		catch(e){
			const error = parseError(e);
			store.value.productsHits.error = error;
		}
		finally {
			store.value.productsHits.isPending = false;
		}
	};

	return {
		getRecommendedProducts,
		getBestsellersProducts,
		getProductsHits,
		store
	};
});
