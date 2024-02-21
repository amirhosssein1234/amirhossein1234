/// <reference types="multer" />
import { CategoryService } from '../../services/category/category.service';
import { CategoryEntity } from '../../entities/category/category.entity';
import { Response } from 'express';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(category: CategoryEntity): Promise<object>;
    uploadProductImage(image: Express.Multer.File): Promise<any>;
    getImage(imageId: string, res: Response): Promise<void>;
    findAllCategory(): Promise<import("nest-arango").ResultList<CategoryEntity>>;
    findCategoriesByName(categoryName: string): Promise<object>;
    updateCategory(category: CategoryEntity, _id: string): Promise<object>;
    removeCategory(key: string): Promise<object>;
    findByKey(key: string): Promise<any[]>;
}
