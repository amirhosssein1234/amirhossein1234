import { ArangoDocument } from 'nest-arango';
export declare class SupplierEntity extends ArangoDocument {
    supplier_name: string;
    supplier_telephone_number: string;
}
