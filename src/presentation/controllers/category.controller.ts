import type { Request, Response } from "express";
import type { CategoryService } from "../services/category.service";
import { CreateCategoryDto } from "../../domain/dto/createCategorie.dto";
import type { MessageApiService } from "../services";


export class CategoryController {

    constructor(
        private readonly categoryService:CategoryService,
        private readonly messageApiService:MessageApiService
    ){}

    public addCategory = (req:Request, res:Response) => {
        const [error, payload] = CreateCategoryDto.dto(req.body);
        if(error) this.messageApiService.badRequest(error, payload, res);

        this.categoryService.addCategory(payload!)
        .then(data => this.messageApiService.created("Categoria registrada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public updateCategory = (req:Request, res:Response) => {
        const id = req.params['id'];
        const [error, payload] = CreateCategoryDto.dto(req.body);
        if(error) this.messageApiService.badRequest(error, payload, res);

        this.categoryService.updateCategory(+id!, payload!)
        .then(data => this.messageApiService.created("Categoria registrada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public deleteCategory = (req:Request, res:Response) => {
        const id = req.params['id'];
        if(!id) this.messageApiService.badRequest("El id es requerido", null, res);

        this.categoryService.deleteCategory(+id!)
        .then(data => this.messageApiService.created("Categoria eliminada con exito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public getCategories = (req:Request, res:Response) => {
        this.categoryService.getCategories()
        .then(data => this.messageApiService.created("Categorias registradas", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public getCategoriesByCompanyId = (req:Request, res:Response) => {
        const companyId = req.params['id'];
        if(!companyId) this.messageApiService.badRequest("El id es requerido", null, res);

        this.categoryService.getCategoriesByCompanyId(+companyId!)
        .then(data => this.messageApiService.created("Categorias registradas", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }
}