import {  Router } from "express";
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { ValidateTokenMiddleware } from "../middlewares";


export class AuthRouter {

    static get routes ():Router {

        const router = Router();

        const authService = new AuthService();
        const authController = new AuthController(authService);

        router.post('/register', authController.registerUser);
        router.post('/login', authController.logiUser);
        router.get('/validate-token', authController.validateToken);
        router.put('/updateUser', [ValidateTokenMiddleware.validate], authController.updateUser);
        router.get('/users/:userId', authController.getUsers);

        return router;
    }
}