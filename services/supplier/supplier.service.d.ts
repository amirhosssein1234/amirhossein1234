import { ArangoRepository, ResultList } from 'nest-arango';
import { SupplierEntity } from 'src/entities/supplier/supplier.entity';
export declare class SupplierService {
    private readonly supplierRepository;
    constructor(supplierRepository: ArangoRepository<SupplierEntity>);
    create(supplier: SupplierEntity): Promise<object>;
    findAll(): Promise<ResultList<SupplierEntity>>;
    update(_id: string, updatedSupplier: SupplierEntity): Promise<object>;
    remove(supplier_key: string): Promise<object>;
    findOne(supplierName: string): Promise<object>;
}
