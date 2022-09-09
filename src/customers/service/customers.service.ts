import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entity/transactions.entity';
import { Repository, DataSource } from 'typeorm';
import { CustomerDto } from '../dto/customer.dto';
import { Customer } from '../entity/customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private dataSource: DataSource,
  ) {}

  async create(customer: CustomerDto): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.dataSource
      .getRepository(Customer)
      .createQueryBuilder('customer')
      .orderBy('id', 'DESC')
      .take(10)
      .getMany();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOneBy({ id });
  }

  async findCustomerTransactions(id: number): Promise<Customer> {
    // const customer_id = id
    // return this.dataSource
    //   .createQueryBuilder(Transaction, 'transaction')
    //   .leftJoinAndSelect("transaction.customer", "customer", "customer.id = :customer_id", { customer_id })
    //   .orderBy('transactions.id', 'DESC')
    //   .take(3)
    //   .getMany();

    return await this.customerRepository.findOne({
      where: {
        id: id
      },
      relations: {
          transactions: true,
      },
  });
  }
}
