"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyOrderModule = void 0;
const common_1 = require("@nestjs/common");
const buy_order_controller_1 = require("../../../controllers/order/buy-order/buy-order.controller");
const buy_order_service_1 = require("../../../services/order/buy/buy-order.service");
const buy_order_entity_1 = require("../../../entities/order/buy/buy-order.entity");
const nest_arango_1 = require("nest-arango");
const report_service_1 = require("../../../services/report/report.service");
const report_entity_1 = require("../../../entities/report/report.entity");
const product_entity_1 = require("../../../entities/product/product.entity");
const product_service_1 = require("../../../services/product/product.service");
let BuyOrderModule = class BuyOrderModule {
};
exports.BuyOrderModule = BuyOrderModule;
exports.BuyOrderModule = BuyOrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_arango_1.ArangoModule.forFeature([buy_order_entity_1.BuyOrderEntity, report_entity_1.ReportEntity, product_entity_1.ProductEntity]),
        ],
        controllers: [buy_order_controller_1.BuyOrderController],
        providers: [buy_order_service_1.BuyOrderService, report_service_1.ReportService, product_service_1.ProductService],
    })
], BuyOrderModule);
//# sourceMappingURL=buy-order.module.js.map