import type { ProductEntity } from "./product.entity";


export class OfferEntity {

    private constructor (
        public readonly id:number,
        public readonly productId:number,
        public readonly type:string,
        public readonly value:number,
        public readonly startDate:Date,
        public readonly endDate:Date,
        public readonly isActive:boolean,
        public readonly createdAt:Date,
        public readonly updatedAt:Date,
        public readonly description?:string,
        public readonly product?:ProductEntity,
    ) {}


    static obj(obj:OfferEntity) {
        const {id, productId, type, value, startDate, endDate, isActive, createdAt, updatedAt, description, product} = obj;
        return new OfferEntity(id, productId, type, value, startDate, endDate, isActive, createdAt, updatedAt, description, product);
    }
}

