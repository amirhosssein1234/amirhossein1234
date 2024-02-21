import { ArangoRepository } from 'nest-arango';
import { CategoryEntity } from '../../entities/category/category.entity';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: ArangoRepository<CategoryEntity>);
    create(category: CategoryEntity): Promise<object>;
    findAll(): Promise<import("nest-arango").ResultList<CategoryEntity>>;
    findByName(categoryName: string): Promise<object>;
    update(_id: string, updatedCategory: CategoryEntity): Promise<object>;
    remove(categoryKey: string): Promise<object>;
}
