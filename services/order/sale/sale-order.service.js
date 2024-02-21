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
exports.SaleOrderService = void 0;
const common_1 = require("@nestjs/common");
const arangojs_1 = require("arangojs");
const nest_arango_1 = require("nest-arango");
const database_1 = require("../../../database/database");
const sale_order_entity_1 = require("../../../entities/order/sale/sale-order.entity");
const report_service_1 = require("../../report/report.service");
const product_service_1 = require("../../product/product.service");
let SaleOrderService = class SaleOrderService {
    constructor(saleOrderRepository, reportService, productService) {
        this.saleOrderRepository = saleOrderRepository;
        this.reportService = reportService;
        this.productService = productService;
    }
    async create(saleOrder) {
        const saleOrderProduct = await this.productService.findById(saleOrder.product_id);
        if (await database_1.MyDatabase.productIsExist(saleOrder.product_id)) {
            const customer = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
          FOR c IN Customers
          FILTER c._id == ${saleOrder.customer_id}
          RETURN c
          `);
            const c = await customer.next();
            if (c === undefined)
                throw new Error('customer does not exist');
            if (saleOrder.scale !== saleOrderProduct.scale) {
                throw new Error('scale is not the same as the product');
            }
            else {
                if (saleOrder.amount > saleOrderProduct.balance) {
                    throw new Error('amount is not enough');
                }
                else {
                    if (await this.productService.isExpired(saleOrder.product_id)) {
                        throw new Error('the product is expired');
                    }
                    else {
                        const report = {
                            title: 'سفارش فروش به ' + c.name,
                            content: ['این سفارش مربوط به فروش است'],
                            date: new Date(),
                        };
                        await this.reportService.create(report);
                        await this.saleOrderRepository.save(saleOrder);
                        return { result: 'the saleOrder is created' };
                    }
                }
            }
        }
        else {
            throw new Error('product does not exist');
        }
    }
    async multiFilter(filterFormat) {
        const result = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR so IN SaleOrders
      FILTER ${filterFormat.product_id
            ? (0, arangojs_1.aql) `so.product_id == ${filterFormat.product_id}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.customer_id
            ? (0, arangojs_1.aql) `so.customer_id == ${filterFormat.customer_id}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.amount_from
            ? (0, arangojs_1.aql) `so.amount >= ${filterFormat.amount_from}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.amount_to
            ? (0, arangojs_1.aql) `so.amount <= ${filterFormat.amount_to}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.status
            ? (0, arangojs_1.aql) `so.status == ${filterFormat.status}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.date_from
            ? (0, arangojs_1.aql) `DATE_DIFF(so.create_date, ${filterFormat.date_from}, 'd') <= 0`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.date_to
            ? (0, arangojs_1.aql) `DATE_DIFF(so.create_date, ${filterFormat.date_to}, 'd') >= 0`
            : (0, arangojs_1.aql) `true`}
      RETURN so
    `);
        const finallyResult = await result.all();
        return finallyResult;
    }
    async findAll() {
        const allSaleOrders = await this.saleOrderRepository.findAll();
        if (allSaleOrders.totalCount == 0) {
            throw new Error('no sale order found');
        }
        return allSaleOrders;
    }
    async update(_id, updatedSaleOrder) {
        const isProductExist = await database_1.MyDatabase.productIsExist(updatedSaleOrder.product_id);
        const customerIsExist = await database_1.MyDatabase.customerIsExist(updatedSaleOrder.customer_id);
        if (!isProductExist) {
            throw new Error('product does not exist');
        }
        if (!customerIsExist) {
            throw new Error('customer does not exist');
        }
        const isSaleOrderExist = await database_1.MyDatabase.saleOrderIsExist(_id);
        if (!isSaleOrderExist) {
            throw new Error('sale order does not exist');
        }
        const updatedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
        FOR so IN SaleOrders 
        FILTER so._id == ${_id}
        UPDATE so WITH ${updatedSaleOrder} IN SaleOrders
        RETURN OLD
    `);
        const isUpdated = await updatedDocument.next();
        console.log(isUpdated);
        if (isUpdated.status == 'pending' &&
            updatedSaleOrder.status == 'finished') {
            const product = await this.productService.findById(updatedSaleOrder.product_id);
            product.balance = product.balance - updatedSaleOrder.amount;
            await this.productService.updateProduct(product);
        }
        if (isUpdated) {
            return { message: 'The saleOrder is successfully updated.' };
        }
    }
    async remove(saleOrderId) {
        const deletedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR so IN SaleOrders
    FILTER so._id == ${saleOrderId}
    REMOVE so IN SaleOrders
    RETURN OLD
    `);
        const isDeleted = await deletedDocument.all();
        if (isDeleted.length > 0) {
            return { result: 'saleOrder successfully deleted' };
        }
        else {
            throw new Error('saleOrder does not exist');
        }
    }
};
exports.SaleOrderService = SaleOrderService;
exports.SaleOrderService = SaleOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_arango_1.InjectRepository)(sale_order_entity_1.SaleOrderEntity)),
    __metadata("design:paramtypes", [nest_arango_1.ArangoRepository,
        report_service_1.ReportService,
        product_service_1.ProductService])
], SaleOrderService);
//# sourceMappingURL=sale-order.service.js.map