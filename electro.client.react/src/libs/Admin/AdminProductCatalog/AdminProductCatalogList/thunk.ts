import { AppDispatch } from "@/libs/Store";
import { fetchProductCatalogListError, fetchProductCatalogListStart, fetchProductCatalogListSuccess } from "./slice";
import axios from "axios";
import { GetProductCatalogResult } from "@/libs/api-contract/api-contract";
import { IError } from "@/libs/api-contract/Error";
import { GetProductCatalogQuery } from "./interfaces";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";

export const fetchProductCatalogList = (query: GetProductCatalogQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductCatalogListStart());
		const response = await axios.get<GetProductCatalogResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/products/productCatalog?${buildQueryString(query)}`);
		dispatch(fetchProductCatalogListSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductCatalogListError(error as IError));
	}
};
