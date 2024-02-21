import { SupplierEntity } from 'src/entities/supplier/supplier.entity';
import { SupplierService } from 'src/services/supplier/supplier.service';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    createSupplier(supplier: SupplierEntity): Promise<object>;
    getAllSuppliers(): Promise<import("nest-arango").ResultList<SupplierEntity>>;
    updateSupplier(updatedSupplier: SupplierEntity, _id: string): Promise<object>;
    deleteSupplier(supplier_key: string): Promise<object>;
    findSupplier(supplierName: string): Promise<object>;
    findByKey(key: string): Promise<any[]>;
}
