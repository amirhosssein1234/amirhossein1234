import { ArangoDocument } from 'nest-arango';
export declare class CategoryEntity extends ArangoDocument {
    category_name: string;
    image_id: string;
    description: string;
    parent_id: string;
    path_to_root: string;
}
