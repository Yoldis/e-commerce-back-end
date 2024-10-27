import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../../domain';
import { handleError } from '../helpers';




export class OrderController {

    constructor(
        private readonly orderService:OrderService
    ){}

    public createOrder = (req:Request, res:Response) => {

        const[error, dataDto] = CreateOrderDto.createDto(req.body);
        if(error) {
            res.status(404).json({error});
            return;
        }

        this.orderService.createOrder(dataDto!)
        .then(data => res.status(201).json(data))
        .catch(error => handleError(error, res))
    }


    public getOrdersByUser = (req:Request, res:Response) => {

        const params = req.params;
        const userId  = params.userId as string;
        if(!userId) {
            res.status(404).json({error:'El usuario no existe'})
            return;
        }

        this.orderService.getOrdersByUser(userId)
        .then(data => res.status(201).json(data))
        .catch(error => handleError(error, res))
    }

    public getOrdersByAdmin = (req:Request, res:Response) => {
        const params = req.params;
        const userId  = params.userId as string;
        if(!userId) {
            res.status(404).json({error:'El usuario no existe'})
            return;
        }

        this.orderService.getOrdersByAdmin(userId)
        .then(data => res.status(201).json(data))
        .catch(error => handleError(error, res))
    }
}