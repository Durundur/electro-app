import { Request, Response } from "express";
import { FileService } from "./FileService";


export class FileController {
    private fileService: FileService;

    constructor(fileService: FileService) {
        this.fileService = fileService;
    }

    async uploadFiles(req: Request, res: Response): Promise<void> {
        if (!req.files || req.files.length === 0) {
            res.status(400).send('No files uploaded');
            return;
        }

        try {
            const files = req.files as Express.Multer.File[];
            const fileIds = await this.fileService.uploadFiles(files);
            res.status(200).json({ fileIds });
        } catch (error) {
            res.status(500).send('Error uploading files');
        }
    }

    async getFile(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const { stream, contentType } = await this.fileService.getFile(id);
            res.setHeader('Content-Type', contentType);
            stream.pipe(res);
        } catch (error) {
            if (error instanceof Error && error.message === 'File not found') {
                res.status(404).send('File not found');
            } else {
                res.status(500).send('Error retrieving file');
            }
        }
    }
}