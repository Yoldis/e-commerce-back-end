import { Router } from "express";
import { AuthRouter, ProductsRoutes, OrderRoutes, SeedRotue, CategoryRoutes, CartRoutes } from "./routes/index";
import { CompanyRoutes } from "./routes/company.routes";

export class AppRouter {

    static get routes ():Router {

        const router = Router();
        
        router.use('/seed', SeedRotue.routes);
        router.use('/auth', AuthRouter.routes);
        router.use('/company', CompanyRoutes.routes);
        router.use('/category', CategoryRoutes.routes);
        router.use('/products', ProductsRoutes.routes);
        router.use('/cart', CartRoutes.routes);
        router.use('/order', OrderRoutes.routes);
        
        return router;
    }
}