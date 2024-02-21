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
exports.BuyOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const buy_order_service_1 = require("../../../services/order/buy/buy-order.service");
const buy_order_entity_1 = require("../../../entities/order/buy/buy-order.entity");
const auth_guard_1 = require("../../../auth/auth.guard");
const buy_order_filter_1 = require("../../../interfaces/order/buy/buy-order-filter");
const class_validator_1 = require("class-validator");
const database_1 = require("../../../database/database");
let BuyOrderController = class BuyOrderController {
    constructor(buyOrderService) {
        this.buyOrderService = buyOrderService;
    }
    async createBuyOrder(buyOrder) {
        try {
            return await this.buyOrderService.create(buyOrder);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllBuyOrders() {
        try {
            return await this.buyOrderService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateBuyOrder(updatedBuyOrder, _id) {
        try {
            return await this.buyOrderService.update(_id, updatedBuyOrder);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteBuyOrder(buyOrder_id) {
        try {
            return await this.buyOrderService.remove(buyOrder_id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findBuyOrderBySomeFilters(filter) {
        const filterObject = JSON.parse(filter);
        const buyOrderFilter = new buy_order_filter_1.BuyOrderFilter(filterObject);
        const errors = await (0, class_validator_1.validate)(buyOrderFilter);
        if (errors.length > 0) {
            throw new common_1.HttpException(errors[0].constraints, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return await this.buyOrderService.multiFilter(buyOrderFilter);
        }
    }
    async getBuyOrdersByKey(key) {
        try {
            return await database_1.MyDatabase.findByKey(key, 'BuyOrders', "buyOrder doesn't exist");
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.BuyOrderController = BuyOrderController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد سفارش خرید',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_order_entity_1.BuyOrderEntity]),
    __metadata("design:returntype", Promise)
], BuyOrderController.prototype, "createBuyOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تمامی سفارش های خرید',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyOrderController.prototype, "getAllBuyOrders", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ویرایش یک سفارش خرید',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_order_entity_1.BuyOrderEntity, String]),
    __metadata("design:returntype", Promise)
], BuyOrderController.prototype, "updateBuyOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':buyOrder_id'),
    (0, swagger_1.ApiOperation)({
        summary: 'حذف سفارش خرید',
    }),
    __param(0, (0, common_1.Param)('buyOrder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyOrderController.prototype, "deleteBuyOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('findByFilters'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت یک سفارش خرید به وسیله چندین فیلتر',
    }),
    __param(0, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyOrderController.prototype, "findBuyOrderBySomeFilters", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت سفارش خرید به وسیله آیدی آن',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyOrderController.prototype, "getBuyOrdersByKey", null);
exports.BuyOrderController = BuyOrderController = __decorate([
    (0, swagger_1.ApiTags)('buy-order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('buy-order'),
    __metadata("design:paramtypes", [buy_order_service_1.BuyOrderService])
], BuyOrderController);
//# sourceMappingURL=buy-order.controller.js.map