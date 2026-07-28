import { Router } from "express";
import { ValidateTokenMiddleware } from "../middlewares";
import { MessageApiService } from '../services/message.api.service';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';


export class CategoryRoutes {

    static get routes():Router {

        const router = Router();

        const messageApiService = new MessageApiService();
        const validateTokenMiddleware = new ValidateTokenMiddleware(messageApiService);
        const categoryService = new CategoryService(messageApiService);
        const categoryController = new CategoryController(categoryService, messageApiService);

        router.post('/', [validateTokenMiddleware.validate], categoryController.addCategory);
        router.put('/:id', [validateTokenMiddleware.validate], categoryController.updateCategory);
        router.delete('/:id', [validateTokenMiddleware.validate], categoryController.deleteCategory);
        router.get('/', [validateTokenMiddleware.validate], categoryController.getCategories);
        router.get('/company/:id', [validateTokenMiddleware.validate], categoryController.getCategoriesByCompanyId);

        return router;
    }
}