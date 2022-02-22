import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IDeleteCustomer } from "../domain/models/IDeleteCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

@injectable()
class DeleteCustomerService {

  constructor(@inject('CustomerRepository')
  private customerRepository: ICustomersRepository) {}

  public async execute({id}: IDeleteCustomer): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await this.customerRepository.findById(id);

    if(!customer){
      throw new AppError('Customer not found.');
    }

    await this.customerRepository.remove(customer);

  }
}

export default DeleteCustomerService;
