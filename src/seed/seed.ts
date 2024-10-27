import { Role } from "@prisma/client";
import { BcryptAdapter } from "../config";

interface User {
    name:string,
    email:string,
    password:string,
    role:Role,
}


export const users:User[] = [
    {name:'Administrador', email:'administrador@gmail.com', password:BcryptAdapter.generateHash('123123'), role:"Admin"},

    {name:'Usuario', email:'usuario@gmail.com', password:BcryptAdapter.generateHash('123123'), role:"User"},
];

export const seedCategory  = [
    {name:'men'}, {name:'women'}, {name:'kids'},
]



function getRandomSizes() {
    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];
    const selectedSizes:string[] = [];
    const numSizes = Math.floor(Math.random() * sizes.length) + 1;
    
    while (selectedSizes.length < numSizes) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      if (!selectedSizes.includes(size)) {
        selectedSizes.push(size);
      }
    }
    
    return selectedSizes;
  }
  
  export const seedProductMen = [
    {
      name: 'Camisa en algodón pima Slim Fit',
      description: 'Camisa en algodón pima con un ajuste Slim Fit ideal para cualquier ocasión.',
      price: 37.99,
      inStock: 10,
      sizes: getRandomSizes(),
    },
    {
      name: 'Sobrecamisa con cremallera Regular Fit',
      description: 'Sobrecamisa con cremallera en corte Regular Fit para un look casual.',
      price: 42.99,
      inStock: 18,
      sizes: getRandomSizes(),
    },
    {
      name: 'Sobrecamisa cargo Regular Fit',
      description: 'Sobrecamisa estilo cargo con corte Regular Fit, perfecta para cualquier clima.',
      price: 32.99,
      inStock: 12,
      sizes: getRandomSizes(),
    },
    {
      name: 'Sobrecamisa en mezcla de lana Regular Fit',
      description: 'Sobrecamisa en mezcla de lana, con un ajuste Regular Fit para mayor confort.',
      price: 40.99,
      inStock: 7,
      sizes: getRandomSizes(),
    },
    {
      name: 'Sobrecamisa de pana Regular Fit',
      description: 'Sobrecamisa de pana con corte Regular Fit, ideal para el otoño.',
      price: 37.99,
      inStock: 19,
      sizes: getRandomSizes(),
    },
  ];
  
  export const seedProductsWomen = [
    {
      name: 'Americana con cinturón de anudar',
      description: 'Americana elegante con cinturón de anudar, perfecta para un look sofisticado.',
      price: 39.99,
      inStock: 16,
      sizes: getRandomSizes(),
    },
    {
      name: 'Teddy-lined aviator jacket',
      description: 'Chaqueta aviadora con forro de peluche, perfecta para el invierno.',
      price: 44.99,
      inStock: 5,
      sizes: getRandomSizes(),
    },
    {
      name: 'Chaqueta de corte holgado en borreguito',
      description: 'Chaqueta de borreguito con un corte holgado para un estilo casual y cómodo.',
      price: 40.55,
      inStock: 8,
      sizes: getRandomSizes(),
    },
    {
      name: 'Abrigo de borreguito',
      description: 'Abrigo de borreguito ideal para mantenerse abrigada en los días fríos.',
      price: 69.99,
      inStock: 13,
      sizes: getRandomSizes(),
    },
    {
      name: 'Chaquetón marinero corto de fieltro',
      description: 'Chaquetón marinero corto, hecho de fieltro de alta calidad.',
      price: 49.99,
      inStock: 14,
      sizes: getRandomSizes(),
    },
  ];
  
  export const seedProductsKids = [
    {
      name: 'Sudadera',
      description: 'Sudadera para niños con un diseño cómodo y moderno.',
      price: 9.99,
      inStock: 15,
      sizes: getRandomSizes(),
    },
    {
      name: 'Cárdigan de punto fino',
      description: 'Cárdigan de punto fino, ideal para los días más frescos.',
      price: 14.99,
      inStock: 10,
      sizes: getRandomSizes(),
    },
    {
      name: 'Jersey de punto acanalado con flecos',
      description: 'Jersey de punto acanalado para niños, con flecos decorativos.',
      price: 14.55,
      inStock: 12,
      sizes: getRandomSizes(),
    },
    {
      name: 'Cárdigan de punto fino',
      description: 'Cárdigan de punto fino, en estilo clásico y cómodo para niños.',
      price: 16.99,
      inStock: 9,
      sizes: getRandomSizes(),
    },
    {
      name: 'Camisa vaquera de algodón',
      description: 'Camisa vaquera hecha de algodón suave para niños.',
      price: 19.99,
      inStock: 7,
      sizes: getRandomSizes(),
    },
  ];



export const imagesSeed = {
    men:[
        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863296/E-Commerce/men/u5q7aimzmrblahtqqluy.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863295/E-Commerce/men/jczpdtlfp2l9x8e9zsw8.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863294/E-Commerce/men/fyfba0icleuxhlxl0mqs.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863293/E-Commerce/men/wkqzmrifmmiyrjldnvz8.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863292/E-Commerce/men/t7gppq9i1wcvlymj2pub.avif'
    ],

    women: [
        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863324/E-Commerce/women/hufa7qed5o5ltmzc1dx5.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863323/E-Commerce/women/o37wvjk9ylilw3x7d97c.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863322/E-Commerce/women/lqievoxgwstajxgn7oo7.avif',
        
        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863321/E-Commerce/women/pzgstbxkq1gasa5wzapi.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863319/E-Commerce/women/o7dj8hzm3uu177wvycme.avif',

    ],

    kids:[

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863351/E-Commerce/kids/stexeqf19ma7axlsehpz.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863349/E-Commerce/kids/f8brpbcxci23tuncqvix.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863348/E-Commerce/kids/dqdpihirqqv08gslx9al.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863346/E-Commerce/kids/viznmjl4ht30w64bzwkz.avif',

        'https://res.cloudinary.com/dljqyy9l7/image/upload/v1729863345/E-Commerce/kids/gohmsymjuaamebxidbdc.avif'
    ]
}