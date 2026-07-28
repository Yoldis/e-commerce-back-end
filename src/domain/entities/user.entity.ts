import { MessageApiService } from "../../presentation/services/message.api.service";
import type { RoleEntity } from "./role.entity";

export class UserEntity {

    private constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly email:string,
        public readonly roleId:number,
        public readonly role:RoleEntity,
        public readonly createdAt:string,
    ) {}

    static objectUser(object:{[key:string]:any}):UserEntity{

        const {id, name, email, roleId, role, createdAt} = object;

        // Aqui podemos hacer validaciones de entrada
        if(!id) throw MessageApiService.badRequest('El id no existe');

        return new UserEntity(id, name, email, roleId, role, createdAt);
    }
}