import type { UserEntity } from "./user.entity";





export class CartEntity {


    private constructor(
        public readonly id: number,
        public readonly product: string,
        public readonly image: string,
        public readonly size: string,
        public readonly price: number,
        public readonly unit: number,
        public readonly subTotal: number,
        public readonly userId:number,
        public readonly user?:UserEntity,
    ){}



    static object (object:{[key:string]:any}) {
        const{id, product, image, size, price, unit, subTotal, userId, user,} =  object;

        return new CartEntity(id, product, image, size, price, unit, subTotal, userId, user);
    }
}