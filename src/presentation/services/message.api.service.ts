import type { Response } from "express";


interface dataResponse {
    ok:boolean,
    message:string,
    statusCode:number,
    data:any
}


export class MessageApiService  {

    public badRequest(message:string, data:any = null, res?:Response):Response | dataResponse {
        const statusCode = 400;
        if(res) return res.status(statusCode).json({statusCode, message, data, ok:!!data});
        return {statusCode, message, data, ok:!!data};
    }

    public notFound(message:string, data:any = null, res?:Response):Response | dataResponse {
        const statusCode = 404;
        if(res) return res.status(statusCode).json({statusCode, message, data, ok:!!data});
        return {statusCode, message, data, ok:!!data};
    }

    public ok(message:string, data:any = null, res?:Response):Response | dataResponse {
        const statusCode = 200;
        if(res) return res.status(statusCode).json({statusCode, message, data, ok:!!data});
        return {statusCode, message, data, ok:!!data};
    }

    public created(message:string, data:any = null, res?:Response):Response | dataResponse {
        const statusCode = 201;
        if(res) return res.status(statusCode).json({statusCode, message, data, ok:!!data});
        return {statusCode, message, data, ok:!!data};
    }

    public unAuthorized(message:string, data:any = null, res?:Response):Response | dataResponse {
        const statusCode = 401;
        if(res) return res.status(statusCode).json({statusCode, message, data, ok:!!data});
        return {statusCode, message, data, ok:!!data};
    }

    public internalError(message:string, data:any = null, res?:Response):Response | dataResponse {
        const statusCode = 500;
        if(res) return res.status(statusCode).json({statusCode, message, data, ok:!!data});
        return {statusCode, message, data, ok:!!data};
    }


    public handleError (data:dataResponse, res:Response):Response | dataResponse {
        
        if(data instanceof Error) return res.status(500).json({error:`Algo salio mal en el servidor - ${data.message}`});
        return res.status(data.statusCode).json({...data})
    }
}