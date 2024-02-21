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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_service_1 = require("../../services/customer/customer.service");
const customer_entity_1 = require("../../entities/customer/customer.entity");
const auth_guard_1 = require("../../auth/auth.guard");
const database_1 = require("../../database/database");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async createCustomer(customer) {
        return await this.customerService.create(customer);
    }
    async getAllCustomers() {
        const customers = await this.customerService.findAll();
        if (customers.totalCount == 0) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NO_CONTENT);
        }
        return customers;
    }
    async updateCustomer(updatedCustomer, _id) {
        try {
            return await this.customerService.update(_id, updatedCustomer);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteCustomer(customer_key) {
        try {
            return await this.customerService.remove(customer_key);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findBasedName(customerName) {
        try {
            return await this.customerService.findBasedName(customerName);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findBasedKey(key) {
        try {
            return await database_1.MyDatabase.findByKey(key, 'Customers', 'customer doesnt exist');
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد مشتری',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_entity_1.CustomerEntity]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تمامی مشتریان',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ویرایش یک مشتری به وسیله نام آن',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_entity_1.CustomerEntity, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':customer_key'),
    (0, swagger_1.ApiOperation)({
        summary: 'حذف مشتری به وسیله آیدی آن',
    }),
    __param(0, (0, common_1.Param)('customer_key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('findByName/:customerName'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت یک مشتری به وسیله نام آن',
    }),
    __param(0, (0, common_1.Param)('customerName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findBasedName", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت یک مشتری به وسیله کلید آن',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findBasedKey", null);
exports.CustomerController = CustomerController = __decorate([
    (0, swagger_1.ApiTags)('customer'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map