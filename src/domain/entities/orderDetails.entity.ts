


export class OrderDetailsEntity {

    private constructor(
        public readonly id:string,
        public readonly product:string,
        public readonly image:string,
        public readonly price:number,
        public readonly size:string,
        public readonly subTotal:number,
        public readonly unit:number,
    ){}


    static objectDetails(object:{[key:string]:any}):OrderDetailsEntity {

        const{id, product, image, price, size, subTotal, unit} = object

        // Se puede aplicar comprobaciones para verificar si estos valores de verdad existen

        return new OrderDetailsEntity(id, product, image, price, size, subTotal, unit);
    }
}