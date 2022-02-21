import {v4 as uuid_v4 }  from 'uuid';
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import Customer from '@modules/customers/infra/typeorm/entities/Customer';


export default class FakeCustomerRepository implements ICustomersRepository{

  private customers: Customer[] = [];
  

  public async create({name, email}: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuid_v4();
    customer.email= email;
    customer.name = name;
    
    this.customers.push(customer);
     
    return customer;
  } 

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined > {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

}
