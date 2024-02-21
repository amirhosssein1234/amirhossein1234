import { ArangoRepository, ResultList } from 'nest-arango';
import { CustomerEntity } from 'src/entities/customer/customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: ArangoRepository<CustomerEntity>);
    create(customer: CustomerEntity): Promise<object>;
    findAll(): Promise<ResultList<CustomerEntity>>;
    update(_id: string, updatedCustomer: CustomerEntity): Promise<object>;
    remove(customer_key: string): Promise<object>;
    findBasedName(customerName: string): Promise<object>;
}
