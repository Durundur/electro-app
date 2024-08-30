import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";
import sharp from "sharp";

export class FileService {
	private bucket: GridFSBucket;

	constructor(bucket: GridFSBucket) {
		this.bucket = bucket;
	}

	async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
		const uploadPromises = files.map(async (file) => {
			const processedBuffer = await this.processFile(file);
			return this.uploadFile(processedBuffer, file.originalname);
		});
		return Promise.all(uploadPromises);
	}

	async processFile(file: Express.Multer.File): Promise<Buffer> {
		const processedBuffer = await sharp(file.buffer)
			.resize(1000, 1000, { fit: "inside", withoutEnlargement: true })
			.webp({ quality: 75 })
			.toBuffer();
		return processedBuffer;
	}

	async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const readableStream = new Readable();
			readableStream.push(fileBuffer);
			readableStream.push(null);

			const uploadStream = this.bucket.openUploadStream(
				`${fileName}.webp`,
				{
					contentType: "image/webp",
				}
			);

			readableStream.pipe(uploadStream);

			uploadStream.on("finish", () => {
				resolve(uploadStream.id.toString());
			});

			uploadStream.on("error", reject);
		});
	}

	async getFile(
		id: string
	): Promise<{ stream: NodeJS.ReadableStream; contentType: string }> {
		const file = await this.bucket.find({ _id: new ObjectId(id) }).next();
		if (!file) {
			throw new Error("File not found");
		}

		const downloadStream = this.bucket.openDownloadStream(new ObjectId(id));
		return {
			stream: downloadStream,
			contentType: file.contentType as string,
		};
	}
}
