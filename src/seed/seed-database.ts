import { prisma } from "../db/prismaClient";
import { usersSeed, roleSeed } from "./seed";


export const generateSeed = async () => {
    try {
        // 1. Eliminamos todos los datos
        await prisma.user.deleteMany();
        await prisma.role.deleteMany();
    
        // 8. Crear los roles
        await prisma.role.createMany({
            data:roleSeed.map(c => ({
                name:c.name
            }))
        });
    
        // 9. Creamos los usuarios
        await prisma.user.createMany({
            data:usersSeed.map(user => ({
                email:user.email,
                name:user.name,
                password:user.password,
                roleId:user.roleId,
            }))
        })
        console.log("Seed ejecutado correctamente.");
    
    } catch (error) {
        console.log(error)
        console.log("Algo salio mal al ejecutar el Seed.");
    }

}