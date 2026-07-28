import {  Router } from "express";
import { AuthService } from '../services/auth.service';
import { ValidateTokenMiddleware } from "../middlewares";
import { AuthController } from "../controllers";
import { MessageApiService } from '../services/message.api.service';


export class AuthRouter {

    static get routes ():Router {

        const router = Router();

        const messageApiService = new MessageApiService();
        const authService = new AuthService(messageApiService);
        const authController = new AuthController(authService, messageApiService);
        const validateTokenMiddleware = new ValidateTokenMiddleware(messageApiService);

        router.post('/register', authController.registerUser);
        router.post('/login', authController.logiUser);
        router.get('/validate-token', authController.validateToken);

        router.put('/updateUser', [validateTokenMiddleware.validate], authController.updateUser);
        router.get('/users/:userId', [validateTokenMiddleware.validate], authController.getUsers);

        return router;
    }
}