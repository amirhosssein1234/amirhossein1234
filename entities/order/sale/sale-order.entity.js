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
exports.SaleOrderEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const nest_arango_1 = require("nest-arango");
const class_validator_1 = require("class-validator");
var status;
(function (status) {
    status["pending"] = "pending";
    status["finished"] = "finished";
    status["canceled"] = "canceled";
})(status || (status = {}));
var scale;
(function (scale) {
    scale["kg"] = "kg";
    scale["g"] = "g";
    scale["pieces"] = "pieces";
    scale["ton"] = "ton";
})(scale || (scale = {}));
let SaleOrderEntity = class SaleOrderEntity extends nest_arango_1.ArangoDocument {
};
exports.SaleOrderEntity = SaleOrderEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ایدی محصول',
        example: '1',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 25),
    __metadata("design:type", String)
], SaleOrderEntity.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ایدی مصرف کننده',
        example: 'Customers/34750',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 25),
    (0, class_validator_1.Contains)('Customers/'),
    __metadata("design:type", String)
], SaleOrderEntity.prototype, "customer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'وضعیت سفاارش',
        example: 'pending',
    }),
    (0, class_validator_1.IsEnum)(status),
    __metadata("design:type", String)
], SaleOrderEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'مقدار فروش',
        example: 500,
    }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], SaleOrderEntity.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'مقیاس فروش',
        example: 'kg',
    }),
    (0, class_validator_1.IsEnum)(scale),
    __metadata("design:type", String)
], SaleOrderEntity.prototype, "scale", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], SaleOrderEntity.prototype, "create_date", void 0);
exports.SaleOrderEntity = SaleOrderEntity = __decorate([
    (0, nest_arango_1.Collection)('SaleOrders')
], SaleOrderEntity);
//# sourceMappingURL=sale-order.entity.js.map