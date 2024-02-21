import { ArangoDocument } from 'nest-arango';
export declare class CustomerEntity extends ArangoDocument {
    name: string;
    address: string;
}
