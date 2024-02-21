import { ArangoDocument } from 'nest-arango';
export declare class BuyOrderEntity extends ArangoDocument {
    product_id: string;
    supplier_id: string;
    status: string;
    amount: number;
    scale: string;
    create_date: Date;
}
