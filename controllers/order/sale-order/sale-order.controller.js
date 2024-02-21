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
exports.SaleOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sale_order_entity_1 = require("../../../entities/order/sale/sale-order.entity");
const sale_order_service_1 = require("../../../services/order/sale/sale-order.service");
const auth_guard_1 = require("../../../auth/auth.guard");
const sale_order_filter_1 = require("../../../interfaces/order/sale/sale-order-filter");
const class_validator_1 = require("class-validator");
const database_1 = require("../../../database/database");
let SaleOrderController = class SaleOrderController {
    constructor(saleOrderService) {
        this.saleOrderService = saleOrderService;
    }
    async createSaleOrder(saleOrder) {
        try {
            return await this.saleOrderService.create(saleOrder);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllSaleOrders() {
        try {
            return await this.saleOrderService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NO_CONTENT);
        }
    }
    async updateSaleOrder(updatedSaleOrder, _id) {
        try {
            return await this.saleOrderService.update(_id, updatedSaleOrder);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteSaleOrder(saleOrder_id) {
        try {
            return await this.saleOrderService.remove(saleOrder_id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findBySomeFilters(filters) {
        const filtersObject = JSON.parse(filters);
        const saleOrderFilters = new sale_order_filter_1.SaleOrderFilter(filtersObject);
        const errors = await (0, class_validator_1.validate)(saleOrderFilters);
        if (errors.length > 0) {
            throw new common_1.HttpException(errors[0].constraints, common_1.HttpStatus.BAD_REQUEST);
        }
        else if (errors.length == 0) {
            throw new common_1.HttpException('no saleorders found with this filters', common_1.HttpStatus.NO_CONTENT);
        }
        else {
            return await this.saleOrderService.multiFilter(saleOrderFilters);
        }
    }
    async findSaleOrderByKey(key) {
        try {
            return await database_1.MyDatabase.findByKey(key, 'SaleOrders', 'saleOrder doesnt exits');
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.SaleOrderController = SaleOrderController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد سفارش فروش',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sale_order_entity_1.SaleOrderEntity]),
    __metadata("design:returntype", Promise)
], SaleOrderController.prototype, "createSaleOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تمامی سفارش های فروش',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SaleOrderController.prototype, "getAllSaleOrders", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ویرایش یک سفارش فروش',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sale_order_entity_1.SaleOrderEntity, String]),
    __metadata("design:returntype", Promise)
], SaleOrderController.prototype, "updateSaleOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':saleOrder_id'),
    (0, swagger_1.ApiOperation)({
        summary: 'حذف سفارش فروش',
    }),
    __param(0, (0, common_1.Query)('saleOrder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleOrderController.prototype, "deleteSaleOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('findByFilters'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت یک سفارش فروش به وسیله چندین فیلتر',
    }),
    __param(0, (0, common_1.Query)('filters')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleOrderController.prototype, "findBySomeFilters", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت یک سفارش فروش به وسیله شناسه',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleOrderController.prototype, "findSaleOrderByKey", null);
exports.SaleOrderController = SaleOrderController = __decorate([
    (0, swagger_1.ApiTags)('sale-order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('sale-order'),
    __metadata("design:paramtypes", [sale_order_service_1.SaleOrderService])
], SaleOrderController);
//# sourceMappingURL=sale-order.controller.js.map