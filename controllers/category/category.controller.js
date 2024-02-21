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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("../../services/category/category.service");
const category_entity_1 = require("../../entities/category/category.entity");
const platform_express_1 = require("@nestjs/platform-express");
const uuid_1 = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const auth_guard_1 = require("../../auth/auth.guard");
const fs_1 = require("fs");
const database_1 = require("../../database/database");
const filesystem_1 = require("tsconfig-paths/lib/filesystem");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async createCategory(category) {
        category.path_to_root = '';
        try {
            return await this.categoryService.create(category);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async uploadProductImage(image) {
        const imageId = (0, uuid_1.v4)();
        const folderPath = './images/categories/';
        const imageBuffer = image.buffer;
        const imagePath = path.join(folderPath, `${imageId}.jpg`);
        await fs.writeFile(imagePath, imageBuffer);
        return await imageId;
    }
    async getImage(imageId, res) {
        const folderPath = './images/categories/';
        const imagePath = path.join(folderPath, `${imageId}.jpg`);
        const isExist = (0, filesystem_1.fileExistsSync)(imagePath);
        if (isExist) {
            const file = (0, fs_1.createReadStream)(imagePath);
            file.pipe(res.set('Content-Type', 'image/jpeg'));
        }
        else {
            res.status(422).send({ error: 'image not found' });
        }
    }
    async findAllCategory() {
        const categories = await this.categoryService.findAll();
        if (categories.totalCount == 0) {
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NO_CONTENT);
        }
        return categories;
    }
    async findCategoriesByName(categoryName) {
        try {
            return await this.categoryService.findByName(categoryName);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
    }
    async updateCategory(category, _id) {
        try {
            return await this.categoryService.update(_id, category);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
    }
    async removeCategory(key) {
        try {
            return await this.categoryService.remove(key);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
    }
    async findByKey(key) {
        try {
            return await database_1.MyDatabase.findByKey(key, 'Categories', 'Category not found');
        }
        catch (error) {
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'ساخت دسته بندی',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.CategoryEntity]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Post)('upLoadCategoryImage'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'بارگذاری تصویر دسته بندی',
    }),
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
], CategoryController.prototype, "uploadProductImage", null);
__decorate([
    (0, common_1.Get)('downLoadCategoryImage'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تصویر دسته بندی',
    }),
    __param(0, (0, common_1.Query)('imageId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getImage", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تمام دسته بندی ها',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/categoryName'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت دسته بندی با نام ',
    }),
    __param(0, (0, common_1.Query)('categoryName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findCategoriesByName", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ویرایش دسته بندی',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.CategoryEntity, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'حذف دسته بندی',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت دسته بندی با کلید',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findByKey", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('category'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map