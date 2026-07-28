import type { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../db/prismaClient";
import { MessageApiService } from '../services/message.api.service';


export class ValidateTokenMiddleware {

    constructor(
        private readonly messageApiService:MessageApiService
    ){}

    public validate = async (req:Request, res:Response, next:NextFunction) => {
        const token = req.header('x-token');
        if(!token) {
            this.messageApiService.unAuthorized("No hay token en la peticion", null, res);
            return;
        }
        
        try {
            const data = await JwtAdapter.decodeToken(token);
            
            if(!data) {
                this.messageApiService.unAuthorized("El token no es valido", null, res);
                return;
            }

            const user = await prisma.user.findUnique({
                where:{id:data.id}
            });

            if(!user) {
                this.messageApiService.unAuthorized("El usuario no existe", null, res);
                return;
            }

            next();

        } catch (error) {
            throw error;
        }
    }
}