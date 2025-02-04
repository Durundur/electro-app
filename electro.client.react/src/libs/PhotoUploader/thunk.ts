import { AppDispatch, RootState } from "@/libs/Store";
import axios from "axios";
import { photoUplaoderEror, photoUplaoderStart, photoUplaoderSuccess } from "./slice";
import { IError, createError } from "@/libs/api-contract/Error";
import { IUploadPhotoResult } from "./interface";

export const uploadPhotos = () => async (dispatch: AppDispatch, getState: () => RootState): Promise<string[]> => {
	const state = getState();
	const { items } = state.PhotoUploaderStore;

	const filesToUpload = items.filter((item) => item.photo instanceof File).map((item) => item.photo as File);
	const existingUrls = items.filter((item) => !(item.photo instanceof File)).map((item) => item.photo as string);

	if (filesToUpload.length === 0) return existingUrls;

	dispatch(photoUplaoderStart());
	try {
		const formData = new FormData();
		filesToUpload.forEach((file) => formData.append("files", file));
		const response = await axios.post<IUploadPhotoResult>(`https://files.durundur.online/upload`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		const uploadedUrls = response.data.files;
		const allUrls = items.map((item, index) => (item.photo instanceof File ? uploadedUrls.shift()! : item.photo));
		
		dispatch(photoUplaoderSuccess({ files: allUrls }));
		return allUrls;
	} catch (error: any) {
		dispatch(photoUplaoderEror(createError(error)));
		throw error;
	}
};

export const deletePhoto = (id: string) => async (dispatch: AppDispatch) => {
	// try {
	// 	dispatch(photoUplaoderStart());
	// 	const response = await axios.delete(`https://files.durundur.online/file/${id}`);
	// 	dispatch(photoUplaoderSuccess([]));
	// } catch (error: any) {
	// 	dispatch(photoUplaoderEror(error as IError));
	// }
};
