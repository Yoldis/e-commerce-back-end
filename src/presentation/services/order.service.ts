import { prisma } from "../../db/prismaClient";
import { CreateOrderDto } from "../../domain";
import { OrderEntity } from '../../domain/entities/order.entity';
import type { MessageApiService } from "./message.api.service";




export class OrderService {

    constructor(
        private readonly messageApiService:MessageApiService
    ){}

    public createOrder = async(dataDto:CreateOrderDto) => {
        return prisma.$transaction(async(manager) => {
            // Si existe la orden la actualizamo a pagada, porque estaba guardada
             if(dataDto.id) {
                const existOrder = await manager.order.findUnique({where:{id:dataDto.id}});
                if(!existOrder) throw this.messageApiService.badRequest('La orden no existe');

                // Buscamos la ordenDetalle
                const orderDetails = await manager.orderDetails.findMany({where:{orderId:dataDto.id}});
                for (const detail of orderDetails) {
                    // Verificar si el producto tiene stock
                    const product = await manager.product.findUnique({where:{id:detail.productId}});
                    if(!product) throw this.messageApiService.badRequest("El producto no existe", null);
                    if(!product.inStock) throw this.messageApiService.badRequest("El producto no tiene stock disponible");
                    if(product.inStock < detail.unit) throw this.messageApiService.badRequest("La cantidad es mayor que el stock del producto");
                    if((product.inStock - detail.unit) < 0) throw this.messageApiService.badRequest("El producto no tiene suficiente stock disponible");

                    // Bajamos el stock del producto si este esta pagado
                    await manager.product.update({
                        where:{id:product.id},
                        data:{
                            inStock:{
                                decrement:detail.unit
                            }
                        }
                    });
                }

                await manager.order.update({
                    where:{id:dataDto.id},
                    data:{isPaid:true}
                });
            }
            else {
                const total = dataDto.orderDetails.reduce((acc, item) => (acc + item.subTotal), 0)
                const unitTotal = dataDto.orderDetails.reduce((acc, item) => (acc + item.unit), 0)
        
                const createOrder = await manager.order.create({
                    data:{
                        userId:dataDto.userId,
                        isPaid:dataDto.isPaid,
                        total,
                        unitTotal,
                    }
                });

                dataDto.id = createOrder.id;

                for (const detail of dataDto.orderDetails) {
                    // Verificar si el producto tiene stock
                    const product = await manager.product.findUnique({where:{id:detail.productId}});
                    if(!product) throw this.messageApiService.badRequest("El producto no existe", null);
                    if(!product.inStock) throw this.messageApiService.badRequest("El producto no tiene stock disponible");
                    if(product.inStock < detail.unit) throw this.messageApiService.badRequest("La cantidad es mayor que el stock del producto");
                    if((product.inStock - detail.unit) < 0) throw this.messageApiService.badRequest("El producto no tiene suficiente stock disponible");

                    // Registramos el detalle
                    await manager.orderDetails.create({data:{
                        orderId:createOrder.id,
                        price:detail.price,
                        productName:detail.productName,
                        productId:detail.productId,
                        size:detail.size,
                        subTotal:detail.subTotal,
                        unit:detail.unit,
                        image:detail.image,
                    }});

                    // Bajamos el stock del producto si este esta pagado
                    if(dataDto.isPaid) await manager.product.update({
                        where:{id:product.id},
                        data:{
                            inStock:{
                                decrement:detail.unit
                            }
                        }
                    });
                };
            }

            // Buscamos la orden actual
            const order = await manager.order.findUnique({
                where:{id:dataDto.id},
                select:{
                    id:true, isPaid:true, createdAt:true, total:true, unitTotal:true, userId:true,
                    orderDetails:true
                }
            })
            
            return order;
        });
    };

    public getOrdersByUser = async(userId:number) => {
        const user = await prisma.user.findUnique({where:{id:userId}});
        if(!user) throw this.messageApiService.badRequest("El usuario no existe");

        const orders = await prisma.order.findMany({
            where:{userId},
            select:{
                id:true, isPaid:true, createdAt:true, total:true, unitTotal:true, userId:true,
                orderDetails:true
            }
        })

        const orderEntity = orders.map(order => OrderEntity.objectOrder(order)) 
        return orderEntity;
    }
}