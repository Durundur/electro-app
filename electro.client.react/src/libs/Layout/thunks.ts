import { AppDispatch } from "../Store";
import { GetMenuResult } from "../api-contract/api-contract";
import { fetchProductHierarchyError, fetchProductHierarchySuccess, fetchProductHierarchyStart } from "./slice";
import axios from "axios";

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		const response = await axios.get<GetMenuResult>("http://localhost:5146/api/ProductHierarchy/menu");
		dispatch(fetchProductHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(error as Error));
	}
};
