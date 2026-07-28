import type { Request, Response } from "express";
import { generateSeed } from "../../seed/seed-database";
import type { MessageApiService } from "../services";

export class SeedController {

    constructor (
        private readonly messageApiService:MessageApiService
    ){}

    public generate(req: Request, res:Response) {
        generateSeed()
        .then(data => res.status(200).json(data))
        .catch(error => this.messageApiService.handleError(error, res))
    } 
}