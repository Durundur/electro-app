import { AppDispatch } from "../Store";
import { GetMenuResult } from "../api-contract/api-contract";
import { fetchProductHierarchyError, fetchProductHierarchySuccess, fetchProductHierarchyStart } from "./slice";
import axios from "axios";

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		const response = await axios.get<GetMenuResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/menu`);
		dispatch(fetchProductHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(error as Error));
	}
};
