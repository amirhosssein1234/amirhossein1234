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
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const arangojs_1 = require("arangojs");
const nest_arango_1 = require("nest-arango");
const database_1 = require("../../database/database");
const supplier_entity_1 = require("../../entities/supplier/supplier.entity");
let SupplierService = class SupplierService {
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    async create(supplier) {
        await this.supplierRepository.save(supplier);
        return { result: 'the supplier is created' };
    }
    async findAll() {
        return await this.supplierRepository.findAll();
    }
    async update(_id, updatedSupplier) {
        const updatedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
        FOR sup IN Suppliers 
        FILTER sup._id == ${_id}
        UPDATE sup WITH ${updatedSupplier} IN Suppliers
        RETURN OLD
    `);
        const isUpdated = await updatedDocument.next();
        if (isUpdated) {
            return { message: 'The supplier is successfully updated.' };
        }
        else {
            throw new Error('Supplier not found');
        }
    }
    async remove(supplier_key) {
        const deletedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR sup IN Suppliers
    FILTER sup._key == ${supplier_key}
    REMOVE sup IN Suppliers
    RETURN OLD
    `);
        const isDeleted = await deletedDocument.all();
        if (isDeleted.length > 0) {
            return { message: 'supplier successfully deleted' };
        }
        else {
            throw new Error('Supplier not found');
        }
    }
    async findOne(supplierName) {
        const supplier = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR supplier IN Suppliers
    FILTER LIKE(supplier.supplier_name, CONCAT(${supplierName}, '%'))
    RETURN supplier
    `);
        const isExist = supplier.all();
        if ((await isExist).length > 0 && supplierName !== '.') {
            return isExist;
        }
        else {
            throw new Error('Supplier not found');
        }
    }
};
exports.SupplierService = SupplierService;
exports.SupplierService = SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_arango_1.InjectRepository)(supplier_entity_1.SupplierEntity)),
    __metadata("design:paramtypes", [nest_arango_1.ArangoRepository])
], SupplierService);
//# sourceMappingURL=supplier.service.js.map