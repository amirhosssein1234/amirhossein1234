import { ArangoDocument } from 'nest-arango';
export declare class ProductEntity extends ArangoDocument {
    product_id: string;
    product_name: string;
    supplier_id: string;
    balance: number;
    scale: string;
    category_id: string;
    image_id: string;
    description: string;
    price: number;
    expiry_date?: Date;
    brand: string;
}
