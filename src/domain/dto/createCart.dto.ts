import type { Sizes } from "../../../generated/prisma/enums";



export class CreateCartDto {

    private constructor(
        public readonly createCartItemDto:CreateCartItemDto[],
    ){}


    static dto (object:{[key:string]:any}): [string | undefined, CreateCartDto | undefined] {

        const{createCartItemDto} = object;

        if(!createCartItemDto) return ['Los items son requeridos', undefined];

        return [undefined, new CreateCartDto(createCartItemDto)];
    }

}

export class CreateCartItemDto {

    private constructor(
        public readonly userId:number,
        public readonly productId: number,
        public readonly unit: number,
        public readonly size: Sizes,
    ){}


    static dto (object:{[key:string]:any}): [string | undefined, CreateCartItemDto | undefined] {

        const{userId, productId, unit, size} = object;

        if(!userId) return ['El usuario es requerido', undefined];
        if(!productId) return ['El producto es requerido', undefined];
        if(!unit) return ['La cantidad es requerida', undefined];
        if(isNaN(+unit)) return ['La cantidad debe ser un numero', undefined];
        if(!size) return ['El size es requerido', undefined];

        return [undefined, new CreateCartItemDto(userId, productId, unit, size)];
    }

}