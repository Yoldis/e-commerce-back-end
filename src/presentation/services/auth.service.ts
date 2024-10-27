import { BcryptAdapter } from "../../config";
import { prisma } from "../../db/prismaClient";
import { CustomError, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";
import { JwtAdapter } from '../../config/jwt.adapter';



export class AuthService {
    

    public async registerUser(dataDto:RegisterUserDto){

        try {
            const existUser = await prisma.user.findUnique({where:{email:dataDto.email}});
            if(existUser) throw CustomError.unAuthorized('El usuario ya existe');

            // Hash passowrd
            const passwordHash = BcryptAdapter.generateHash(dataDto.password);

            const user = await prisma.user.create({
                data:{
                    email:dataDto.email,
                    name:dataDto.name,
                    password:passwordHash 
                }
            })
            
            // Generar token
            const token = await JwtAdapter.generateToken({id:user.id});
            if(!token) throw CustomError.unAuthorized('Error al generar token');

            const userEntity = UserEntity.objectUser(user);

            return {
                user:userEntity,
                token
            }

        } catch (error) {
            throw error
        }
    }


    public async logiUser (dataDto:LoginUserDto) {

        try {
            const user = await prisma.user.findUnique({where:{email:dataDto.email}});
            if(!user) throw CustomError.unAuthorized('El usuario no existe');

            // Comprobar password
            const isCorrect = BcryptAdapter.compareHash(dataDto.password, user.password);
            if(!isCorrect) throw CustomError.unAuthorized('Usuario o Contrasena incorrecta');

            // Generar token
            const token = await JwtAdapter.generateToken({id:user.id});
            if(!token) throw CustomError.unAuthorized('Error al generar token');

            const userEntity = UserEntity.objectUser(user);

            return {
                user:userEntity,
                token
            }

        } catch (error) {
            throw error
        }
    }


    public async validateToken(token:string) {

        try {
            const verifyToken = await JwtAdapter.decodeToken(token);
            if(!verifyToken) CustomError.unAuthorized('Token invalido');

            const user = await prisma.user.findUnique({where:{id:verifyToken?.id}});
            if(!user) throw CustomError.unAuthorized('Usuario no existe');

            const userEntity = UserEntity.objectUser(user);

            return {
                user:userEntity
            }
            
        } catch (error) {
            throw error;
        }
    }


    
    public async updateUser(dataDto:UpdateUserDto) {
        try {
            await prisma.user.update({
                where:{id:dataDto.userId},
                data:{name:dataDto.name}
            })

            const user = await prisma.user.findUnique({where:{id:dataDto.userId}});
            if(!user) throw CustomError.badRequest('El Usuario no existe');

            const userEntity = UserEntity.objectUser(user);

            return {
                user:userEntity
            }
            
        } catch (error) {
            throw error;
        }
    }


      
    public async getUsers(userId:string) {
        try {
            const user = await prisma.user.findUnique({where:{id:userId}});
            if(!user) throw CustomError.badRequest("El usuario no existe");
            if(user.role !== 'Admin') throw CustomError.badRequest("El usuario no tiene permisos");

            const users = await prisma.user.findMany();

            
            const userEntity = users.map(user => UserEntity.objectUser(user));

            return {
                users:userEntity
            }
            
        } catch (error) {
            throw error;
        }
    }
}
