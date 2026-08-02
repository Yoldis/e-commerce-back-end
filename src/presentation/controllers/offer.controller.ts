import type { Request, Response } from "express";
import type { MessageApiService } from "../services";
import { OfferService } from '../services/offer.service';


export class OfferController {
    constructor(
        private readonly messageApiService:MessageApiService,
        private readonly offerService:OfferService
    ){}


    public createOffer = async(req:Request, res:Response) => {
        
    }
}

