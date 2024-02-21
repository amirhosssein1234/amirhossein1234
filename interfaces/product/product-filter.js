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
exports.ProductFilter = void 0;
const class_validator_1 = require("class-validator");
var scale;
(function (scale) {
    scale["kg"] = "kg";
    scale["g"] = "g";
    scale["pieces"] = "pieces";
    scale["ton"] = "ton";
})(scale || (scale = {}));
class ProductFilter {
    constructor(obj) {
        this.product_name = obj.product_name;
        this.supplier_id = obj.supplier_id;
        this.balance_from = obj.balance_from;
        this.balance_to = obj.balance_to;
        this.scale = obj.scale;
        this.category_id = obj.category_id;
        this.price_from = obj.price_from;
        this.price_to = obj.price_to;
        this.expiry_date_from = obj.expiry_date_from;
        this.expiry_date_to = obj.expiry_date_to;
    }
}
exports.ProductFilter = ProductFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20),
    __metadata("design:type", String)
], ProductFilter.prototype, "product_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 25),
    (0, class_validator_1.Contains)('Suppliers/'),
    __metadata("design:type", String)
], ProductFilter.prototype, "supplier_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ProductFilter.prototype, "balance_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ProductFilter.prototype, "balance_to", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(scale),
    __metadata("design:type", String)
], ProductFilter.prototype, "scale", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(12, 25),
    (0, class_validator_1.Contains)('Categories/'),
    __metadata("design:type", String)
], ProductFilter.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ProductFilter.prototype, "price_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ProductFilter.prototype, "price_to", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ProductFilter.prototype, "expiry_date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ProductFilter.prototype, "expiry_date_to", void 0);
//# sourceMappingURL=product-filter.js.map