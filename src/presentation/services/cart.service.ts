import { prisma } from "../../db/prismaClient";
import type { CreateCartDto, CreateCartItemDto } from "../../domain/dto/createCart.dto";
import type { MessageApiService } from "./message.api.service";


export class CartService {

    constructor(
        private readonly messageApiService:MessageApiService
    ){}

    public addAllShoopingCartByUserId = async(userId:number, createCartDto:CreateCartDto) => {
        return prisma.$transaction(async(manager) => {
            const user = await manager.user.findUnique({where:{id:userId}});
            if(!user) throw this.messageApiService.badRequest("El usuario no existe");

            for (const item of createCartDto.items) {
                const product = await manager.product.findUnique({where:{id:item.productId}, include:{productImages:true}});
                if(!product) continue;
                if(!product.inStock) continue;
                if(product.inStock < item.unit) continue;
                if((product.inStock - item.unit) < 0) continue;

                const productInCart = await manager.shoopingCart.findFirst({where:{userId, productId:item.productId, size:item.size}});
                // Actualizar
                if(productInCart) {
                    const subTotal = product.price * item.unit;
                    await manager.shoopingCart.update({
                        where:{id:productInCart.id},
                        data:{
                            unit:productInCart.unit + item.unit,
                            subTotal:productInCart.subTotal + subTotal,
                            size:item.size
                        }
                    });
                    continue;
                }
                // Creamos
                await manager.shoopingCart.create({
                    data:{
                        image:product.productImages.at(0)?.url ?? '',
                        price:product.price,
                        productName:product.name,
                        size:item.size,
                        subTotal:product.price * item.unit,
                        unit:item.unit,
                        productId:product.id,
                        userId:user.id,
                    }
                });
            }

            return manager.shoopingCart.findMany({where:{userId}});
        });
    }

    public addItemShoopingCart = async(createCartDto:CreateCartItemDto) => {
        
        const[user, product, productInCart] = await Promise.all([
            prisma.user.findUnique({where:{id:createCartDto.userId}}),
            prisma.product.findUnique({where:{id:createCartDto.productId}, include:{productImages:true}}),
            prisma.shoopingCart.findFirst({where:{userId:createCartDto.userId, productId:createCartDto.productId, size:createCartDto.size}}),
        ]);

        if(!user) throw this.messageApiService.badRequest("El usuario no existe");
        if(!product) throw this.messageApiService.badRequest("El producto no existe");
        if(!product.inStock) throw this.messageApiService.badRequest("El producto no tiene existencia");
        if(product.inStock < createCartDto.unit) throw this.messageApiService.badRequest("La cantidad no puede ser mayor que el stock");
        if((product.inStock - createCartDto.unit) < 0) throw this.messageApiService.badRequest("El stock del producto quedara bajo de cero");
        
        // Actualizar
        if(productInCart) {
            const subTotal = product.price * createCartDto.unit;
            const shoopingCartUpdate = await prisma.shoopingCart.update({
                where:{id:productInCart.id},
                data:{
                    unit:productInCart.unit + createCartDto.unit,
                    subTotal:productInCart.subTotal + subTotal,
                    size:createCartDto.size
                }
            });

            return shoopingCartUpdate;
        }

        // Creamos
        const shoopingCartUpdate = await prisma.shoopingCart.create({
            data:{
                image:product.productImages.at(0)?.url ?? '',
                price:product.price,
                productName:product.name,
                size:createCartDto.size,
                subTotal:product.price * createCartDto.unit,
                unit:createCartDto.unit,
                productId:product.id,
                userId:user.id
            }
        });

        return shoopingCartUpdate;
    }

    public removeItemShoopingCart = async(createCartDto:CreateCartItemDto) => {
        const[user, product, productInCart] = await Promise.all([
            prisma.user.findUnique({where:{id:createCartDto.userId}}),
            prisma.product.findUnique({where:{id:createCartDto.productId}}),
            prisma.shoopingCart.findFirst({where:{userId:createCartDto.userId, productId:createCartDto.productId, size:createCartDto.size}}),
        ]);

        if(!user) throw this.messageApiService.badRequest("El usuario no existe");
        if(!product) throw this.messageApiService.badRequest("El producto no existe");
        if(!productInCart) throw this.messageApiService.badRequest("El items no existe no existe");
        
        // Actualizar
        const subTotal = product.price * createCartDto.unit;
        const shoopingCartUpdate = await prisma.shoopingCart.update({
            where:{id:productInCart.id},
            data:{
                unit:productInCart.unit - createCartDto.unit,
                subTotal:productInCart.subTotal - subTotal,
                size:createCartDto.size
            }
        });

        // Verifico si la cantidad ya es igual a cero, para eliminarlo del carrito
        if(!shoopingCartUpdate.unit) await prisma.shoopingCart.delete({where:{id:shoopingCartUpdate.id}});
        return shoopingCartUpdate;
    }

    public clearShoopingCartByUserId = async(userId:number) => {
        const user = await prisma.user.findUnique({where:{id:userId}});
        if(!user) throw this.messageApiService.badRequest("El usuario no existe", null);

        await prisma.shoopingCart.deleteMany({where:{userId}});
        return true;
    }

    public removeAllByProductIdAndUserId = async(userId:number, productId:number) => {
        const user = await prisma.user.findUnique({where:{id:userId}});
        if(!user) throw this.messageApiService.badRequest("El usuario no existe", null);

        await prisma.shoopingCart.deleteMany({where:{userId, productId}});
        return true;
    }

    public getShoopingCartByUserId = (userId:number) => {
        return prisma.shoopingCart.findMany({where:{userId}});
    }

}