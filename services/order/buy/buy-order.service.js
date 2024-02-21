"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyOrderService = void 0;
const common_1 = require("@nestjs/common");
const arangojs_1 = require("arangojs");
const nest_arango_1 = require("nest-arango");
const database_1 = require("../../../database/database");
const buy_order_entity_1 = require("../../../entities/order/buy/buy-order.entity");
const report_service_1 = require("../../report/report.service");
const product_service_1 = require("../../product/product.service");
let BuyOrderService = class BuyOrderService {
    constructor(buyOrderRepository, reportService, productService) {
        this.buyOrderRepository = buyOrderRepository;
        this.reportService = reportService;
        this.productService = productService;
    }
    async create(buyOrder) {
        const isExist = await database_1.MyDatabase.productIsExist(buyOrder.product_id);
        if (!isExist) {
            throw new Error('please first create the product');
        }
        const cursor = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR p IN Products
    FILTER p.product_id == ${buyOrder.product_id}
    RETURN p
  `);
        const product = await cursor.next();
        if (product.scale !== buyOrder.scale) {
            throw new Error('scale is not correct');
        }
        const supplier = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
          FOR s IN Suppliers
          FILTER s._id == ${buyOrder.supplier_id}
          RETURN s
          `);
        const s = await supplier.next();
        if (s === undefined)
            throw new Error('supplier does not exist');
        const report = {
            title: 'سفارش خرید از ' + s.supplier_name,
            content: ['این سفارش مربوط به خرید است'],
            date: new Date(),
        };
        await this.reportService.create(report);
        buyOrder.create_date = new Date();
        await this.buyOrderRepository.save(buyOrder);
        return { result: 'the buyOrder is created' };
    }
    async findAll() {
        const allBuyOrders = await this.buyOrderRepository.findAll();
        if (allBuyOrders.totalCount == 0) {
            throw new Error('there is no buy order');
        }
        else {
            return allBuyOrders;
        }
    }
    async update(_id, updatedBuyOrder) {
        const isProductExist = await database_1.MyDatabase.productIsExist(updatedBuyOrder.product_id);
        const isSupplierExist = await database_1.MyDatabase.supplierIsExist(updatedBuyOrder.supplier_id);
        if (!isProductExist) {
            throw new Error('product does not exist');
        }
        if (!isSupplierExist) {
            throw new Error('supplier does not exist');
        }
        const isBuyOrderExist = await database_1.MyDatabase.buyOrderIsExist(_id);
        if (!isBuyOrderExist) {
            throw new Error('buy order does not exist');
        }
        const updatedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
        FOR bo IN BuyOrders 
        FILTER bo._id == ${_id}
        UPDATE bo WITH ${updatedBuyOrder} IN BuyOrders
        RETURN OLD
    `);
        const isUpdated = await updatedDocument.next();
        if (isUpdated.status != 'finished' &&
            updatedBuyOrder.status == 'finished') {
            const product = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
        FOR product in Products
        FILTER product.product_id == ${updatedBuyOrder.product_id}
        RETURN product
      `);
            const p = await product.next();
            p.balance = p.balance + updatedBuyOrder.amount;
            await this.productService.updateProduct(p);
        }
        if (isUpdated) {
            return { message: 'The buyOrder is successfully updated.' };
        }
        else {
            return { error: 'buyOrder not found' };
        }
    }
    async multiFilter(filterFormat) {
        const result = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR bo IN BuyOrders
      FILTER ${filterFormat.product_id
            ? (0, arangojs_1.aql) `bo.product_id == ${filterFormat.product_id}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.supplier_id
            ? (0, arangojs_1.aql) `bo.customer_id == ${filterFormat.supplier_id}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.amount_from
            ? (0, arangojs_1.aql) `bo.amount >= ${filterFormat.amount_from}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.amount_to
            ? (0, arangojs_1.aql) `bo.amount <= ${filterFormat.amount_to}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.status
            ? (0, arangojs_1.aql) `bo.status == ${filterFormat.status}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.date_from
            ? (0, arangojs_1.aql) `bo.date >= ${filterFormat.date_from}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.date_to
            ? (0, arangojs_1.aql) `bo.date <= ${filterFormat.date_to}`
            : (0, arangojs_1.aql) `true`}
      RETURN bo
    `);
        const finallyResult = await result.all();
        return finallyResult;
    }
    async remove(buyOrderId) {
        const deletedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR bo IN BuyOrders
    FILTER bo._id == ${buyOrderId}
    REMOVE bo IN BuyOrders
    RETURN OLD
    `);
        const isDeleted = await deletedDocument.all();
        if (isDeleted.length > 0) {
            return { result: 'buyOrder successfully deleted' };
        }
        else {
            throw new Error('buyOrder not found');
        }
    }
};
exports.BuyOrderService = BuyOrderService;
exports.BuyOrderService = BuyOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_arango_1.InjectRepository)(buy_order_entity_1.BuyOrderEntity)),
    __metadata("design:paramtypes", [nest_arango_1.ArangoRepository,
        report_service_1.ReportService,
        product_service_1.ProductService])
], BuyOrderService);
//# sourceMappingURL=buy-order.service.js.map