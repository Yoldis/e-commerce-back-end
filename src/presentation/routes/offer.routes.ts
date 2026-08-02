import { Router } from "express";
import { MessageApiService } from '../services/message.api.service';
import { ValidateTokenMiddleware } from '../middlewares/validateToken.middleware';
import { OfferService } from '../services/offer.service';
import { OfferController } from '../controllers/offer.controller';

export class OfferRoutes {

    static get routes():Router {

        const router = Router();

        const messageApiService = new MessageApiService();
        const validateTokenMiddleware = new ValidateTokenMiddleware(messageApiService);
        const offerService = new OfferService(messageApiService);
        const offerController = new OfferController(messageApiService, offerService);

        router.post("/", [validateTokenMiddleware.validate]);

        return router;
    }
}

