


export class CustomError extends Error {

    private constructor(
        public readonly statusCode:number,
        public readonly message:string,
    ){
        super(message)
    }

    static badRequest(message:string) {
        
        return new CustomError(400, message);
    }

    static unAuthorized(message:string) {
        
        return new CustomError(401, message);
    }

    static internalError(message:string) {
        
        return new CustomError(500, message);
    }
}