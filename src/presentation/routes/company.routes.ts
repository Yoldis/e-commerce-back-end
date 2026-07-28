import { Router } from "express";
import { CompanyController } from '../controllers/company.controller';
import { CompanyService } from '../services/company.service';
import { MessageApiService } from '../services/message.api.service';
import { ValidateTokenMiddleware } from "../middlewares";


export class CompanyRoutes {

    static get routes():Router {

        const router = Router();

        const messageApiService = new MessageApiService();
        const companyService = new CompanyService(messageApiService);
        const companyController = new CompanyController(companyService, messageApiService);
        const validateTokenMiddleware = new ValidateTokenMiddleware(messageApiService);

        router.get("/:id", companyController.getCompanyById);
        router.post("/", [validateTokenMiddleware.validate], companyController.createCompany);
        router.put("/:id", [validateTokenMiddleware.validate], companyController.updateCompany);

        return router;
    }
}