




export class CreateCategoryDto {

    private constructor(
        public readonly name:string,
        public readonly description:string,
        public readonly companyId:number,
    ){}


    static dto(payload:{[key:string]:string}):[string | undefined, CreateCategoryDto | undefined]{
        const{name, description, companyId} = payload;

        if(!name) return ["EL nombre es requerido", undefined];
        if(!description) return ["La descripcion es requerida", undefined];
        if(!companyId) return ["La empresa es requerida", undefined];

        return [undefined, new CreateCategoryDto(name, description, +companyId)];
    }
}