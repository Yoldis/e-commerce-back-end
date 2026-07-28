import type { NextFunction, Request, Response } from 'express';
import { MessageApiService } from '../services/message.api.service';
import type { UploadedFile } from 'express-fileupload';

export class ValidateFileMidleware {

    constructor(
        private readonly messageApiService:MessageApiService
    ){}

    public validate = (req: Request, res: Response, next: NextFunction, ) => {
        if (!req.files || !req.files.images) {
            this.messageApiService.badRequest('Debe enviar al menos una imagen.', null, res);
            return;
        }

        const files = req.files.images;
        const images: UploadedFile[] = Array.isArray(files) ? files : [files];

        const allowedMimeTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
        ];

        const maxSize = 5 * 1024 * 1024; // 5 MB

        for (const image of images) {
            if (!allowedMimeTypes.includes(image.mimetype)) {
                this.messageApiService.badRequest(`El archivo "${image.name}" no es una imagen válida.`, null, res);
                return;
            }

            if (image.size > maxSize) {
                this.messageApiService.badRequest( `La imagen "${image.name}" supera los 5 MB.`, null, res);
                return;
            }
        }

        next();
    };
}