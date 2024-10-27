

export class RegisterUserDto {

    private constructor(
        public readonly name:string,
        public readonly email:string,
        public readonly password:string,
    ){}


    static registerDto (obejct:{[key:string]:any}):[string?, RegisterUserDto?] {

        const{name, email, password} = obejct;

        if(!name) return ['El nombre es requerido'];

        // Se podria seguir validando a mas profundidad el email
        if(!email) return ['El email es requerido'];
        if(!(email as string).includes('@') || !(email as string).includes('.com')) return ['El email no es valido'];
        if(!password) return ['El password es requerido'];
        if(typeof password === 'string' && (password as string).length < 6) return ['El password debe tener al menos 6 caracteres'];

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}