


export class CustomResponseData extends Error {

    private constructor(
        public readonly statusCode:number,
        public readonly message:string,
    ){
        super(message)
    }

    static badRequest(message:string) {
        
        return new CustomResponseData(400, message);
    }

    static notFound(message:string) {
        
        return new CustomResponseData(404, message);
    }

    static ok(message:string) {
        
        return new CustomResponseData(200, message);
    }

    static created(message:string) {
        
        return new CustomResponseData(201, message);
    }

    static unAuthorized(message:string) {
        
        return new CustomResponseData(401, message);
    }

    static internalError(message:string) {
        
        return new CustomResponseData(500, message);
    }
}