import { IError } from "@/libs/api-contract/Error";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPhotoItem, IUploadPhotoResult } from "./interface";

interface IPhotoUploaderState {
	error?: IError;
	isLoading: boolean;
	result: string[];
	items: IPhotoItem[];
}

const initialState: IPhotoUploaderState = {
	isLoading: false,
	error: undefined,
	result: [],
	items: [],
};

const PhotoUploaderStore = createSlice({
	name: "PhotoUploaderSlice",
	initialState,
	reducers: {
		photoUplaoderStart(state) {
			state.error = undefined;
			state.isLoading = true;
		},
		photoUplaoderEror(state, action: PayloadAction<IError>) {
			state.isLoading = false;
			state.error = action.payload;
		},
		photoUplaoderSuccess(state, action: PayloadAction<IUploadPhotoResult>) {
			state.isLoading = false;
			state.error = undefined;
			state.result = action.payload.files;
		},
		photoUplaoderSetItems(state, action: PayloadAction<IPhotoItem[]>) {
			state.items = action.payload;
		},
		photoUplaoderClear(state) {
			state.isLoading = false;
			state.error = undefined;
			state.items = [];
			state.result = [];
		},
	},
});

export const { photoUplaoderEror, photoUplaoderStart, photoUplaoderSuccess, photoUplaoderClear, photoUplaoderSetItems } = PhotoUploaderStore.actions;

export default PhotoUploaderStore.reducer;
