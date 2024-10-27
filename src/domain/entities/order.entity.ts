import { CustomError } from "../errors/customError.error";
import { OrderDetailsEntity } from "./orderDetails.entity";
import { UserEntity } from "./user.entity";



export class OrderEntity {

    private constructor(
        public readonly id:string,
        public readonly userId:string,
        public readonly isPaid:boolean,
        public readonly createdAt:Date,
        public readonly total:number,
        public readonly unitTotal:number,
        public readonly user:UserEntity,
        public readonly orderDetails:OrderDetailsEntity[],
    ){}


    static objectOrder (object:{[key:string]:any}):OrderEntity {
        const{id, userId, isPaid, createdAt, total, unitTotal, user, orderDetails} = object;

        // Se puede hacer validaciones
        if(!user.id) throw CustomError.badRequest('El usuario no existe');
        if(!Array.isArray(orderDetails)) throw CustomError.badRequest('Los detalles deben ser un arreglo');

        const orderDetailsEntity = orderDetails.map(order => OrderDetailsEntity.objectDetails(order))
        const userEntity = UserEntity.objectUser(user);

        return new OrderEntity(id, userId, isPaid, createdAt, total, unitTotal, userEntity, orderDetailsEntity);
    }
}