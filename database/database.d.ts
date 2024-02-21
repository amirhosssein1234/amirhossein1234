import { Database } from 'arangojs';
export declare class MyDatabase {
    private static db;
    static getDb(): Database;
    static productIsExist(product_id: string): Promise<boolean>;
    static supplierIsExist(value: string): Promise<boolean>;
    static categoryIsExist(value: string): Promise<boolean>;
    static getCollectionSize(collection_name: string): Promise<number>;
    static findByKey(key: string, collectionName: string, error_message: string): Promise<any[]>;
    static buyOrderIsExist(_id: string): Promise<boolean>;
    static customerIsExist(_id: string): Promise<boolean>;
    static saleOrderIsExist(_id: string): Promise<boolean>;
}
