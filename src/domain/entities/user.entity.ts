import { CustomResponseData } from "../responseData/customResponseData";

export class UserEntity {

    private constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly email:string,
        public readonly role:string,
        public readonly createdAt:string,
    ) {}

    static objectUser(object:{[key:string]:any}):UserEntity{

        const {id, name, email, role, createdAt} = object;

        // Aqui podemos hacer validaciones de entrada
        if(!id) throw CustomResponseData.badRequest('El id no existe');

        return new UserEntity(id, name, email, role, createdAt);
    }
}