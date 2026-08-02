import { Router } from "express";
import { ValidateTokenMiddleware } from "../middlewares";
import { CartService, MessageApiService } from "../services";
import { CartController } from "../controllers";


export class CartRoutes {

    static get routes():Router {
        const router = Router();

        const messageApiService = new MessageApiService();
        const validateTokenMiddleware = new ValidateTokenMiddleware(messageApiService);
        const cartService = new CartService(messageApiService);
        const cartController = new CartController(messageApiService, cartService);

        router.get("/:id", [validateTokenMiddleware.validate], cartController.getShoopingCartByUserId);

        router.post("/add", [validateTokenMiddleware.validate], cartController.addItemShoopingCart);
        router.post("/addAll/:id", [validateTokenMiddleware.validate], cartController.addAllShoopingCartByUserId);

        router.post("/remove", [validateTokenMiddleware.validate], cartController.removeItemShoopingCart);
        router.delete("/removeAll/:userId/:productId", [validateTokenMiddleware.validate], cartController.removeAllByProductIdAndUserId);
        router.delete("/clear/:userId", [validateTokenMiddleware.validate], cartController.clearShoopingCartByUserId);

        return router;
    }
}