import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";


interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({name, email}: IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomerRepository);

    const emailExists = await customerRepository.findByEmail(email);
    
    if(emailExists){
      throw new AppError('Email already in use.')
    }
    const customer = customerRepository.create({
      name,
      email,
    })
    
    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
