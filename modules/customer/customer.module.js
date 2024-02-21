"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const customer_controller_1 = require("../../controllers/customer/customer.controller");
const customer_service_1 = require("../../services/customer/customer.service");
const customer_entity_1 = require("../../entities/customer/customer.entity");
const nest_arango_1 = require("nest-arango");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [nest_arango_1.ArangoModule.forFeature([customer_entity_1.CustomerEntity])],
        controllers: [customer_controller_1.CustomerController],
        providers: [customer_service_1.CustomerService],
    })
], CustomerModule);
//# sourceMappingURL=customer.module.js.map