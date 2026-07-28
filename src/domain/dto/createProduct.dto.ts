import type { Sizes } from "../../../generated/prisma/enums";


export class CreateProductDto {
    private constructor(
        public readonly name:string,
        public readonly description:string,
        public readonly price:number,
        public readonly inStock:number,
        public readonly sizes:Sizes[],
        public readonly categoriesIds:number[],
        public readonly companyId:number,
        public readonly id?:number,
    ){}


   static dto(object: { [key: string]: any }): [string | undefined, CreateProductDto | undefined] {
        let {
            name,
            description,
            price,
            inStock,
            sizes,
            categoriesIds,
            companyId,
            id,
        } = object;


        if (!name) return ['El nombre es requerido', undefined];
        if (!description) return ['La descripción es requerida', undefined];

        if (price === undefined || price === null)
            return ['El precio es requerido', undefined];

        if (isNaN(Number(price)))
            return ['El precio debe ser un número', undefined];

        if (inStock === undefined || inStock === null)
            return ['El stock es requerido', undefined];

        if (isNaN(Number(inStock)))
            return ['El stock debe ser un número', undefined];

        if (isNaN(Number(companyId)))
            return ['La empresa es requerida', undefined];

        if (!sizes.length) 
            return ['Debe enviar al menos una talla', undefined];

        if(!Array.isArray(sizes)) sizes = [sizes];

        if (!categoriesIds.length)
            return ['Debe enviar al menos una categoría', undefined];

        if(!Array.isArray(categoriesIds)) categoriesIds = [categoriesIds];

        return [
            undefined,
            new CreateProductDto(
                name.trim(),
                description.trim(),
                Number(price),
                Number(inStock),
                sizes,
                categoriesIds,
                +companyId,
                +id,
            ),
        ];
    }
}