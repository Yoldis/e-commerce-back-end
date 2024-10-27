



export class UpdateUserDto {

    private constructor(
        public readonly userId:string,
        public readonly name:string,
    ){}


    static updateDto (obejct:{[key:string]:any}):[string?, UpdateUserDto?] {

        const{userId, name} = obejct;

        if(!name) return ['El nombre es requerido'];
        if(!userId) return ['El usuario es requerido'];


        return [undefined, new UpdateUserDto(userId, name)];
    }
}