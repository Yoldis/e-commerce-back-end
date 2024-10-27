import jwt from 'jsonwebtoken'


interface Payload {
    id:string
}

const SECRET_TOKEN = process.env.SECRET_TOKEN ?? '123123';

export class JwtAdapter {

    static generateToken (payload:Payload) {

        return new Promise((resolve) => {
            jwt.sign(payload, SECRET_TOKEN, {expiresIn:'2h'}, (error, token) => {
                if(error) return resolve(null);
                resolve(token);
            })
        })
    }


    static decodeToken(token:string):Promise<Payload|null> {
        return new Promise((resolve) => {
            jwt.verify(token, SECRET_TOKEN, (error, token) => {
                if(error) return resolve(null);
                resolve(token as Payload);
            })
        })
    }
}