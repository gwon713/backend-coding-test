import express, { Request, Response } from 'express';
import router from '../config/route';
import logger from '../config/logger';

import { Store } from '../models/store';

const postcodes = require('node-postcodes.io');
const storeDataJSON = require('../../data/stores.json');


let storeData : Store[] = []; // JSON Data Class 형태로 전환
storeDataJSON.forEach((element: { name: String; postcode: String; }) => {
    storeData.push(new Store(element.name, element.postcode));
});

const storeRouter = router;

storeRouter.get('/stores', (req: Request, res: Response) => {
    res.status(200).send({
        stores : storeData
    })
})

storeRouter.get('/store/search', async(req: Request, res: Response) => {
    const search_storeName = req.query.store_name;

    const ResponseResult = await storeData.filter((element: Store)=>{// filter 
        if(element.getName()===search_storeName){
            return element;
        }
    });
    logger.info('store search');
    res.status(200).send({
        search_store: ResponseResult
    })
})

storeRouter.get('/stores/location')


export default storeRouter