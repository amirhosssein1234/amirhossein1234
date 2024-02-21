/// <reference types="multer" />
import { ResultList } from 'nest-arango';
import { ProductService } from '../../services/product/product.service';
import { ProductEntity } from '../../entities/product/product.entity';
import { Response } from 'express';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(product: ProductEntity): Promise<object>;
    uploadProductImage(image: Express.Multer.File): Promise<any>;
    getImage(imageId: string, res: Response): Promise<void>;
    findAll(): Promise<ResultList<ProductEntity>>;
    updateProduct(product: ProductEntity): Promise<object>;
    removeProduct(product_id: string): Promise<object>;
    findBySomeFilter(filters: string): Promise<ProductEntity[]>;
    findById(productId: string): Promise<any>;
    findByProductName(productName: string): Promise<any[]>;
}
