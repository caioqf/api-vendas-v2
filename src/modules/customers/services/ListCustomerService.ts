import { inject, injectable } from "tsyringe";
import { IListCustomers } from "../domain/models/IListCustomers";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";


@injectable()
class ListCustomerService {

  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
    ) {}

  public async execute(): Promise<IListCustomers> {

    const customers = await this.customersRepository.findAll();

    return customers;
  }
}

export default ListCustomerService;
