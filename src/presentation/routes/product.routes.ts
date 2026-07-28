import { Router } from "express";
import { ProductsService } from '../services/products.service';
import { ProductsController } from "../controllers";
import { CloudinaryService, MessageApiService } from "../services";
import { ValidateFileMidleware, ValidateTokenMiddleware } from "../middlewares";



export class ProductsRoutes {

    static get routes ():Router {
        const router = Router();

        const messageApiService = new MessageApiService();
        const cloudinaryService = new CloudinaryService();
        const productsService = new ProductsService(messageApiService, cloudinaryService);
        const productsController = new ProductsController(productsService, messageApiService);
        const validateTokenMiddleware = new ValidateTokenMiddleware(messageApiService);
        const validateFileMidleware = new ValidateFileMidleware(messageApiService);

        router.post('/', [validateTokenMiddleware.validate, validateFileMidleware.validate], productsController.addProduct);
        router.put('/:id', [validateTokenMiddleware.validate], productsController.updateProduct);
        router.delete('/:id', [validateTokenMiddleware.validate], productsController.deleteProduct);
        
        router.get('/', productsController.getProducts);
        router.get('/company/:id', productsController.getProductsByCompanyId);
        router.get('/search', productsController.searchProducts);

        return router;
    }
}