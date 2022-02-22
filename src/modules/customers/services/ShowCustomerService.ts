import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowCustomer } from "../domain/models/IShowCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import Customer from "../infra/typeorm/entities/Customer";


@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository) {}

  public async execute({id}: IShowCustomer): Promise<Customer>{
    
    const customer = await this.customerRepository.findById(id);
    
    if(!customer){
      throw new AppError('User not found!')
    }

    return customer
  }
}

export default ShowCustomerService;
