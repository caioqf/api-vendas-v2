import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.find();

    return customer
  }
}

export default ListCustomerService;
