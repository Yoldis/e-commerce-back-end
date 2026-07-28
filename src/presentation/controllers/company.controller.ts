import type { Request, Response } from "express";
import type { CompanyService } from "../services/company.service";
import type { MessageApiService } from "../services";
import { CreateCompanyDto } from "../../domain";


export class CompanyController {

    constructor(
        private readonly companyService:CompanyService,
        private readonly messageApiService:MessageApiService
    ){}

    public getCompanyById = (req:Request, res:Response) => {
        const companyId = req.params['id'] as string;
        if(!companyId) this.messageApiService.badRequest("El id es requerido");

        this.companyService.geCompanyById(+companyId)
        .then(data => this.messageApiService.created("Empresa obteneido con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }


    public createCompany = (req:Request, res:Response) => {
        const [error, dataDto] = CreateCompanyDto.createDto(req.body);        
        if(error) this.messageApiService.badRequest(error);

        this.companyService.createCompany(dataDto!)
        .then(data => this.messageApiService.created("Empresa registrada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public updateCompany = (req:Request, res:Response) => {
        const [error, dataDto] = CreateCompanyDto.createDto(req.body);        
        if(error) this.messageApiService.badRequest(error);

        this.companyService.updateCompany(dataDto!)
        .then(data => this.messageApiService.created("Empresa actualizada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }
}