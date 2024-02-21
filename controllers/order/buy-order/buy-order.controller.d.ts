import { BuyOrderService } from '../../../services/order/buy/buy-order.service';
import { BuyOrderEntity } from '../../../entities/order/buy/buy-order.entity';
export declare class BuyOrderController {
    private readonly buyOrderService;
    constructor(buyOrderService: BuyOrderService);
    createBuyOrder(buyOrder: BuyOrderEntity): Promise<object>;
    getAllBuyOrders(): Promise<import("nest-arango").ResultList<BuyOrderEntity>>;
    updateBuyOrder(updatedBuyOrder: BuyOrderEntity, _id: string): Promise<object>;
    deleteBuyOrder(buyOrder_id: string): Promise<object>;
    findBuyOrderBySomeFilters(filter: string): Promise<BuyOrderEntity[]>;
    getBuyOrdersByKey(key: string): Promise<any[]>;
}
