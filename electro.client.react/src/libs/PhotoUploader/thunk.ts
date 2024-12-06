import { AppDispatch, RootState } from "@/libs/Store";
import axios from "axios";
import { photoUplaoderEror, photoUplaoderStart, photoUplaoderSuccess } from "./slice";
import { IError } from "@/libs/api-contract/Error";
import { IUploadPhotoResult } from "./interface";

export const uploadPhotos = () => async (dispatch: AppDispatch, getState: () => RootState): Promise<string[]> => {
		const state = getState();
		const newFiles = state.PhotoUploader.items.filter((item) => item.photo instanceof File).map((item) => item.photo as File);

		if (newFiles.length === 0) return [];
		dispatch(photoUplaoderStart());
		try {
			const formData = new FormData();
			newFiles.forEach((file) => formData.append("files", file));
			const response = await axios.post<IUploadPhotoResult>(`https://files.durundur.online/upload`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const updatedFiles = state.PhotoUploader.items.map((item, index) => {
				if (item.photo instanceof File) {
					return response.data.files[index];
				}
				return item.photo;
			});
			dispatch(photoUplaoderSuccess({ files: updatedFiles }));
			return updatedFiles;
		} catch (error: any) {
			dispatch(photoUplaoderEror(error as IError));
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
