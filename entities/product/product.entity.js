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
exports.ProductEntity = void 0;
const nest_arango_1 = require("nest-arango");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var scale;
(function (scale) {
    scale["kg"] = "kg";
    scale["g"] = "g";
    scale["pieces"] = "pieces";
    scale["ton"] = "ton";
})(scale || (scale = {}));
let ProductEntity = class ProductEntity extends nest_arango_1.ArangoDocument {
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'product pk', example: '1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 25),
    __metadata("design:type", String)
], ProductEntity.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'نام محصول', example: 'موز' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20),
    __metadata("design:type", String)
], ProductEntity.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ایدی تامین کننده محصول',
        example: 'Suppliers/92570',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Contains)('Suppliers/'),
    (0, class_validator_1.Length)(10, 25),
    __metadata("design:type", String)
], ProductEntity.prototype, "supplier_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'مقدار باقی مانده محصول در انبار',
        example: 5,
    }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'مقیاس موجودی محصول',
        example: 'kg',
    }),
    (0, class_validator_1.IsEnum)(scale),
    __metadata("design:type", String)
], ProductEntity.prototype, "scale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'آیدی دسته بندی',
        example: 'Categories/85640',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(12, 25),
    (0, class_validator_1.Contains)('Categories/'),
    __metadata("design:type", String)
], ProductEntity.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'آیدی عکس محصول',
        example: '996de063-3f1b-4201-b9a1-2da6b32f09c5',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "image_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'توضیحات محصول',
        example: 'موز به انبار اضافه شد',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 70),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'قیمت', example: 1000 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'تاریخ انقضا محصول',
        example: new Date('2024-12-31'),
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "expiry_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'برند محصول', example: 'چی توز' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], ProductEntity.prototype, "brand", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, nest_arango_1.Collection)('Products')
], ProductEntity);
//# sourceMappingURL=product.entity.js.map