import { prisma } from '../../db/prismaClient';
import type { CreateCategoryDto } from '../../domain/dto/createCategorie.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { MessageApiService } from './message.api.service';


export class CategoryService {

    constructor(
        private readonly messageApiService:MessageApiService
    ){}


    public addCategory = async(categoryDto:CreateCategoryDto) => {
        const category = await prisma.category.findFirst({where:{name:categoryDto.name}});
        if(category) throw this.messageApiService.badRequest("La categoria existe", null);
         
        const categorieNew = await prisma.category.create({data:{
            name:categoryDto.name,
            description:categoryDto.description,
            companyId:categoryDto.companyId,
        }});

        return CategoryEntity.objectCategory(categorieNew);
    }

    public updateCategory = async(id:number, categoryDto:CreateCategoryDto) => {
        const category = await prisma.category.findUnique({where:{id}});
        if(!category) throw this.messageApiService.badRequest("La categoria no existe", null);

        const categorieNew = await prisma.category.update({where:{id}, data:{
            name:categoryDto.name,
            description:categoryDto.description,
        }});
        return CategoryEntity.objectCategory(categorieNew);
    }

    public deleteCategory = async(id:number) => {
        const category = await prisma.category.findUnique({where:{id}});
        if(!category) throw this.messageApiService.badRequest("La categoria no existe", null);

        const categorieNew = await prisma.category.delete({where:{id}});
        return CategoryEntity.objectCategory(categorieNew);
    }

    public getCategories = async() => {
        return prisma.category.findMany();
    }

    public getCategoriesByCompanyId = async(companyId:number) => {
        return prisma.category.findMany({where:{companyId}});
    }
}