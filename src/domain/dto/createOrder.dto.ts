

interface ProducInCart {
    id:string,
    product:string,
    image:string,
    size:string,
    price:number,
    unit:number,
    subTotal:number,
}

export class CreateOrderDto {

    private constructor(
        public readonly userId:string,
        public readonly isPaid:boolean,
        public readonly orderDetails:ProducInCart[],
        public readonly id?:string,
    ){}


    static createDto(object:{[key:string]:any}):[string?, CreateOrderDto?] {

        const{userId, isPaid, orderDetails, id} = object;
        if(!userId) return ['El usuario es requerido'];
        if(!orderDetails) return ['Los productos no existen'];
        if(!Array.isArray(orderDetails)) return ['Los productos deben ser un array']
        if(orderDetails.length ===0 ) return ['No hay items para comprar']

        return [undefined, new CreateOrderDto(userId, isPaid, orderDetails, id)]
    }
}