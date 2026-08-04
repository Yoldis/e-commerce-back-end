import { prisma } from '../../db/prismaClient';
import type { CreateOfferDto } from '../../domain';
import { MessageApiService } from './message.api.service';


export class OfferService {

    constructor(
        private readonly messageApiService:MessageApiService
    ){}

    public createOffer = async(createOfferDto:CreateOfferDto) => {
        const offer = await prisma.offer.findFirst({where:{productId:createOfferDto.productId}});
        if(offer) throw this.messageApiService.badRequest("El producto ya tiene una oferta registrada");

        const offerCreate = await prisma.offer.create({
            data:{
                companyId:createOfferDto.companyId,
                productId:createOfferDto.productId,
                startDate:createOfferDto.startDate,
                endDate:createOfferDto.endDate,
                type:createOfferDto.type,
                value:createOfferDto.value,
                description:createOfferDto.description ?? '',
                isActive:true,
            },
            include:{
                product:{
                    select:{
                        name:true, id:true,
                        productImages:{
                            select:{url:true}
                        }
                    }
                }
            }
        });

        return offerCreate;
    }

    public updateOffer = async(id:number, createOfferDto:CreateOfferDto) => {
        const offer = await prisma.offer.findUnique({where:{id}});
        if(!offer) throw this.messageApiService.badRequest("La oferta no existe");

        const offerUpdate = await prisma.offer.update({
            where:{id},
            data:{
                startDate:createOfferDto.startDate,
                endDate:createOfferDto.endDate,
                type:createOfferDto.type,
                value:createOfferDto.value,
                description:createOfferDto.description ?? '',
                isActive:createOfferDto.isActive
            },
            include:{
                product:{
                    select:{
                        name:true, id:true,
                        productImages:{
                            select:{url:true}
                        }
                    }
                }
            }
        });

        return offerUpdate;
    }

    public deleteOffer = async(id:number) => {
        const offer = await prisma.offer.findUnique({where:{id}});
        if(!offer) throw this.messageApiService.badRequest("La oferta no existe");

        const offerDeleted = await prisma.offer.delete({where:{id}});
        return offerDeleted;
    }

    public getOffersByCompanyId = async(companyId:number) => {
        return prisma.offer.findMany({
            where:{companyId},
            include:{
                product:{
                    select:{
                        name:true, id:true,
                        productImages:{
                            select:{url:true}
                        }
                    }
                }
            }
        });
    }
}

