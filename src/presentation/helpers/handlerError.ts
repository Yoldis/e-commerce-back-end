import { Response } from "express"
import { CustomError } from "../../domain"



export const handleError = (error:unknown, res:Response) => {
    if(error instanceof CustomError) return res.status(error.statusCode).json({error:error.message})
    
    res.status(500).json({error:'Algo salio mal en el servidor'});
}