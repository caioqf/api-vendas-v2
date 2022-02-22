import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateCustomers } from "../domain/models/IUpdateCustomers";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import Customer from "../infra/typeorm/entities/Customer";


@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository) {}

    public async execute({id, name, email}: IUpdateCustomers): Promise<Customer>{
  
    const customer = await this.customerRepository.findById(id)
    
    if(!customer){
      throw new AppError('customer not found.')
    }

    const customerEmailExists = await this.customerRepository.findByEmail(email);

    if (customerEmailExists && customerEmailExists.email != email){
      throw new AppError('Email already in use.');
    }

    customer.name = name;
    customer.email = email;
    
    await this.customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
