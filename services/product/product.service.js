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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const arangojs_1 = require("arangojs");
const nest_arango_1 = require("nest-arango");
const database_1 = require("../../database/database");
const product_entity_1 = require("../../entities/product/product.entity");
const report_service_1 = require("../report/report.service");
let ProductService = class ProductService {
    constructor(productRepository, reportService) {
        this.productRepository = productRepository;
        this.reportService = reportService;
    }
    async create(product) {
        const isExist = await database_1.MyDatabase.productIsExist(product.product_id);
        if (isExist) {
            throw new Error('The product is exist');
        }
        else {
            const IsSupplierExist = await database_1.MyDatabase.supplierIsExist(product.supplier_id);
            const IsCategoryExist = await database_1.MyDatabase.categoryIsExist(product.category_id);
            console.log(IsSupplierExist, IsCategoryExist);
            if (IsSupplierExist && IsCategoryExist) {
                const report = {
                    title: `ایجاد محصول با ایدی  ${product.product_id}`,
                    content: [
                        `محصول با ایدی ${product.product_id}  به مقدار  ${product.balance} ایچاد شد`,
                    ],
                    date: new Date(),
                };
                await this.reportService.create(report);
                await this.productRepository.save(product);
                return {
                    result: 'the product with name  ' + product.product_name + ' created',
                };
            }
            else {
                if (!IsSupplierExist) {
                    throw new Error('The supplier doesnt exist');
                }
                else {
                    throw new Error('The category doesnt exist');
                }
            }
        }
    }
    async findAll() {
        return await this.productRepository.findAll();
    }
    async updateProduct(updatedProduct) {
        const isProductExist = await database_1.MyDatabase.productIsExist(updatedProduct.product_id);
        if (!isProductExist) {
            throw new Error('The product doesnt exist');
        }
        else {
            const isSupplierExist = await database_1.MyDatabase.supplierIsExist(updatedProduct.supplier_id);
            if (!isSupplierExist) {
                throw new Error('The supplier doesnt exist');
            }
            else {
                const categoryIsexist = await database_1.MyDatabase.categoryIsExist(updatedProduct.category_id);
                if (!categoryIsexist) {
                    throw new Error('category doesnt exist');
                }
                const newAndOldProduct = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
          FOR product IN Products
          FILTER product.product_id == ${updatedProduct.product_id}
          UPDATE product._key WITH ${updatedProduct} IN Products
          RETURN {
            oldProduct : OLD,
            newProduct : NEW,
          } 
       `);
                const updateOutput = await newAndOldProduct.next();
                const difference = {
                    oldPrice: updateOutput.oldProduct.price,
                    newPrice: updateOutput.newProduct.price,
                    oldSupplierId: updateOutput.oldProduct.supplier_id,
                    newSupplierId: updateOutput.newProduct.supplier_id,
                    oldBalance: updateOutput.oldProduct.balance,
                    newBalance: updateOutput.newProduct.balance,
                    oldImageId: updateOutput.oldProduct.image_id,
                    newImageId: updateOutput.newProduct.image_id,
                    oldExpiryDate: updateOutput.oldProduct.expiry_date,
                    newExpiryDate: updateOutput.newProduct.expiry_date,
                };
                const content = [];
                if (difference.oldPrice !== difference.newPrice) {
                    content.push(`قیمت محصول از  ${difference.oldPrice}  به  ${difference.newPrice}  تغییر کرد `);
                }
                if (difference.oldSupplierId !== difference.newSupplierId) {
                    const cursor = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
          FOR s IN Suppliers
          FILTER s._id == ${difference.oldSupplierId}
          RETURN s.supplier_name
        `);
                    const oldSupplierName = await cursor.next();
                    const cursor2 = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
          FOR s IN Suppliers
          FILTER s._id == ${difference.newSupplierId}
          RETURN s.supplier_name
        `);
                    const NewSupplierName = await cursor2.next();
                    content.push(`نام تامین کننده محصول از  ${oldSupplierName} به  ${NewSupplierName} تغییر کرد `);
                }
                if (difference.oldBalance !== difference.newBalance) {
                    content.push(`موجودی محصول از ${difference.oldBalance} به  ${difference.newBalance} تغییر کرد`);
                }
                if (difference.oldImageId !== difference.newImageId) {
                    content.push('عکس محصول تغییر کرد');
                }
                if (difference.oldExpiryDate !== difference.newExpiryDate) {
                    content.push(`تاریخ انقضای محصول از ${difference.oldExpiryDate} به  ${difference.newExpiryDate} تغییر کرد`);
                }
                const report = {
                    title: 'محصول با ایدی  ' +
                        updateOutput.oldProduct.product_id +
                        ' تغییر کرد ',
                    content: content,
                    date: new Date(),
                };
                await this.reportService.create(report);
                return { result: 'the product is updated' };
            }
        }
    }
    async removeProduct(product_id) {
        const deletedProduct = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR product IN Products
      FILTER product.product_id == ${product_id}
      REMOVE product IN Products
      RETURN OLD
    `);
        const isDeleted = await deletedProduct.all();
        if (isDeleted.length > 0) {
            const report = {
                title: 'delete product',
                content: [
                    `the product with name ${isDeleted[0].product_name} is deleted say Good bye`,
                ],
                date: new Date(),
            };
            await this.reportService.create(report);
            return isDeleted;
        }
        else {
            throw new Error('The product doesnt exist');
        }
    }
    async multiFilter(filterFormat) {
        const result = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR product IN Products
      FILTER ${filterFormat.product_name
            ? (0, arangojs_1.aql) `product.product_name == ${filterFormat.product_name}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.supplier_id
            ? (0, arangojs_1.aql) `product.supplier_id == ${filterFormat.supplier_id}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.balance_from
            ? (0, arangojs_1.aql) `product.balance >= ${filterFormat.balance_from}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.balance_to
            ? (0, arangojs_1.aql) `product.balance <= ${filterFormat.balance_to}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.scale
            ? (0, arangojs_1.aql) `product.scale == ${filterFormat.scale}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.category_id
            ? (0, arangojs_1.aql) `product.category_id == ${filterFormat.category_id}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.price_from
            ? (0, arangojs_1.aql) `product.price >= ${filterFormat.price_from}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.price_to
            ? (0, arangojs_1.aql) `product.price <= ${filterFormat.price_to}`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.expiry_date_from
            ? (0, arangojs_1.aql) `DATE_DIFF(product.expiry_date, ${filterFormat.expiry_date_from}, 'd') <= 0`
            : (0, arangojs_1.aql) `true`}
      FILTER ${filterFormat.expiry_date_to
            ? (0, arangojs_1.aql) `DATE_DIFF(product.expiry_date, ${filterFormat.expiry_date_to}, 'd') >= 0`
            : (0, arangojs_1.aql) `true`}
      RETURN product
    `);
        const finallyResult = await result.all();
        return finallyResult;
    }
    async findById(productId) {
        const productsDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR p IN Products
      FILTER p.product_id == ${productId}
      RETURN p
    `);
        const product = await productsDocument.next();
        if (product) {
            return product;
        }
        else {
            throw new Error('Product not found');
        }
    }
    async findByProductName(productName) {
        const productDocuments = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR p IN Products
      FILTER LIKE(p.product_name, CONCAT(${productName}, '%'))
      RETURN p
      `);
        const products = await productDocuments.all();
        if (products.length !== 0) {
            return products;
        }
        else {
            throw new Error('Any product with this name doesnt found');
        }
    }
    async isExpired(productId) {
        const product = await this.findById(productId);
        return product.expiry_date <= new Date();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_arango_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [nest_arango_1.ArangoRepository,
        report_service_1.ReportService])
], ProductService);
//# sourceMappingURL=product.service.js.map