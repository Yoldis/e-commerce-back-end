import type { Response } from "express";
import { CustomResponseData } from "../../domain"



export const handleError = (error:unknown, res:Response) => {
    if(error instanceof CustomResponseData) return res.status(error.statusCode).json({error:error.message})
    
    res.status(500).json({error:'Algo salio mal en el servidor'});
}