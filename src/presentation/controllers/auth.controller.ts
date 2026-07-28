import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../../domain';
import { MessageApiService } from '../services/message.api.service';

export class AuthController {
    
    constructor(
        private readonly authService:AuthService,
        private readonly messageApiService:MessageApiService
    ){}


    public registerUser = (req:Request, res:Response) => {

        const [error, dataDto] = RegisterUserDto.registerDto(req.body);        
        if(error) this.messageApiService.badRequest(error);

        this.authService.registerUser(dataDto!)
        .then(data => this.messageApiService.created("Usuario registrado con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }



    public logiUser = (req:Request, res:Response) => {

        const [error, dataDto] = LoginUserDto.loginDto(req.body);
        if(error) this.messageApiService.badRequest(error, res);
        
        this.authService.logiUser(dataDto!)
        .then(data => this.messageApiService.ok("Usuario Logueado", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }

    public validateToken = ( req:Request, res:Response) => {
        const token = req.header('x-token');
        if(!token) this.messageApiService.unAuthorized("No hay token en la peticion");

        this.authService.validateToken(token!)
        .then(data => this.messageApiService.ok("Usuario Logueado", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }


    public updateUser = ( req:Request, res:Response) => {
        const[error, dataDto] = UpdateUserDto.updateDto(req.body);
        if(error) this.messageApiService.badRequest(error);

        this.authService.updateUser(dataDto!)
        .then(data => this.messageApiService.ok("Usuario Actualizado", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }


    public getUsers = ( req:Request, res:Response) => {
        const params = req.params;
        const userId  = params.userId as string;
        if(!userId) this.messageApiService.notFound("El usuario no existe");

        this.authService.getUsers(+userId!)
        .then(data => this.messageApiService.ok("Usuarios Encontrados", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }
}