import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { getRepository, Repository } from "typeorm";
import Customer from '../entities/Customer';


export default class ICustomerRepository implements ICustomersRepository {

  private ormRepository: Repository<Customer>;
  
  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async create({name, email}: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({
      name, 
      email
    });
    await this.ormRepository.save(customer);
    return customer;
  } 

  public async save(customer: ICustomer): Promise<ICustomer> {
  
    await this.ormRepository.save(customer);
    return customer
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = await this.ormRepository.findOne({
        where: {
            email,
        }
    });
    return customer;
}

  public async findByName(name: string): Promise<ICustomer | undefined > {
      const customer = await this.ormRepository.findOne({
          where: {
              name,
          }
      });
      return customer;
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
      
      const user = await this.ormRepository.findOne({
          where: {
              id,
          }
      });

      return user;
  }

  public async findAll(): Promise<ICustomer[] | undefined> {
      
    const customers = await this.ormRepository.find()
      
    return customers;
  }

}
