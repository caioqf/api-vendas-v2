import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.find();

    return customer
  }
}

export default ListCustomerService;
