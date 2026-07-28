import { Router } from "express";
import { SeedController } from "../controllers";
import { MessageApiService } from "../services";

export class SeedRotue {


    static get routes ():Router {

        const router = Router();

        const messageApiService = new MessageApiService();
        const seedController = new SeedController(messageApiService);

        router.post('/generate', seedController.generate);
        return router;
    }
}