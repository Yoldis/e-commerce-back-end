import { BcryptAdapter } from "../../config";
import { prisma } from "../../db/prismaClient";

import { LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";
import { JwtAdapter } from '../../config/jwt.adapter';
import { Roles } from "../../../generated/prisma/enums";
import { MessageApiService } from './message.api.service';

export class AuthService {
    constructor(
        private readonly messageApiService:MessageApiService
    ){}

    public async registerUser(dataDto:RegisterUserDto){

        try {
            const existUser = await prisma.user.findUnique({where:{email:dataDto.email}});
            if(existUser) throw this.messageApiService.unAuthorized('El usuario ya existe');

            // Hash passowrd
            const passwordHash = BcryptAdapter.generateHash(dataDto.password);

            const user = await prisma.user.create({
                data:{
                    email:dataDto.email,
                    name:dataDto.name,
                    password:passwordHash,
                    roleId:dataDto.roleId
                },
                include:{role:true}
            })
            
            // Generar token
            const token = await JwtAdapter.generateToken({id:user.id});
            if(!token) throw this.messageApiService.unAuthorized('Error al generar token');

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
            const user = await prisma.user.findUnique({where:{email:dataDto.email}, include:{role:true}});
            if(!user) throw this.messageApiService.unAuthorized('El usuario no existe');

            // Comprobar password
            const isCorrect = BcryptAdapter.compareHash(dataDto.password, user.password);
            if(!isCorrect) throw this.messageApiService.unAuthorized('Usuario o Contrasena incorrecta');

            // Generar token
            const token = await JwtAdapter.generateToken({id:user.id});
            if(!token) throw this.messageApiService.unAuthorized('Error al generar token');

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
            if(!verifyToken ) throw this.messageApiService.unAuthorized('Token invalido');

            const user = await prisma.user.findUnique({where:{id:verifyToken?.id}, include:{role:true}});
            if(!user) throw this.messageApiService.unAuthorized('Usuario no existe');

            return UserEntity.objectUser(user);
            
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

            const user = await prisma.user.findUnique({where:{id:dataDto.userId}, include:{role:true}});
            if(!user) throw this.messageApiService.badRequest('El Usuario no existe');

            return UserEntity.objectUser(user);
            
        } catch (error) {
            throw error;
        }
    }
      
    public async getUsers(userId:number) {
        try {
            const user = await prisma.user.findUnique({where:{id:userId}, include:{role:true}});
            if(!user) throw this.messageApiService.badRequest("El usuario no existe");
            if(user.role.name !== Roles.Admin) throw this.messageApiService.badRequest("El usuario no tiene permisos");

            const users = await prisma.user.findMany();
            return users.map(user => UserEntity.objectUser(user));
            
        } catch (error) {
            throw error;
        }
    }
}
