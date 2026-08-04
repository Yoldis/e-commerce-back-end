import type { Request, Response } from "express";
import type { MessageApiService } from "../services";
import { OfferService } from '../services/offer.service';
import { CreateOfferDto } from "../../domain";


export class OfferController {
    constructor(
        private readonly messageApiService:MessageApiService,
        private readonly offerService:OfferService
    ){}


    public createOffer = async(req:Request, res:Response) => {
        
        const [error, payload] = CreateOfferDto.dto(req.body);
        if(error) {
            this.messageApiService.badRequest(error, null, res);
            return;
        }

        this.offerService.createOffer(payload!)
        .then(data => this.messageApiService.created("Oferta registrada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public updateOffer = async(req:Request, res:Response) => {
        const offerId = req.params['id'];
        if(!offerId) {
            this.messageApiService.badRequest("El id es requerido", null, res);
            return;
        }

        const [error, payload] = CreateOfferDto.dto(req.body);
        if(error) {
            this.messageApiService.badRequest(error, null, res);
            return;
        }

        this.offerService.updateOffer(+offerId, payload!)
        .then(data => this.messageApiService.ok("Oferta actualizada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public deleteOffer = async(req:Request, res:Response) => {
        const offerId = req.params['id'];
        if(!offerId) {
            this.messageApiService.badRequest("El id es requerido", null, res);
            return;
        }

        this.offerService.deleteOffer(+offerId)
        .then(data => this.messageApiService.ok("Oferta eliminada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public getOffersByCompanyId = async(req:Request, res:Response) => {
        const companyId = req.params['id'];
        if(!companyId) {
            this.messageApiService.badRequest("El id es requerido", null, res);
            return;
        }

        this.offerService.getOffersByCompanyId(+companyId)
        .then(data => this.messageApiService.ok("Ofertas encontradas", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }
}

