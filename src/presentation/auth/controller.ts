import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../../domain';
import { handleError } from '../helpers';


export class AuthController {
    

    constructor(
        private readonly authService:AuthService
    ){}


    public registerUser = (req:Request, res:Response) => {

        const [error, dataDto] = RegisterUserDto.registerDto(req.body);
        if(error) {
            res.status(400).json({error});
            return;
        }
        
        this.authService.registerUser(dataDto!)
        .then(data => res.status(201).json(data))
        .catch(error => handleError(error, res))
    }



    public logiUser = (req:Request, res:Response) => {

        const [error, dataDto] = LoginUserDto.loginDto(req.body);
        if(error) {
            res.status(400).json({error});
            return;
        }
        
        this.authService.logiUser(dataDto!)
        .then(data => res.status(200).json(data))
        .catch(error => handleError(error, res))
    }

    public validateToken = ( req:Request, res:Response) => {
        const token = req.header('x-token');
        if(!token) {
            res.status(401).json({error:'No hay token en la peticion'});
            return;
        }

        this.authService.validateToken(token!)
        .then(data => res.status(200).json(data))
        .catch(error => handleError(error, res))
    }


    public updateUser = ( req:Request, res:Response) => {
        const[error, dataDto] = UpdateUserDto.updateDto(req.body);
        if(error) {
            res.status(401).json({error});
            return;
        }

        this.authService.updateUser(dataDto!)
        .then(data => res.status(200).json(data))
        .catch(error => handleError(error, res))
    }


    public getUsers = ( req:Request, res:Response) => {
        const params = req.params;
        const userId  = params.userId as string;
        if(!userId) {
            res.status(404).json({error:'El usuario no existe'})
            return;
        }

        this.authService.getUsers(userId!)
        .then(data => res.status(200).json(data))
        .catch(error => handleError(error, res))
    }
}