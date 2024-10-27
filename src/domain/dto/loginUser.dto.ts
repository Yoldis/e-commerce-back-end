



export class LoginUserDto {
    private constructor(
        public readonly email:string,
        public readonly password:string,
    ){}

    static loginDto (obejct:{[key:string]:any}):[string?, LoginUserDto?]{

        const{email, password} = obejct;

        if(!email) return ['El email es requerido'];
        if(!(email as string).includes('@') || !(email as string).includes('.com')) return ['El email no es valido'];
        if(!password) return ['El password es requerido'];
        if(typeof password === 'string' && (password as string).length < 6) return ['El password debe tener al menos 6 caracteres'];

        return [undefined, new LoginUserDto(email, password)];
    }
}