import { ArangoRepository, ResultList } from 'nest-arango';
import { ProductEntity } from 'src/entities/product/product.entity';
import { ReportService } from '../report/report.service';
import { ProductFilter } from '../../interfaces/product/product-filter';
export declare class ProductService {
    private readonly productRepository;
    private readonly reportService;
    constructor(productRepository: ArangoRepository<ProductEntity>, reportService: ReportService);
    create(product: ProductEntity): Promise<object>;
    findAll(): Promise<ResultList<ProductEntity>>;
    updateProduct(updatedProduct: ProductEntity): Promise<object>;
    removeProduct(product_id: string): Promise<object>;
    multiFilter(filterFormat: ProductFilter): Promise<ProductEntity[]>;
    findById(productId: string): Promise<any>;
    findByProductName(productName: string): Promise<any[]>;
    isExpired(productId: string): Promise<boolean>;
}
