import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({id}: IRequest): Promise<Customer>{
    const customersRepository = getCustomRepository(CustomerRepository);

    const customer = await customersRepository.findById(id);

    if(!customer){
      throw new AppError('User not found!')
    }

    return customer
  }
}

export default ShowCustomerService;
