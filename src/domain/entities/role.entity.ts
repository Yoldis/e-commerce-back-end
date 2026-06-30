
export class RoleEntity {

    private constructor (
        public readonly id:number,
        public readonly nombre:string,
    ){}


    static objectRole (role:RoleEntity) {

        const{id, nombre} = role;

        return new RoleEntity(id, nombre);
    }

}