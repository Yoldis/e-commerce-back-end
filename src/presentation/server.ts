
process.loadEnvFile();

import express from 'express';
import cors from 'cors';
import { AppRouter } from './routes';
import fileUpload from 'express-fileupload';

export class Server {
    
    private app = express();
    private port = process.env.PORT;
    
    public start(){
        
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp',
                createParentPath: true,
            }),
        );

        this.app.use('/api', AppRouter.routes);
        
        this.listen();
    }


    private listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor levantador en el puerto ${this.port}`)
        })
    }

}
