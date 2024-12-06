import { AppDispatch } from "@/libs/Store";
import { fetchProductError, fetchProductStart, fetchProductSuccess } from "./slice";
import axios from "axios";
import { GetProductResult } from "@/libs/api-contract/api-contract";
import { IError } from "@/libs/api-contract/Error";

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductStart());
		const response = await axios.get<GetProductResult>(`http://localhost:5146/api/products/${productId}`);
		dispatch(fetchProductSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductError(error as IError));
	}
};
