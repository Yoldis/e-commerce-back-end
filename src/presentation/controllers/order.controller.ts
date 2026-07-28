import type { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../../domain';
import type { MessageApiService } from '../services';


export class OrderController {

    constructor(
        private readonly orderService:OrderService,
        private readonly messageApiService:MessageApiService
    ){}

    public createOrder = (req:Request, res:Response) => {

        const[error, dataDto] = CreateOrderDto.createDto(req.body);
        if(error) {
            res.status(404).json({error});
            return;
        }

        this.orderService.createOrder(dataDto!)
        .then(data => res.status(201).json(data))
        .catch(error => this.messageApiService.handleError(error, res))
    }


    public getOrdersByUser = (req:Request, res:Response) => {

        const params = req.params;
        const userId  = params.userId as string;
        if(!userId) {
            res.status(404).json({error:'El usuario no existe'})
            return;
        }

        this.orderService.getOrdersByUser(+userId)
        .then(data => res.status(201).json(data))
        .catch(error => this.messageApiService.handleError(error, res))
    }
}