
import bcrypt from "bcrypt";

export class BcryptAdapter {


    static generateHash(password:string):string {

        const hash = bcrypt.hashSync(password, 10);
        return hash;
    }

    static compareHash(password:string, passwordHash:string):boolean {

        const hash = bcrypt.compareSync(password, passwordHash);
        return hash;
    }
}