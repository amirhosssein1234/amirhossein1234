"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleOrderModule = void 0;
const common_1 = require("@nestjs/common");
const sale_order_controller_1 = require("../../../controllers/order/sale-order/sale-order.controller");
const sale_order_service_1 = require("../../../services/order/sale/sale-order.service");
const sale_order_entity_1 = require("../../../entities/order/sale/sale-order.entity");
const nest_arango_1 = require("nest-arango");
const report_service_1 = require("../../../services/report/report.service");
const report_entity_1 = require("../../../entities/report/report.entity");
const product_entity_1 = require("../../../entities/product/product.entity");
const product_service_1 = require("../../../services/product/product.service");
let SaleOrderModule = class SaleOrderModule {
};
exports.SaleOrderModule = SaleOrderModule;
exports.SaleOrderModule = SaleOrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_arango_1.ArangoModule.forFeature([sale_order_entity_1.SaleOrderEntity, report_entity_1.ReportEntity, product_entity_1.ProductEntity]),
        ],
        controllers: [sale_order_controller_1.SaleOrderController],
        providers: [sale_order_service_1.SaleOrderService, report_service_1.ReportService, product_service_1.ProductService],
    })
], SaleOrderModule);
//# sourceMappingURL=sale-order.module.js.map