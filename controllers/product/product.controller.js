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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("../../services/product/product.service");
const product_entity_1 = require("../../entities/product/product.entity");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs/promises");
const path = require("path");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const auth_guard_1 = require("../../auth/auth.guard");
const filesystem_1 = require("tsconfig-paths/lib/filesystem");
const product_filter_1 = require("../../interfaces/product/product-filter");
const class_validator_1 = require("class-validator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(product) {
        try {
            return await this.productService.create(product);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async uploadProductImage(image) {
        const imageId = (0, uuid_1.v4)();
        const folderPath = './images/products/';
        const imageBuffer = image.buffer;
        const imagePath = path.join(folderPath, `${imageId}.jpg`);
        await fs.writeFile(imagePath, imageBuffer);
        return await imageId;
    }
    async getImage(imageId, res) {
        const folderPath = './images/products/';
        const imagePath = path.join(folderPath, `${imageId}.jpg`);
        const isExist = (0, filesystem_1.fileExistsSync)(imagePath);
        if (isExist) {
            const file = (0, fs_1.createReadStream)(imagePath);
            file.pipe(res.set('content-type', 'image/jpeg'));
        }
        else {
            res.status(422).send({ error: 'image not found' });
        }
    }
    async findAll() {
        const products = await this.productService.findAll();
        if (products.totalCount == 0) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NO_CONTENT);
        }
        return products;
    }
    async updateProduct(product) {
        try {
            return await this.productService.updateProduct(product);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async removeProduct(product_id) {
        try {
            return await this.productService.removeProduct(product_id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findBySomeFilter(filters) {
        const filtersObject = JSON.parse(filters);
        const productFilters = new product_filter_1.ProductFilter(filtersObject);
        const errors = await (0, class_validator_1.validate)(productFilters);
        if (errors.length > 0) {
            throw new common_1.HttpException(errors[0].constraints, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const filteredProducts = await this.productService.multiFilter(filtersObject);
            if (filteredProducts.length > 0) {
                return filteredProducts;
            }
            else {
                throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
    }
    async findById(productId) {
        try {
            return await this.productService.findById(productId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findByProductName(productName) {
        try {
            return this.productService.findByProductName(productName);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ساخت محصول',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_entity_1.ProductEntity]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('upLoadProductImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiOperation)({
        summary: 'بارگذاری تصویر محصول',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5000000 }),
            new common_1.FileTypeValidator({ fileType: 'jpeg' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadProductImage", null);
__decorate([
    (0, common_1.Get)('downLoadProductImage'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تصویر محصول',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('imageId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getImage", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تمام محصولات',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ویرایش محصول',
        requestBody: { description: 'string', content: null, required: true },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_entity_1.ProductEntity]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':product_id'),
    (0, swagger_1.ApiOperation)({
        summary: 'حذف محصول',
    }),
    __param(0, (0, common_1.Param)('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('findByFilters'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت محصولات با فیلتر',
    }),
    __param(0, (0, common_1.Query)('filters')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findBySomeFilter", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('findById/:productId'),
    (0, swagger_1.ApiOperation)({
        summary: 'یافتن یک محصول با ایدی',
    }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('findByName'),
    (0, swagger_1.ApiOperation)({
        summary: 'یافتن یک محصول با نام ان',
    }),
    __param(0, (0, common_1.Query)('productName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findByProductName", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map