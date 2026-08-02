import type { ProductEntity } from "./product.entity";
import type { UserEntity } from "./user.entity";





export class CartEntity {

    private constructor(
        public readonly id: number,
        public readonly productName:string,
        public readonly image:string,
        public readonly size:string,
        public readonly price:number,
        public readonly unit:number,
        public readonly subTotal:number,
        public readonly userId:number,
        public readonly productId:number,
        public readonly product?:ProductEntity,
        public readonly user?:UserEntity,
    ){}



    static object (object:{[key:string]:any}) {
        const{id, productName, image, size, price, unit, subTotal, userId, productId, product, user} =  object;

        return new CartEntity(id, productName, image, size, price, unit, subTotal, userId, productId, product, user);
    }
}