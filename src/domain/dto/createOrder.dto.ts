import type { CartEntity } from "../entities/cart.entity";
export class CreateOrderDto {

    private constructor(
        public readonly userId:number,
        public readonly isPaid:boolean,
        public readonly orderDetails:CartEntity[],
        public id?:number,
    ){}


    static createDto(object:{[key:string]:any}):[string | undefined, CreateOrderDto?] {

        const{userId, isPaid, orderDetails, id} = object;
        if(!userId) return ['El usuario es requerido'];
        if(!orderDetails) return ['Los productos no existen'];
        if(!Array.isArray(orderDetails)) return ['Los productos deben ser un array']
        if(orderDetails.length === 0 ) return ['No hay items para comprar']

        return [undefined, new CreateOrderDto(userId, isPaid, orderDetails, id)]
    }
}