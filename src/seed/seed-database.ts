import { prisma } from "../db/prismaClient";
import { imagesSeed, seedCategory, seedProductMen, seedProductsKids, seedProductsWomen, users } from "./seed";



(async() => {

    try {
        // 1. Eliminamos todos los datos
        await prisma.orderDetails.deleteMany();
        await prisma.order.deleteMany();
        await prisma.image.deleteMany();
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        await prisma.user.deleteMany();

        // 2. Crear la categorias
        await prisma.category.createMany({
            data:seedCategory.map(c => ({
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
        const productMen = seedProductMen.map((p) => {
            return {...p, categoryId:categoryMenDb?.id ?? ''}
        })

        const productWomen = seedProductsWomen.map((p) => {
            return {...p, categoryId:categoryWomenDb?.id ?? ''}
        })

        const productKids = seedProductsKids.map((p) => {
            return {...p, categoryId:categoryKidsDb?.id ?? ''}
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
                    url:imagesSeed.men[i] ?? ''
                }))
            }),
            prisma.image.createMany({
                data:productsDbWomen.map((p, i)=> ({
                    productId:p.id,
                    url:imagesSeed.women[i] ?? ''
                }))
            }),
            prisma.image.createMany({
                data:productsDbKids.map((p, i)=> ({
                    productId:p.id,
                    url:imagesSeed.kids[i] ?? ''
                }))
            })
        ])

        // 8. Creamos los usuarios
        await prisma.user.createMany({
            data:users.map(user => ({
                email:user.email,
                name:user.name,
                password:user.password,
                role:user.role,
            }))
        })
        console.log("Seed ejecutado correctamente.");

    } catch (error) {
        console.log(error)
        console.log("Algo salio mal al ejecutar el Seed.");
    }

})()