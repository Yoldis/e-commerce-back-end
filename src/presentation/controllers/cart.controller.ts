import type { Request, Response } from "express";
import type { CartService, MessageApiService } from "../services";
import { CreateCartDto, CreateCartItemDto } from "../../domain/dto/createCart.dto";



export class CartController {

    constructor(
        private readonly messageApiService:MessageApiService,
        private readonly cartService:CartService

    ){}

    public addAllShoopingCartByUserId = (req:Request, res:Response) => {
        const userId = req.params['id'];
        if(userId && isNaN(+userId)) {
            this.messageApiService.badRequest("El usuario es invalido", null, res);
            return;
        }

        const [error, payload] = CreateCartDto.dto(req.body);
        if(error) {
            this.messageApiService.badRequest(error, null, res);
            return;
        }

        this.cartService.addAllShoopingCartByUserId(+userId!, payload!)
        .then(data => this.messageApiService.ok("Producto agregado al carrito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public addShoopingCart = (req:Request, res:Response) => {
        const [error, payload] = CreateCartItemDto.dto(req.body);
        if(error) {
            this.messageApiService.badRequest(error, null, res);
            return;
        }

        this.cartService.addShoopingCart(payload!)
        .then(data => this.messageApiService.ok("Producto agregado al carrito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public removeShoopingCart = (req:Request, res:Response) => {
        const [error, payload] = CreateCartItemDto.dto(req.body);
        if(error) {
            this.messageApiService.badRequest(error, null, res);
            return;
        }

        this.cartService.removeShoopingCart(payload!)
        .then(data => this.messageApiService.ok("Producto removido del carrito", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public removeAllShoopingCartByUserId = (req:Request, res:Response) => {
        const userId = req.params['id'];
        if(userId && isNaN(+userId)) {
            this.messageApiService.badRequest("El usuario no es valido", userId, res);
            return;
        }

        this.cartService.removeAllShoopingCartByUserId(+userId!)
        .then(data => this.messageApiService.ok("Carrito vacio", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }

    public getShoopingCartByUserId = (req:Request, res:Response) => {
        const userId = req.params['id'];
        if(!userId || isNaN(+userId)) {
            this.messageApiService.badRequest("El usuario es requerido", null, res);
            return;
        }

        this.cartService.getShoopingCartByUserId(+userId)
        .then(data => this.messageApiService.ok("Productos Agregados", data, res))
        .catch(error => this.messageApiService.handleError(error, res));
    }
}
