


export class ProductsEntity {

    private constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly description:string,
        public readonly price:number,
        public readonly inStock:number,
        public readonly sizes:string[],
        public readonly productCategories:Object[],
        public readonly productImages:Object[],
    ){}


    static objectProducts = (object:{[key:string]:any}):ProductsEntity => {


        const {id, name, description, price, inStock, sizes, productCategories, productImages} = object;

        return new ProductsEntity(id,name, description, price, inStock, sizes, productCategories, productImages);
    }
}