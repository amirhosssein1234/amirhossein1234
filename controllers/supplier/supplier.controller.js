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
exports.SupplierController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const supplier_entity_1 = require("../../entities/supplier/supplier.entity");
const supplier_service_1 = require("../../services/supplier/supplier.service");
const auth_guard_1 = require("../../auth/auth.guard");
const database_1 = require("../../database/database");
let SupplierController = class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    async createSupplier(supplier) {
        return await this.supplierService.create(supplier);
    }
    async getAllSuppliers() {
        const suppliers = await this.supplierService.findAll();
        if (suppliers.totalCount == 0) {
            throw new common_1.HttpException('Supplier not found', common_1.HttpStatus.NO_CONTENT);
        }
        return suppliers;
    }
    async updateSupplier(updatedSupplier, _id) {
        try {
            return await this.supplierService.update(_id, updatedSupplier);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteSupplier(supplier_key) {
        try {
            return await this.supplierService.remove(supplier_key);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findSupplier(supplierName) {
        if (supplierName === '.') {
            return { error: 'نام تامین کننده نامعتبر است' };
        }
        try {
            return await this.supplierService.findOne(supplierName);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findByKey(key) {
        try {
            return await database_1.MyDatabase.findByKey(key, 'Suppliers', 'supplier doesnt exist');
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.SupplierController = SupplierController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد تامین کننده',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplier_entity_1.SupplierEntity]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تمامی تامین کنندگان',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getAllSuppliers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ویرایش یک تامین کننده به وسیله نام آن',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplier_entity_1.SupplierEntity, String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "updateSupplier", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':supplier_key'),
    (0, swagger_1.ApiOperation)({
        summary: 'حذف تامین کننده به وسیله آیدی آن',
    }),
    __param(0, (0, common_1.Param)('supplier_key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteSupplier", null);
__decorate([
    (0, common_1.Get)('supplierName'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت یک تامین کننده به وسیله نام آن',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('supplierName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "findSupplier", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت یک تامین کننده به وسیله کلید آن',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "findByKey", null);
exports.SupplierController = SupplierController = __decorate([
    (0, swagger_1.ApiTags)('supplier'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('supplier'),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierController);
//# sourceMappingURL=supplier.controller.js.map