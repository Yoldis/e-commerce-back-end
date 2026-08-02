import type { UploadedFile } from "express-fileupload";
import { prisma } from "../../db/prismaClient";
import type { CreateProductDto } from "../../domain/dto/createProduct.dto";
import { ProductEntity } from '../../domain/entities/product.entity';
import type { CloudinaryService } from "./cloudinary.service";
import type { MessageApiService } from "./message.api.service";


export class ProductsService {

    constructor(
        private readonly messageApiService:MessageApiService,
        private readonly cloudinaryService:CloudinaryService
    ){}

    public addProduct = async(createProductDto:CreateProductDto, images:UploadedFile[]) => {
        return prisma.$transaction(async(manager) => {

            const existProduct = await manager.product.findFirst({where:{name:createProductDto.name}});
            if(existProduct) throw this.messageApiService.badRequest("El producto existe");

            const product = await manager.product.create({
                data:{
                    name:createProductDto.name,
                    description:createProductDto.description,
                    price:createProductDto.price,
                    inStock:createProductDto.inStock,
                    sizes:createProductDto.sizes,
                    companyId:createProductDto.companyId,
                }
            });

            const folder = 'E-Commerce/products';
            const [_, results] = await Promise.all([
                // Registrar Categorias
                manager.productCategories.createMany({
                    data:createProductDto.categoriesIds.map(c => ({productId:product.id, categoryId:+c}))
                }),

                // Cargar las imagenes en cloudinary
                this.cloudinaryService.uploadFiles(images, folder),
            ]);

            // Registrar las imagenes en db
            await manager.productImages.createMany({
                data:results.map(r => ({productId:product.id, url:r.secure_url}))
            });

            const productFind = await manager.product.findUnique({
                where:{id:product.id},
                include:{
                    productCategories:{
                        include:{category:true}
                    }, 
                    productImages:true
                }
            });

            if(!productFind) throw this.messageApiService.badRequest("El producto no existe", null);

            return ProductEntity.objectProducts(productFind);
        });
    }

    public updateProduct = async(productId:number, createProductDto:CreateProductDto, images:UploadedFile[]) => {
        return prisma.$transaction(async(manager) => {

            const existProduct = await manager.product.findFirst({where:{id:productId}});
            if(!existProduct) throw this.messageApiService.badRequest("El producto no existe");

            return prisma.product.update({
                where:{id:productId},
                data:{
                    name:createProductDto.name,
                    description:createProductDto.description,
                    price:createProductDto.price,
                    inStock:createProductDto.inStock,
                    sizes:createProductDto.sizes,
                },
                include:{
                    productCategories:{
                        include:{category:true}
                    }, 
                    productImages:true
                }
            })
        });
    }

    public deleteProduct = async(productId:number) => {
        const productExit = await prisma.product.findUnique({where:{id:productId}});
        if(!productExit) throw this.messageApiService.badRequest("El producto no existe", null);
        
        const product = await prisma.product.delete({where:{id:productId}});
        return product;
    }

    public getProducts = async() => {

        const products = await prisma.product.findMany({
           include:{
                productCategories:{
                    include:{category:true}
                }, 
                productImages:true
            }
        });
        
        const productsEntity = products.map(p => ProductEntity.objectProducts(p));
        return productsEntity
    }

    public getProductsByCompanyId = async(companyId:number) => {

        const products = await prisma.product.findMany({
            where:{companyId},
            include:{
                productCategories:{
                    include:{category:true}
                }, 
                productImages:true
            }
        });
        
        const productsEntity = products.map(p => ProductEntity.objectProducts(p));
        return productsEntity
    }

    public searchProducts = async(search:string) => {
        const products = await prisma.product.findMany({
            where:{name:{contains:search, mode:'insensitive'}},
            include:{
                productCategories:{
                    include:{category:true}
                }, 
                productImages:true
            }
        });
        
        const productsEntity = products.map(p => ProductEntity.objectProducts(p));

        return productsEntity;
    }
}