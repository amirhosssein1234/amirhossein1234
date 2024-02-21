import { ArangoDocument } from 'nest-arango';
export declare class UserEntity extends ArangoDocument {
    username: string;
    password: string;
}
