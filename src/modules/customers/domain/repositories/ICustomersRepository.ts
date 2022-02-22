import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { IDeleteCustomer } from '../models/IDeleteCustomer';

export interface ICustomersRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findAll(): Promise<Customer[] | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  remove(id: IDeleteCustomer): Promise<void>;
  save(customer: ICustomer): Promise<ICustomer>;

}
