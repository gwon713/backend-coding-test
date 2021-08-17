import express, {Request, Response} from "express";
import logger from './config/logger';
import morganMiddleware from "./config/morgan";
import router from './config/route';
import storeRouter from './controller/storeRoute';

export class App{
    public app;

    constructor(){
        this.app = express();
        this.setMiddleware();
        this.setExpress();
    }

    private setExpress() : void { // express setting 
        try {
            this.setRoute();
        } catch(err){
            logger.error(err);
        }
    }
    private setRoute() : void { // express routing controller setting
        this.app.use(router);
        this.app.use(storeRouter);
    }
    private setMiddleware() : void {
        this.app.use(express.json()); // request body parsing setting
        this.app.use(express.urlencoded({ extended: false })); // request body parsing setting
        this.app.use(morganMiddleware) // morgan http logging setting
    }
}