import { prisma } from "../db/prismaClient";
import { imagesSeed, categoriesSeed, productMenSeed, productsKidsSeed, productsWomenSeed, usersSeed, roleSeed } from "./seed";

(async() => {

    try {
        // 1. Eliminamos todos los datos
        await prisma.orderDetails.deleteMany();
        await prisma.order.deleteMany();
        await prisma.shoopingCart.deleteMany();
        await prisma.image.deleteMany();
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        await prisma.user.deleteMany();
        await prisma.role.deleteMany();

        // 2. Crear la categorias
        await prisma.category.createMany({
            data:categoriesSeed.map(c => ({
                name:c.name
            }))
        });

        // 3. Busca cada una de las categoria por nombre
        const [categoryMenDb, categoryWomenDb, categoryKidsDb] = await Promise.all([
            prisma.category.findFirst({where:{name:'men'}}),
            prisma.category.findFirst({where:{name:'women'}}),
            prisma.category.findFirst({where:{name:'kids'}}),
        ]);

        // 4. Le asignamos la categoria a cada producto
        const productMen = productMenSeed.map((p) => {
            return {...p, categoryId:categoryMenDb?.id ?? 0}
        })

        const productWomen = productsWomenSeed.map((p) => {
            return {...p, categoryId:categoryWomenDb?.id ?? 0}
        })

        const productKids = productsKidsSeed.map((p) => {
            return {...p, categoryId:categoryKidsDb?.id ?? 0}
        })

        // 5. Creamos los productos
        await prisma.product.createMany({
            data:[...productMen, ...productWomen, ...productKids].map(p => ({
                name:p.name,
                description:p.description,
                inStock:p.inStock,
                price:p.price,
                categoryId:p.categoryId,
                sizes:p.sizes
            })),
        })

        // 6. Buscamos cada productos por su categoria en la DB
        const [productsDbMen, productsDbWomen, productsDbKids] = await Promise.all([
            prisma.product.findMany({where:{category:{name:'men'}}}),
            prisma.product.findMany({where:{category:{name:'women'}}}),
            prisma.product.findMany({where:{category:{name:'kids'}}}),
        ])
        
        // 7. Creamos las imagenes de cada productos por su categoria
        await Promise.all([
            prisma.image.createMany({
                data:productsDbMen.map((p, i)=> ({
                    productId:p.id,
                    url:imagesSeed.men[i]?.url ?? ''
                }))
            }),
            prisma.image.createMany({
                data:productsDbWomen.map((p, i)=> ({
                    productId:p.id,
                    url:imagesSeed.women[i]?.url ?? ''
                }))
            }),
            prisma.image.createMany({
                data:productsDbKids.map((p, i)=> ({
                    productId:p.id,
                    url:imagesSeed.kids[i]?.url ?? ''
                }))
            })
        ])

        // 8. Crear los roles
        await prisma.role.createMany({
            data:roleSeed.map(c => ({
                name:c.name
            }))
        });

        // 9. Creamos los usuarios
        await prisma.user.createMany({
            data:usersSeed.map(user => ({
                email:user.email,
                name:user.name,
                password:user.password,
                roleId:user.roleId,
            }))
        })
        console.log("Seed ejecutado correctamente.");

    } catch (error) {
        console.log(error)
        console.log("Algo salio mal al ejecutar el Seed.");
    }

})()