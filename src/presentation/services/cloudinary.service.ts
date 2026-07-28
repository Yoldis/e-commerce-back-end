import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { type UploadedFile } from 'express-fileupload';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export class CloudinaryService {

    public async uploadFile(file: UploadedFile, folder = 'E-Commerce'): Promise<UploadApiResponse> {
        const result = await cloudinary.uploader.upload(
            file.tempFilePath,
            {
                folder,
                resource_type: 'auto',
            },
        );

        return result;
    }

    async deleteFile(publicId: string) {
        return cloudinary.uploader.destroy(publicId);
    }

    public async uploadFiles(files: UploadedFile[], folder = 'E-Commerce') {
        return Promise.all(
        files.map(file => this.uploadFile(file, folder)),
        );
    }

    async deleteFiles(publicIds: string[]) {
        return Promise.all(
        publicIds.map(id => this.deleteFile(id)),
        );
    }

    async getFiles(folder: string) {
        const { resources } = await cloudinary.api.resources({
            type: 'upload',
            prefix: folder,
            max_results: 500,
        });

        return resources;
    }
}