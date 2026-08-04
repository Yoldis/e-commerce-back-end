


export class ProductEntity {

    private constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly description:string,
        public readonly price:number,
        public readonly inStock:number,
        public readonly sizes:string[],
        public readonly productCategories:Object[],
        public readonly productImages:Object[],
        public readonly offers:Object[],
    ){}


    static objectProducts = (object:{[key:string]:any}):ProductEntity => {


        const {id, name, description, price, inStock, sizes, productCategories, productImages, offers} = object;

        return new ProductEntity(id,name, description, price, inStock, sizes, productCategories, productImages, offers);
    }
}