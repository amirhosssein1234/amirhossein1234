import { ArangoDocument } from 'nest-arango';
export declare class SaleOrderEntity extends ArangoDocument {
    product_id: string;
    customer_id: string;
    status: string;
    amount: number;
    scale: string;
    create_date: Date;
}
