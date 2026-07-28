import { Router } from "express";
import { OrderService } from '../services/order.service';
import { ValidateTokenMiddleware } from "../middlewares";
import { OrderController } from "../controllers";
import { MessageApiService } from "../services";




export class OrderRoutes {

    static get routes():Router {
        const router = Router();
        
        const messageApiService = new MessageApiService();
        const orderService = new OrderService(messageApiService);
        const orderController = new OrderController(orderService, messageApiService);
        const validateTokenMiddleware = new ValidateTokenMiddleware(messageApiService);

        router.post('/', [validateTokenMiddleware.validate], orderController.createOrder);
        router.get('/:userId', [validateTokenMiddleware.validate], orderController.getOrdersByUser);

        return router;
    }
}