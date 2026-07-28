import type { CompanyEntity } from "./company.entity";



export class CategoryEntity {

    private constructor(
        public readonly id:number,
        public readonly name:string,
        public readonly description:string,
        public readonly companyId:number,
        public readonly company?:CompanyEntity,
    ){}


    static objectCategory(category:CategoryEntity){
        const{id, name, description, companyId, company} = category;

        return new CategoryEntity(id, name, description, companyId, company);
    }
}