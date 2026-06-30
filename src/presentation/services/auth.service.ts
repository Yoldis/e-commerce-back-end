import { BcryptAdapter } from "../../config";
import { prisma } from "../../db/prismaClient";

import { CustomResponseData, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";
import { JwtAdapter } from '../../config/jwt.adapter';

export class AuthService {
    

    public async registerUser(dataDto:RegisterUserDto){

        try {
            const existUser = await prisma.user.findUnique({where:{email:dataDto.email}});
            if(existUser) throw CustomResponseData.unAuthorized('El usuario ya existe');

            // Hash passowrd
            const passwordHash = BcryptAdapter.generateHash(dataDto.password);

            const user = await prisma.user.create({
                data:{
                    email:dataDto.email,
                    name:dataDto.name,
                    password:passwordHash,
                    roleId:dataDto.roleId
                }
            })
            
            // Generar token
            const token = await JwtAdapter.generateToken({id:user.id});
            if(!token) throw CustomResponseData.unAuthorized('Error al generar token');

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
            if(!user) throw CustomResponseData.unAuthorized('El usuario no existe');

            // Comprobar password
            const isCorrect = BcryptAdapter.compareHash(dataDto.password, user.password);
            if(!isCorrect) throw CustomResponseData.unAuthorized('Usuario o Contrasena incorrecta');

            // Generar token
            const token = await JwtAdapter.generateToken({id:user.id});
            if(!token) throw CustomResponseData.unAuthorized('Error al generar token');

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
            if(!verifyToken ) throw CustomResponseData.unAuthorized('Token invalido');

            const user = await prisma.user.findUnique({where:{id:verifyToken?.id}});
            if(!user) throw CustomResponseData.unAuthorized('Usuario no existe');

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
            if(!user) throw CustomResponseData.badRequest('El Usuario no existe');

            const userEntity = UserEntity.objectUser(user);

            return {
                user:userEntity
            }
            
        } catch (error) {
            throw error;
        }
    }
      
    public async getUsers(userId:number) {
        try {
            const user = await prisma.user.findUnique({where:{id:userId}, include:{role:true}});
            if(!user) throw CustomResponseData.badRequest("El usuario no existe");
            if(user.role.nombre !== 'Admin') throw CustomResponseData.badRequest("El usuario no tiene permisos");

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
