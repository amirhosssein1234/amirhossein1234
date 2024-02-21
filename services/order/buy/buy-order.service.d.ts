import { ArangoRepository, ResultList } from 'nest-arango';
import { BuyOrderEntity } from '../../../entities/order/buy/buy-order.entity';
import { ReportService } from '../../report/report.service';
import { ProductService } from '../../product/product.service';
import { BuyOrderFilter } from '../../../interfaces/order/buy/buy-order-filter';
export declare class BuyOrderService {
    private readonly buyOrderRepository;
    private readonly reportService;
    private readonly productService;
    constructor(buyOrderRepository: ArangoRepository<BuyOrderEntity>, reportService: ReportService, productService: ProductService);
    create(buyOrder: BuyOrderEntity): Promise<object>;
    findAll(): Promise<ResultList<BuyOrderEntity>>;
    update(_id: string, updatedBuyOrder: BuyOrderEntity): Promise<object>;
    multiFilter(filterFormat: BuyOrderFilter): Promise<BuyOrderEntity[]>;
    remove(buyOrderId: string): Promise<object>;
}
