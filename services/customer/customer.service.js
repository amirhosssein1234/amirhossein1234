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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const arangojs_1 = require("arangojs");
const nest_arango_1 = require("nest-arango");
const database_1 = require("../../database/database");
const customer_entity_1 = require("../../entities/customer/customer.entity");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async create(customer) {
        await this.customerRepository.save(customer);
        return { result: 'the customer is created' };
    }
    async findAll() {
        return await this.customerRepository.findAll();
    }
    async update(_id, updatedCustomer) {
        const updatedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
        FOR cus IN Customers 
        FILTER cus._id == ${_id}
        UPDATE cus WITH ${updatedCustomer} IN Customers
        RETURN OLD
    `);
        const isUpdated = await updatedDocument.next();
        if (isUpdated) {
            return { message: 'The customer is successfully updated.' };
        }
        else {
            throw new Error('Customer not found');
        }
    }
    async remove(customer_key) {
        const deletedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR cus IN Customers
    FILTER cus._key == ${customer_key}
    REMOVE cus IN Customers
    RETURN OLD
    `);
        const isDeleted = await deletedDocument.all();
        if (isDeleted.length > 0) {
            return { message: 'customer successfully deleted' };
        }
        else {
            throw new Error('Customer not found');
        }
    }
    async findBasedName(customerName) {
        const customer = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR customer IN Customers
    FILTER LIKE(customer.name, CONCAT(${customerName}, '%'))
    RETURN customer
    `);
        const isExist = customer.all();
        if ((await isExist).length > 0 && customerName !== '.') {
            return isExist;
        }
        else {
            throw new Error('Customer not found');
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_arango_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __metadata("design:paramtypes", [nest_arango_1.ArangoRepository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map