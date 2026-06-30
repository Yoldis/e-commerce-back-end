import { BcryptAdapter } from "../config";
import type { CategoryModel, ImageModel, ProductModel, RoleModel, UserModel } from "../../generated/prisma/models";
import type { Sizes } from "../../generated/prisma/enums";

interface imageProductSeed {
  men:ImageModel[],
  women:ImageModel[],
  kids:ImageModel[],
}

export const roleSeed:RoleModel[]  = [
    {id:1, name:'Admin'},
    {id:2, name:'User'},
]

export const usersSeed:UserModel[] = [
    {name:'Administrador', email:'administrador@gmail.com', password:BcryptAdapter.generateHash('123123'), roleId:1, id:1, createdAt:new Date()},
    {name:'Usuario', email:'usuario@gmail.com', password:BcryptAdapter.generateHash('123123'), roleId:2, id:2, createdAt:new Date()},
];

export const categoriesSeed:CategoryModel[]  = [
    {id:1, name:'men'}, {id:2, name:'women'}, {id:3, name:'kids'},
]


function getRandomSizes() {
  const sizes:Sizes[] = ['Small', 'Medium', 'Large', 'X_Large'];
  const selectedSizes:Sizes[] = [];
  const numSizes = Math.floor(Math.random() * sizes.length) + 1;
  
  while (selectedSizes.length < numSizes) {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    if (size && !selectedSizes.includes(size)) selectedSizes.push(size);
  }
  
  return selectedSizes;
}
 
export const productMenSeed:ProductModel[] = [
  {
    name: 'Camisa en algodón pima Slim Fit',
    description: 'Camisa en algodón pima con un ajuste Slim Fit ideal para cualquier ocasión.',
    price: 37.99,
    inStock: 10,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:1,
    id:0
  },
  {
    name: 'Sobrecamisa con cremallera Regular Fit',
    description: 'Sobrecamisa con cremallera en corte Regular Fit para un look casual.',
    price: 42.99,
    inStock: 18,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:1,
    id:0
  },
  {
    name: 'Sobrecamisa cargo Regular Fit',
    description: 'Sobrecamisa estilo cargo con corte Regular Fit, perfecta para cualquier clima.',
    price: 32.99,
    inStock: 12,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:1,
    id:0
  },
  {
    name: 'Sobrecamisa en mezcla de lana Regular Fit',
    description: 'Sobrecamisa en mezcla de lana, con un ajuste Regular Fit para mayor confort.',
    price: 40.99,
    inStock: 7,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:1,
    id:0
  },
  {
    name: 'Sobrecamisa de pana Regular Fit',
    description: 'Sobrecamisa de pana con corte Regular Fit, ideal para el otoño.',
    price: 37.99,
    inStock: 19,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:1,
    id:0
  },
];

export const productsWomenSeed:ProductModel[] = [
  {
    name: 'Americana con cinturón de anudar',
    description: 'Americana elegante con cinturón de anudar, perfecta para un look sofisticado.',
    price: 39.99,
    inStock: 16,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:2,
    id:0
  },
  {
    name: 'Teddy-lined aviator jacket',
    description: 'Chaqueta aviadora con forro de peluche, perfecta para el invierno.',
    price: 44.99,
    inStock: 5,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:2,
    id:0
  },
  {
    name: 'Chaqueta de corte holgado en borreguito',
    description: 'Chaqueta de borreguito con un corte holgado para un estilo casual y cómodo.',
    price: 40.55,
    inStock: 8,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:2,
    id:0
  },
  {
    name: 'Abrigo de borreguito',
    description: 'Abrigo de borreguito ideal para mantenerse abrigada en los días fríos.',
    price: 69.99,
    inStock: 13,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:2,
    id:0
  },
  {
    name: 'Chaquetón marinero corto de fieltro',
    description: 'Chaquetón marinero corto, hecho de fieltro de alta calidad.',
    price: 49.99,
    inStock: 14,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:2,
    id:0
  },
];

export const productsKidsSeed:ProductModel[] = [
  {
    name: 'Sudadera',
    description: 'Sudadera para niños con un diseño cómodo y moderno.',
    price: 9.99,
    inStock: 15,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:3,
    id:0
  },
  {
    name: 'Cárdigan de punto fino',
    description: 'Cárdigan de punto fino, ideal para los días más frescos.',
    price: 14.99,
    inStock: 10,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:3,
    id:0
  },
  {
    name: 'Jersey de punto acanalado con flecos',
    description: 'Jersey de punto acanalado para niños, con flecos decorativos.',
    price: 14.55,
    inStock: 12,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:3,
    id:0
  },
  {
    name: 'Cárdigan de punto fino',
    description: 'Cárdigan de punto fino, en estilo clásico y cómodo para niños.',
    price: 16.99,
    inStock: 9,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:3,
    id:0
  },
  {
    name: 'Camisa vaquera de algodón',
    description: 'Camisa vaquera hecha de algodón suave para niños.',
    price: 19.99,
    inStock: 7,
    sizes: getRandomSizes(),
    isNew:false,
    createdAt:new Date(),
    categoryId:3,
    id:0
  },
];

export const imagesSeed:imageProductSeed = {
    men:[
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863296/E-Commerce/men/u5q7aimzmrblahtqqluy.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863295/E-Commerce/men/jczpdtlfp2l9x8e9zsw8.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863294/E-Commerce/men/fyfba0icleuxhlxl0mqs.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863293/E-Commerce/men/wkqzmrifmmiyrjldnvz8.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863292/E-Commerce/men/t7gppq9i1wcvlymj2pub.avif'},
    ],

    women: [
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863324/E-Commerce/women/hufa7qed5o5ltmzc1dx5.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863323/E-Commerce/women/o37wvjk9ylilw3x7d97c.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863322/E-Commerce/women/lqievoxgwstajxgn7oo7.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863321/E-Commerce/women/pzgstbxkq1gasa5wzapi.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863319/E-Commerce/women/o7dj8hzm3uu177wvycme.avif'},
    ],

    kids:[
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863351/E-Commerce/kids/stexeqf19ma7axlsehpz.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863349/E-Commerce/kids/f8brpbcxci23tuncqvix.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863348/E-Commerce/kids/dqdpihirqqv08gslx9al.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863346/E-Commerce/kids/viznmjl4ht30w64bzwkz.avif'},
      {id:0, productId:0, url:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863345/E-Commerce/kids/gohmsymjuaamebxidbdc.avif'},
    ]
}