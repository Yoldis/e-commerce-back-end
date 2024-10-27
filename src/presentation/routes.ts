import { Router } from "express";
import { AuthRouter } from "./auth/routes";
import { ProductsRoutes } from "./products/routes";
import { OrderRoutes } from "./order/routes";



export class AppRouter {


    static get routes ():Router {

        const router = Router();
        
        router.use('/auth', AuthRouter.routes);
        router.use('/products', ProductsRoutes.routes);
        router.use('/order', OrderRoutes.routes);
        
        return router;
    }
}