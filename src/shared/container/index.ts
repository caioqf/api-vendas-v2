import {container}  from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';


container.registerSingleton<ICustomersRepository>('CustomerRepository', CustomerRepository) ;
