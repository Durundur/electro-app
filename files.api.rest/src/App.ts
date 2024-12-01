import express from "express";
import { MongoClient, GridFSBucket } from "mongodb";
import multer from "multer";
import cors from "cors";
import "dotenv/config";
import { FileController } from "./FileController";
import { FileService } from "./FileService";

export class App {
	private app: express.Application;
	private fileController!: FileController;

	constructor(port: number, mongoUrl: string) {
		this.app = express();
		this.app.use(cors());
		this.start(port, mongoUrl);
	}

	private setupRoutes(): void {
		const upload = multer({ storage: multer.memoryStorage() });

		this.app.post("/upload", upload.array("files", 10), this.fileController.uploadFiles.bind(this.fileController));
		this.app.get("/file/:id", this.fileController.getFile.bind(this.fileController));
	}

	async start(port: number, mongoUrl: string): Promise<void> {
		const client = await MongoClient.connect(mongoUrl);
		const db = client.db();
		const bucket = new GridFSBucket(db);
		this.fileController = new FileController(new FileService(bucket));
		this.setupRoutes();

		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}
