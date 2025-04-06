import { AppDispatch, RootState } from "@/libs/Store";
import axios from "axios";
import { photoUplaoderEror, photoUplaoderStart, photoUplaoderSuccess } from "./slice";
import { createError } from "@/libs/api-contract/Error";
import { IUploadPhotoResult } from "./interface";
import { base64ToFile } from "./utils";

const UPLOAD_FILES_URL = `${process.env.NEXT_PUBLIC_API_FILES_URL}/upload`;

export const uploadPhotos =
	() =>
	async (dispatch: AppDispatch, getState: () => RootState): Promise<string[]> => {
		const state = getState();
		const { items } = state.PhotoUploaderStore;

		const base64Items = items.filter((item) => item.isBase64);
		const existingUrls = items.filter((item) => !item.isBase64).map((item) => item.photo);

		if (base64Items.length === 0) return existingUrls;

		dispatch(photoUplaoderStart());
		try {
			const formData = new FormData();

			base64Items.forEach((item) => {
				const file = base64ToFile(item.photo, item.fileName || `image-${item.id}.jpg`);
				formData.append("files", file);
			});

			const response = await axios.post<IUploadPhotoResult>(UPLOAD_FILES_URL, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			const uploadedUrls = response.data.files;
			const allUrls = items.map((item) => (item.isBase64 ? uploadedUrls.shift()! : item.photo));

			dispatch(photoUplaoderSuccess({ files: allUrls }));
			return allUrls;
		} catch (error: any) {
			dispatch(photoUplaoderEror(createError(error)));
			throw error;
		}
	};

export const deletePhoto = (id: string) => async (dispatch: AppDispatch) => {};
