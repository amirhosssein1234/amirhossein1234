import { CustomerService } from '../../services/customer/customer.service';
import { CustomerEntity } from '../../entities/customer/customer.entity';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    createCustomer(customer: CustomerEntity): Promise<object>;
    getAllCustomers(): Promise<import("nest-arango").ResultList<CustomerEntity>>;
    updateCustomer(updatedCustomer: CustomerEntity, _id: string): Promise<object>;
    deleteCustomer(customer_key: string): Promise<object>;
    findBasedName(customerName: string): Promise<object>;
    findBasedKey(key: string): Promise<any[]>;
}
