import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/create-customer.dto';

import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get()
  getAllCustomers() {
    return this.customersService.getCustomers();
  }

  @Get(':id')
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (!customer) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send({ msg: 'Customer not found!' });
    }

    return response.send(customer);
  }

  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (!customer) {
      throw new NotFoundException('Customer Not Found!');
    }

    return customer;
  }
}
