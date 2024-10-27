import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { handleError } from '../helpers';


export class ProductsController {

    constructor(
        private readonly productsService:ProductsService
    ){}


    public getProducts = (req:Request, res:Response) => {

        this.productsService.getProducts()
        .then(data => res.status(200).json(data))
        .catch(error => handleError(error, res))
    }


    public searchProducts = (req:Request, res:Response) => {
        const {search} = req.query;

        if(!search) {
            res.status(404).json({error:'El termino de busqueda no existe'})
            return;
        }

        if(typeof search !== 'string') {
            res.status(404).json({error:'El termino debe ser un string'})
            return
        }


        this.productsService.searchProducts(search!)
        .then(data => res.status(200).json(data))
        .catch(error => handleError(error, res))
    }
}