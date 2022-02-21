import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";


interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({id, name, email}: IRequest): Promise<Customer>{
  
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findOne(id)
    
    if(!customer){
      throw new AppError('customer not found.')
    }

    const customerEmailExists = await customerRepository.findByEmail(email);

    if (customerEmailExists && customerEmailExists.email != email){
      throw new AppError('Email already in use.');
    }

    customer.name = name;
    customer.email = email;
    
    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
