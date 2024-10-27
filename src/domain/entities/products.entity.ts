


export class ProductsEntity {

    private constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly description:string,
        public readonly price:number,
        public readonly inStock:number,
        public readonly sizes:string[],
        public readonly category:{id:string, name:string},
        public readonly image:{id:string, url:string}[],
    ){}


    static objectProducts = (object:{[key:string]:any}):ProductsEntity => {


        const {id,name, description, price, inStock, sizes, category, image} = object;

        return new ProductsEntity(id,name, description, price, inStock, sizes, category, image);
    }
}