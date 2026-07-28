import { prisma } from "../../db/prismaClient";
import { CreateCompanyDto } from "../../domain";
import { CompanyEntity } from "../../domain/entities/company.entity";
import type { MessageApiService } from "./message.api.service";


export class CompanyService {
    
    constructor(
        private readonly messageApiService:MessageApiService
    ){}

     public geCompanyById = async(companyId:number) => {
        const existCompany = await prisma.company.findUnique({where:{id:companyId}});
        if(!existCompany) throw this.messageApiService.badRequest("La empresa no existe");
        return CompanyEntity.create(existCompany);
    }

    public createCompany = async(createCompanyDto:CreateCompanyDto) => {
        const existCompany = await prisma.company.findFirst({where:{
            OR:[
                {businessName: {contains:createCompanyDto.businessName}},
                {tradeName:{contains:createCompanyDto.tradeName}}
            ]
        }});

        if(existCompany) throw this.messageApiService.badRequest("La empresa ya existe");

        const company = await prisma.company.create({
            data:{
                address:createCompanyDto.address,
                businessName:createCompanyDto.businessName,
                currency:createCompanyDto.currency,
                email:createCompanyDto.email,
                logo:createCompanyDto.logo,
                phone:createCompanyDto.phone,
                tradeName:createCompanyDto.tradeName,
                userId:createCompanyDto.userId,
            }
        });

        return CompanyEntity.create(company);
    }

    
    async updateCompany (createCompanyDto:CreateCompanyDto) {
        if(!createCompanyDto.id) throw this.messageApiService.badRequest("La empresa no existe");
        const existCompany = await prisma.company.findFirst({where:{
            AND:[
                {id:createCompanyDto.id}
            ],
             OR:[
                {businessName: {equals:createCompanyDto.businessName}},
                {tradeName:{equals:createCompanyDto.tradeName}}
            ]
        }});
        
        if(existCompany) throw this.messageApiService.badRequest("La empresa ya existe");

        const company = await prisma.company.update({where:{id:createCompanyDto.id}, data:
        {
                address:createCompanyDto.address,
                businessName:createCompanyDto.businessName,
                currency:createCompanyDto.currency,
                email:createCompanyDto.email,
                logo:createCompanyDto.logo,
                phone:createCompanyDto.phone,
                tradeName:createCompanyDto.tradeName,
                userId:createCompanyDto.userId,
            }
        });

        return CompanyEntity.create(company);
    }

}