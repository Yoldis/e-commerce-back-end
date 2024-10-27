

1. Instalar los modulos de node: "npm install".

2. Renombrar el archivo ".env.template" a ".env".

2. Crear la base de datos "e_commerceDB" u otra en particular, pero tambien cambiandola en "DATABASE_URL" con el nombre respectivo de la base de datos que elegiste en postgres.

4. Agrega tu "usuario_db" y "passoword_db" en la variable de entorno "DATABASE_URL".

4. Ejecutar las migraciones de prisma con: "npx prisma migrate dev -n init".

5. Ejecutar seed para usuarios y datos: "npm run seed".
    administrador: administrador@gmail.com, passowrd:123123 
    usuario: usuario@gmail.com, passowrd:123123

6. Levantar el proyecto con: "npm run dev".


Nota: La nueva version de los tipos de express @types/express 5.0.0 causa un error de tipado si intentas retornar una repuesta asi: return res.status(400).json({error}), versiones anteriores como 4.17.21 si deja funcionar;