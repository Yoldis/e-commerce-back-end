import { Router } from "express";
import { OrderService } from '../services/order.service';
import { OrderController } from './controller';
import { ValidateTokenMiddleware } from "../middlewares";




export class OrderRoutes {

    static get routes():Router {
        const router = Router();
        
        const orderService = new OrderService();
        const orderController = new OrderController(orderService);

        router.post('/', [ValidateTokenMiddleware.validate], orderController.createOrder);
        router.get('/:userId',  orderController.getOrdersByUser);
        router.get('/admin/:userId',  orderController.getOrdersByAdmin);

        return router;
    }
}