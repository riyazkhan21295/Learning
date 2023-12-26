import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/create-customer.dto';
import { ICustomer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: ICustomer[] = [
    { id: 1, email: 'Email #1', name: 'Name #1' },
    { id: 2, email: 'Email #2', name: 'Name #2' },
    { id: 3, email: 'Email #3', name: 'Name #3' },
  ];

  createCustomer(createCustomerDto: CreateCustomerDto) {
    const newCustomer = {
      ...createCustomerDto,
    };

    this.customers.push(newCustomer);

    return newCustomer;
  }

  getCustomers() {
    return this.customers;
  }

  findCustomerById(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }
}
