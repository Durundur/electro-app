export interface IUploadPhotoResult {
	files: string[];
}

export interface IPhotoItem {
	id: number;
	fileName?: string;
	photo: string;
	isBase64?: boolean;
}
