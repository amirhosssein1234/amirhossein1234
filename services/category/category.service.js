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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const nest_arango_1 = require("nest-arango");
const category_entity_1 = require("../../entities/category/category.entity");
const database_1 = require("../../database/database");
const arangojs_1 = require("arangojs");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(category) {
        const parentCategory = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR category IN Categories
      FILTER category._key == ${category.parent_id}
      RETURN category
    `);
        const pc = await parentCategory.next();
        if (!pc && category.parent_id != '') {
            throw new Error('Parent category not found');
        }
        const newCategory = await this.categoryRepository.save(category);
        if (category.parent_id == '') {
            newCategory.path_to_root = newCategory._key;
        }
        else {
            newCategory.path_to_root = pc.path_to_root + '.' + newCategory._key;
        }
        await this.update(newCategory._id, newCategory);
        return { result: 'the category is created' };
    }
    async findAll() {
        return await this.categoryRepository.findAll();
    }
    async findByName(categoryName) {
        const category = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR category IN Categories
    FILTER LIKE(category.category_name, CONCAT(${categoryName}, '%'))
    RETURN category
    `);
        const isExist = category.all();
        if ((await isExist).length > 0 && categoryName !== '.') {
            return isExist;
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async update(_id, updatedCategory) {
        const updatedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
        FOR cat IN Categories
        FILTER cat._id == ${_id}
        UPDATE cat WITH ${updatedCategory} IN Categories
        RETURN OLD
    `);
        const isUpdated = await updatedDocument.next();
        if (isUpdated) {
            return { message: 'The category is successfully updated.' };
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async remove(categoryKey) {
        const cursor = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR cat IN Categories
    FILTER cat._key == ${categoryKey}
    RETURN cat
    `);
        const deletedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
    FOR cat IN Categories
    FILTER cat._key == ${categoryKey}
    REMOVE cat IN Categories
    RETURN OLD
    `);
        const isDeleted = await deletedDocument.all();
        const category = await cursor.next();
        if (isDeleted.length > 0) {
            await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
       FOR category IN Categories
       FILTER LIKE(category.path_to_root, CONCAT(${category.path_to_root}, '%'))
       RETURN category
      `);
            await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
       FOR category IN Categories
       FILTER LIKE(category.path_to_root, CONCAT(${category.path_to_root}, '%'))
       REMOVE category IN Categories
      `);
            return { message: 'category successfully deleted' };
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_arango_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [nest_arango_1.ArangoRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map