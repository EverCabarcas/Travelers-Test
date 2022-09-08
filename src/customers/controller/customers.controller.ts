import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomerDto } from '../dto/customer.dto';
import { Customer } from '../entity/customers.entity';
import { CustomersService } from '../service/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  async getCustomers(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Get('/:id')
  async getCustomer(@Param('id') id: number): Promise<Customer> {
    return await this.customerService.findOne(id);
  }

  @Post()
  async createCustomers(@Body() customer: CustomerDto): Promise<Customer> {
    return await this.customerService.create(customer);
  }
}
