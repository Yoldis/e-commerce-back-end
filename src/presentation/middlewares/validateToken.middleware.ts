import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../db/prismaClient";


export class ValidateTokenMiddleware {

    static async validate(req:Request, res:Response, next:NextFunction){
        const token = req.header('x-token');

        if(!token) {
            res.status(401).json({error:"No hay token en la peticion"})
            return;
        }
        
        try {
            const data = await JwtAdapter.decodeToken(token);
            
            if(!data) {
                res.status(401).json({error:"El token no es valido"})
                return;
            }

            const user = await prisma.user.findUnique({
                where:{id:data.id}
            });

            if(!user) {
                res.status(401).json({error:"El usuario no existe"})
                return;
            }

            next();

        } catch (error) {
            throw error
        }
    }
}