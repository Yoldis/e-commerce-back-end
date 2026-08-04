import type { OffertType } from "../../../generated/prisma/enums";


export class CreateOfferDto {

    private constructor(
        public readonly companyId:number,
        public readonly productId:number,
        public readonly type:OffertType,
        public readonly value:number,
        public readonly startDate:Date,
        public readonly endDate:Date,
        public readonly isActive:boolean,
        public readonly description?:string,
    ){}


    static dto (object:{[key:string]:any}):[string | undefined, CreateOfferDto?] {
        const{companyId, productId, type, value, startDate, endDate, isActive, description} = object;

        if(!companyId) return ['La empresa es requerida'];
        if(!productId) return ['El producto es requerido'];
        if(!type) return ['El tipo es requerido'];
        if(!value) return ['El valor es requerido'];
        if(!startDate) return ['La fecha de incio es requerida'];
        if(!endDate) return ['La fecha de fin es requerida'];

        return [undefined, new CreateOfferDto(companyId, productId, type, value, startDate, endDate, isActive, description)];
    }

}