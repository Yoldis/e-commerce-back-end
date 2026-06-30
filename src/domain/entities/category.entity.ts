


export class CategoryEntity {

    private constructor(
        public readonly id:number,
        public readonly nombre:string
    ){}


    static objectCategory(category:CategoryEntity){
        const{id, nombre} = category;

        return new CategoryEntity(id, nombre);
    }
}