import type { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import type { MessageApiService } from '../services';
import type { UploadedFile } from 'express-fileupload';
import { CreateProductDto } from '../../domain/dto/createProduct.dto';


export class ProductsController {

    constructor(
        private readonly productsService:ProductsService,
        private readonly messageApiService:MessageApiService
    ){}


    public addProduct = (req:Request, res:Response) => {

        const[error, payload] = CreateProductDto.dto(req.body);
        if(error) {
            this.messageApiService.badRequest(error, null, res);
            return;
        }
       
        const files = req.files?.images ?? [];
        const images: UploadedFile[] = Array.isArray(files) ? files : [files];

        this.productsService.addProduct(payload!, images)
        .then(data => this.messageApiService.ok("Producto Registrado", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }

    public updateProduct = (req:Request, res:Response) => {
        const productId = req.params['id'];
        if(!productId) {
            this.messageApiService.badRequest("El producto no existe", null, res);
            return;
        }

        const[error, payload] = CreateProductDto.dto(req.body);
        if(error) {
            this.messageApiService.badRequest(error, null, res);
            return;
        }
       
        const files = req.files?.images ?? [];
        const images: UploadedFile[] = Array.isArray(files) ? files : [files];

        this.productsService.updateProduct(+productId, payload!, images)
        .then(data => this.messageApiService.ok("Producto Actualizado", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }

    public deleteProduct = (req:Request, res:Response) => {
        const producId = req.params['id'];
        if(!producId) {
            this.messageApiService.badRequest("El id es requerido", null, res);
            return;
        }

        this.productsService.deleteProduct(+producId!)
        .then(data => this.messageApiService.ok("Producto Eliminado", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }

    public getProducts = (req:Request, res:Response) => {
        this.productsService.getProducts()
        .then(data => this.messageApiService.ok("Productos Encontrados", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }

    public getProductsByCompanyId = (req:Request, res:Response) => {
        const companyId = req.params['id'];
        if(!companyId) {
            this.messageApiService.badRequest("La empresa es requerida", null, res);
            return;
        }

        this.productsService.getProductsByCompanyId(+companyId!)
        .then(data => this.messageApiService.ok("Productos Encontrados", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }

    public searchProducts = (req:Request, res:Response) => {
        const {search} = req.query;

        if(!search) {
            this.messageApiService.badRequest("El termino es requerido", null, res)
            return;
        }

        if(typeof search !== 'string') {
            this.messageApiService.badRequest("El debe ser un texto", null, res)
            return;
        }

        this.productsService.searchProducts(search!)
        .then(data => this.messageApiService.ok("Productos Encontrados", data, res))
        .catch(error => this.messageApiService.handleError(error, res))
    }
}