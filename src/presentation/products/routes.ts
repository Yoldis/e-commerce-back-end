import { Router } from "express";
import { ProductsController } from './controller';
import { ProductsService } from '../services/products.service';



export class ProductsRoutes {

    static get routes ():Router {
        const router = Router();

        const productsService = new ProductsService();
        const productsController = new ProductsController(productsService);

        router.get('/', productsController.getProducts);
        router.get('/search', productsController.searchProducts);

        return router;
    }
}