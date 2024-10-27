import { prisma } from "../../db/prismaClient";
import { CreateOrderDto, CustomError } from "../../domain";
import { OrderEntity } from '../../domain/entities/order.entity';




export class OrderService {


    public async createOrder(dataDto:CreateOrderDto) {

        try {
            if(dataDto.id) {
                const existOrder = await prisma.order.findUnique({where:{id:dataDto.id}});
                if(!existOrder) throw CustomError.badRequest('La orden no existe');

                await prisma.order.update({
                    where:{id:dataDto.id},
                    data:{isPaid:true}
                })

                const order = await prisma.order.findUnique({
                    where:{id:dataDto.id},
                    select:{
                        id:true, isPaid:true, createdAt:true, total:true, unitTotal:true, userId:true,
                        user:{
                            select:{
                                id:true, email:true, name:true, role:true
                            }
                        },
                        orderDetails:{
                            select:{
                                id:true, subTotal:true, unit:true, image:true, price: true, 
                                product:true, size:true
                            }
                        }
                    }
                })

                return {
                    order
                }
            }

            const total = dataDto.orderDetails.reduce((acc, item) => (acc + item.subTotal), 0)
            const unitTotal = dataDto.orderDetails.reduce((acc, item) => (acc + item.unit), 0)

            const data = await prisma.$transaction(async(tx) => {

                const createOrder = await tx.order.create({
                    data:{
                        userId:dataDto.userId,
                        isPaid:dataDto.isPaid,
                        total,
                        unitTotal,
                    }
                });

                await tx.orderDetails.createMany({
                    data:dataDto.orderDetails.map(p => ({
                        orderId:createOrder.id,
                        price:p.price,
                        product:p.product,
                        size:p.size,
                        subTotal:p.subTotal,
                        unit:p.unit,
                        image:p.image,
                    }))
                });

                const productsPromise = dataDto.orderDetails.map(async(p) => {
                    await tx.product.update({
                        where:{id:p.id},
                        data:{
                            inStock:{
                                decrement:p.unit
                            }
                        }
                    });
                })
                await Promise.all(productsPromise);

                const order = await tx.order.findUnique({
                    where:{id:createOrder.id},
                    select:{
                        id:true, isPaid:true, createdAt:true, total:true, unitTotal:true, userId:true,
                        user:{
                            select:{
                                id:true, email:true, name:true, role:true
                            }
                        },

                        orderDetails:{
                            select:{
                                id:true, subTotal:true, unit:true, image:true, price: true, 
                                product:true, size:true
                            }
                        }
                    }
                })
                

                return {
                    order
                }
            })

            return {
                order:data.order
            }

        } catch (error) {
            console.log(error)
            throw error;
        }
    }


    public async getOrdersByUser(userId:string) {

        try {
            const user = await prisma.user.findUnique({where:{id:userId}});
            if(!user) throw CustomError.badRequest("El usuario no existe");

            const orders = await prisma.order.findMany({
                where:{userId},
                select:{
                    id:true, isPaid:true, createdAt:true, total:true, unitTotal:true, userId:true,
                    user:{
                        select:{
                            id:true, email:true, name:true, role:true
                        }
                    },

                    orderDetails:{
                        select:{
                            id:true, subTotal:true, unit:true, image:true, price: true, 
                            product:true, size:true
                        }
                    }
                }
            })

            const orderEntity = orders.map(order => OrderEntity.objectOrder(order)) 

            return {
                orders:orderEntity
            }

        } catch (error) {
            throw error;
        }
    }


    public async getOrdersByAdmin(userId:string) {

        try {
            const user = await prisma.user.findUnique({where:{id:userId}});
            if(!user) throw CustomError.badRequest("El usuario no existe");
            if(user.role !== 'Admin') throw CustomError.badRequest("El usuario no tiene permisos");

            const orders = await prisma.order.findMany({
                select:{
                    id:true, isPaid:true, createdAt:true, total:true, unitTotal:true, userId:true,
                    user:{
                        select:{
                            id:true, email:true, name:true, role:true
                        }
                    },

                    orderDetails:{
                        select:{
                            id:true, subTotal:true, unit:true, image:true, price: true, 
                            product:true, size:true
                        }
                    }
                }
            })

            const orderEntity = orders.map(order => OrderEntity.objectOrder(order)) 

            return {
                orders:orderEntity
            }

        } catch (error) {
            throw error;
        }
    }
}