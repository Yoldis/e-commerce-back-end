import { prisma } from "../../db/prismaClient";
import { ProductsEntity } from '../../domain/entities/products.entity';


export class ProductsService {


    public async getProducts(){

        try {
            const products = await prisma.product.findMany({
                select:{
                    id:true, name:true, description:true, price:true,
                    inStock:true, sizes:true,
                    category:{
                        select:{
                            id:true, name:true
                        }
                    },
                    images:{
                        select:{
                            id:true, url:true
                        }
                    }
                },
            });
            
            const productsEntity = products.map(p => ProductsEntity.objectProducts(p));

            return {
                products:productsEntity
            }

        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }

    public async searchProducts(search:string){

        try {
            const products = await prisma.product.findMany({
                where:{name:{startsWith:search, mode:'insensitive'}},
                select:{
                    id:true, name:true, description:true, price:true,
                    inStock:true, sizes:true,
                    category:{
                        select:{
                            id:true, name:true
                        }
                    },
                    images:{
                        select:{
                            id:true, url:true
                        }
                    }
                },
            });
            
            const productsEntity = products.map(p => ProductsEntity.objectProducts(p));

            return {
                products:productsEntity
            }

        } catch (error) {
            throw error;
        }
    }
}