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
exports.CategoryEntity = void 0;
const nest_arango_1 = require("nest-arango");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let CategoryEntity = class CategoryEntity extends nest_arango_1.ArangoDocument {
};
exports.CategoryEntity = CategoryEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'نام دسته بندی',
        example: 'صیفی جات',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 25),
    __metadata("design:type", String)
], CategoryEntity.prototype, "category_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'آیدی عکس دسته بندی',
        example: '1d9d6afa-923d-4e5d-85f2-e83a8f1d7809',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "image_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'توضیحات دسته بندی',
        example: 'این دسته بندی دارای میوه ها است',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 70),
    __metadata("design:type", String)
], CategoryEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'آیدی پدر دسته بندی',
        example: '',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "parent_id", void 0);
exports.CategoryEntity = CategoryEntity = __decorate([
    (0, nest_arango_1.Collection)('Categories')
], CategoryEntity);
//# sourceMappingURL=category.entity.js.map