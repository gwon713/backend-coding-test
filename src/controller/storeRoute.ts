import express, { Request, Response } from 'express';
import router from '../config/route';
import logger from '../config/logger';

import { Store } from '../models/store';

const postcodes = require('node-postcodes.io'); // get latitude and longitudefor postcodes.io mudule
const storeDataJSON = require('../../data/stores.json'); // json data load


let storeData : Store[] = []; // JSON Data Class 형태로 전환한 Data 저장할 Store객체 Array 선언
storeDataJSON.forEach((item: { name: String; postcode: String; }) => { // JSON에서 데이터를 가져옴
    storeData.push(new Store(item.name, item.postcode));// Store 객체 생성하여 배열에 push
});

const storeRouter = router;

// get the list of stores in 
storeRouter.get('/stores', (req: Request, res: Response) => { 
    const storeNameList = storeData.map((item: Store)=>{ return { name: item.getName() } }); // map을 사용하여 배열에서 name 값만 추출

    // Store List Empty Check
    if(storeNameList.length != 0){ 
        res.status(200).send({
            result : storeNameList
        });
    }else{
        res.status(400).send({
            message: "No Stores Results"
        });
    }
})

// get the specific item of stores in 
storeRouter.get('/store/:name/items', (req: Request, res: Response) => {
    // get store_name parameter
    const storeName = req.params.name;
    
    logger.info("Search store // search store_name : "+storeName);
    const ResponseResult = storeData.find((item: Store)=>{// find: 조건에 부합하는 배열의 첫번째 값만 return , filter를 사용하면 배열안에 중복 이름인 Store도 출력가능    
        if(item.getName()===storeName){ // search_storeName에 해당하는 Store 이름 확인  
            return item; // 해당하는 Item 반환
        }
    });

    // result Object Empty check
    if(ResponseResult !== undefined){ 
        res.status(200).send({
            result: ResponseResult
        });
    }else{
        res.status(400).send({
            message: "No Search Store Results"
        });
    }
});

// get the latitude and longitude for each postcode
storeRouter.get('/location/:postcode', async(req: Request, res: Response) => {
    // get postcode parameter
    const postcode = req.params.postcode;
    logger.info("Get latitude and longitude // postcodes : "+postcode);

    const locationResult = await postcodes.lookup(postcode);

    // location result check
    if(locationResult.status == 200){ 
        res.status(200).send({
            result: {
                postcode: locationResult.result.postcode,
                longitude: locationResult.result.longitude,
                latitude: locationResult.result.latitude
            }
        });
    }else{
        res.status(400).send({
            message: "No Store Location List Results"
        });
    }
});

// get postcode arround stores
storeRouter.get('/store/:postcode/arround', async(req:Request, res: Response)=>{
    // 위도 경도 파라미터 받기 
    const postcode = req.params.postcode;
    // postcode에 해당하는 위도 경도 반경 값 가져오기
    const locationResult = await postcodes.lookup(postcode);
    const radius = req.query.rad;

    // location result check
    if(locationResult.status == 200){ 
        const longitude = locationResult.result.longitude;
        const latitude = locationResult.result.latitude;

        // 위도 경도 반경 값에 해당하는 postcode 정보 가져오기
        const geoResult = await postcodes.geo([{
            longitude : longitude,
            latitude : latitude,
            radius: radius
        }]);
        
        // Geocoding Result Check
        if(geoResult.status != 200 || geoResult.result[0].result==null){ 
            res.status(400).send({
                message: "No Postcode Arround Stores Results"
            });
        }else{
            // 필요한 정보인 postcode longitude latitude만 배열로 저장
            let Array_geoResult = geoResult.result[0].result.map((item: {postcode: String, longitude: Number, latitude: Number}) => {
                return {postcode: item.postcode, longitude: item.longitude, latitude: item.latitude};
            });
            // reverse sort Array_geoResult 북쪽에서 남쪽으로 정렬
            Array_geoResult.sort((a: {postcode: String, longitude: Number, latitude: Number},b: {postcode: String, longitude: Number, latitude: Number})=>{
                return a.latitude > b.latitude ? -1 : 1;
            });
            
            // StoreData 와 Array_geoResult 비교 
            let storeResult = storeData.filter((store_item: Store)=>{// Store Data의 postcode와 Array_geoResult의 postcode 부합한 Store Data의 Array<Object> return
                return Array_geoResult.find((geo_item: {postcode: String, longitude: Number, latitude: Number})=>{ // Store Data의 postcode와 Array_geoResult의 postcode 부합합 데이터를 return   
                    if(store_item.getPostcode()===geo_item.postcode){ // Store Data의 postcode와 Array_geoResult의 postcode 부합한 Store를 return 
                        return store_item.getName(); // 해당하는 Item 반환
                    }
                });
            });
            // map을 사용하여 배열에서 name 값만 추출 
            let ResponseResult = storeResult.map((item: Store)=>{ return { name: item.getName() } }); 
            
            res.status(200).send({
                result: ResponseResult
            })
        }
    }else{
        res.status(400).send({
            message: "No Store Location List Results"
        });
    }
});


export default storeRouter