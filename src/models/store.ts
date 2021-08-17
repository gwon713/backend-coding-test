import logger from '../config/logger';
export class Store{
    private name : String;
    private postcode : String;

    constructor(name: String, postcode: String) {
        this.name = name
        this.postcode = postcode
    }

    public getName(): String {
        return this.name;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public getPostcode(): String {
        return this.postcode;
    }

    public setPostcode(postcode: String): void {
        this.postcode = postcode;
    }
    public printInfoStore = (): void => {
        logger.info({
            store_name: this.name,
            store_postcode: this.postcode 
        })
    }
}