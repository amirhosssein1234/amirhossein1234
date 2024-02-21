"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDatabase = void 0;
const arangojs_1 = require("arangojs");
class MyDatabase {
    static getDb() {
        return MyDatabase.db;
    }
    static async productIsExist(product_id) {
        const cursor = await this.getDb().query((0, arangojs_1.aql) `
    FOR p IN Products
    FILTER p.product_id == ${product_id}
    RETURN p
  `);
        const isExist = await cursor.all();
        return isExist.length > 0;
    }
    static async supplierIsExist(value) {
        const cursor = await this.getDb().query((0, arangojs_1.aql) `
    FOR s IN Suppliers
    FILTER s._id == ${value}
    RETURN s
  `);
        const isExist = await cursor.all();
        return isExist.length > 0;
    }
    static async categoryIsExist(value) {
        const cursor = await this.getDb().query((0, arangojs_1.aql) `
    FOR category IN Categories
    FILTER category._id == ${value}
    RETURN category
  `);
        const isExist = cursor.all();
        return (await isExist).length > 0;
    }
    static async getCollectionSize(collection_name) {
        const collectionSize = await MyDatabase.getDb()
            .collection(collection_name)
            .count();
        return collectionSize.count;
    }
    static async findByKey(key, collectionName, error_message) {
        const document = await this.getDb()
            .collection(collectionName)
            .lookupByKeys([key]);
        if (document.length !== 0)
            return document;
        else
            throw new Error(error_message);
    }
    static async buyOrderIsExist(_id) {
        const cursor = await this.getDb().query((0, arangojs_1.aql) `
    FOR bo IN BuyOrders
    FILTER bo._id == ${_id}
    RETURN bo
  `);
        const isExist = await cursor.all();
        return isExist.length > 0;
    }
    static async customerIsExist(_id) {
        const cursor = await this.getDb().query((0, arangojs_1.aql) `
    FOR customer IN Customers
    FILTER customer._id == ${_id}
    RETURN customer
  `);
        const isExist = await cursor.all();
        return isExist.length > 0;
    }
    static async saleOrderIsExist(_id) {
        const cursor = await this.getDb().query((0, arangojs_1.aql) `
    FOR so IN SaleOrders
    FILTER so._id == ${_id}
    RETURN so
  `);
        const isExist = await cursor.all();
        return isExist.length > 0;
    }
}
exports.MyDatabase = MyDatabase;
MyDatabase.db = new arangojs_1.Database({
    url: 'http://localhost:8529',
    databaseName: '_system',
    auth: { username: 'root', password: 'azim1383' },
});
//# sourceMappingURL=database.js.map