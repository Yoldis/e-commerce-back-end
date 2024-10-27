import { CustomError } from "../errors/customError.error";



export class UserEntity {

    private constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly email:string,
        public readonly role:string,
    ) {}

    static objectUser(object:{[key:string]:any}):UserEntity{

        const {id, name, email, role} = object;

        // Aqui podemos hacer validaciones de entrada
        if(!id) throw CustomError.badRequest('El id no existe');

        return new UserEntity(id, name, email, role);
    }
}