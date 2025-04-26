import { createSlice } from "@reduxjs/toolkit";

const API_TYPE_KEY = "electro-api-type";

const getStoredApiType = (): "rest" | "graphql" => {
	if (typeof window === "undefined") return "graphql";

	const stored = localStorage.getItem(API_TYPE_KEY);
	return stored === "rest" || stored === "graphql" ? stored : "graphql";
};

interface ApiClientStore {
	apiType: "rest" | "graphql";
}

const initialState: ApiClientStore = {
	apiType: getStoredApiType(),
};

const ApiClientStore = createSlice({
	name: "ApiClientSlice",
	initialState,
	reducers: {
		toggleApiType(state) {
			state.apiType = state.apiType === "rest" ? "graphql" : "rest";
			if (typeof window !== "undefined") {
				localStorage.setItem(API_TYPE_KEY, state.apiType);
			}
		},
	},
});

export const { toggleApiType } = ApiClientStore.actions;

export default ApiClientStore.reducer;
