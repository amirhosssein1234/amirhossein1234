import { ArangoRepository, ResultList } from 'nest-arango';
import { SaleOrderEntity } from '../../../entities/order/sale/sale-order.entity';
import { ReportService } from '../../report/report.service';
import { ProductService } from '../../product/product.service';
import { SaleOrderFilter } from '../../../interfaces/order/sale/sale-order-filter';
export declare class SaleOrderService {
    private readonly saleOrderRepository;
    private readonly reportService;
    private readonly productService;
    constructor(saleOrderRepository: ArangoRepository<SaleOrderEntity>, reportService: ReportService, productService: ProductService);
    create(saleOrder: SaleOrderEntity): Promise<object>;
    multiFilter(filterFormat: SaleOrderFilter): Promise<SaleOrderEntity[]>;
    findAll(): Promise<ResultList<SaleOrderEntity>>;
    update(_id: string, updatedSaleOrder: SaleOrderEntity): Promise<object>;
    remove(saleOrderId: string): Promise<object>;
}
