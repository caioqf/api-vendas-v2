import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import '@modules/users/providers';

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  CustomerRepository,
  );
  
  container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository,
  );

// container.registerSingleton<IProductsRepository>(
//   'ProductsRepository',
//   ProductsRepository,
// );

// container.registerSingleton<IOrdersRepository>(
//   'OrdersRepository',
//   OrdersRepository,
// );

// container.registerSingleton<IUserTokensRepository>(
//   'UserTokensRepository',
//   UserTokensRepository,
// );
