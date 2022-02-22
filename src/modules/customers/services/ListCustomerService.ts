import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";


@injectable
class ListCustomerService {

  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
    ) {}

  public async execute(): Promise<Customer[]> {

    const customer = await this.customersRepository.find();

    return customer
  }
}

export default ListCustomerService;
