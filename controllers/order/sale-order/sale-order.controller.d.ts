import { SaleOrderEntity } from '../../../entities/order/sale/sale-order.entity';
import { SaleOrderService } from '../../../services/order/sale/sale-order.service';
export declare class SaleOrderController {
    private readonly saleOrderService;
    constructor(saleOrderService: SaleOrderService);
    createSaleOrder(saleOrder: SaleOrderEntity): Promise<object>;
    getAllSaleOrders(): Promise<import("nest-arango").ResultList<SaleOrderEntity>>;
    updateSaleOrder(updatedSaleOrder: SaleOrderEntity, _id: string): Promise<object>;
    deleteSaleOrder(saleOrder_id: string): Promise<object>;
    findBySomeFilters(filters: string): Promise<SaleOrderEntity[]>;
    findSaleOrderByKey(key: string): Promise<any[]>;
}
