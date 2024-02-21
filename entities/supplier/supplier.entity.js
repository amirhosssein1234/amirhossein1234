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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const nest_arango_1 = require("nest-arango");
const class_validator_1 = require("class-validator");
let SupplierEntity = class SupplierEntity extends nest_arango_1.ArangoDocument {
};
exports.SupplierEntity = SupplierEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'نام تامین کننده',
        example: 'شرکت فولاد',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], SupplierEntity.prototype, "supplier_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'شماره همراه تامین کننده',
        example: '09132345632',
    }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(3, 25),
    __metadata("design:type", String)
], SupplierEntity.prototype, "supplier_telephone_number", void 0);
exports.SupplierEntity = SupplierEntity = __decorate([
    (0, nest_arango_1.Collection)('Suppliers')
], SupplierEntity);
//# sourceMappingURL=supplier.entity.js.map