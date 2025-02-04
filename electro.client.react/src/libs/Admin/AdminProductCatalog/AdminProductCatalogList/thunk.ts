import { AppDispatch } from "@/libs/Store";
import { fetchProductCatalogListError, fetchProductCatalogListStart, fetchProductCatalogListSuccess } from "./slice";
import { GetProductCatalogResult } from "@/libs/api-contract/api-contract";
import { createError } from "@/libs/api-contract/Error";
import { GetProductCatalogQuery } from "./interfaces";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import ApiClient from "@/libs/api-contract/ApiClient";

export const fetchProductCatalogList = (query: GetProductCatalogQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductCatalogListStart());
		const response = await ApiClient.get<GetProductCatalogResult>(`/api/products/productCatalog?${buildQueryString(query)}`);
		dispatch(fetchProductCatalogListSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductCatalogListError(createError(error)));
	}
};
