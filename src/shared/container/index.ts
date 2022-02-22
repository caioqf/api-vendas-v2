import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import '@modules/users/providers';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  CustomerRepository,
  );
  
container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
  );
  
  container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
  );

// container.registerSingleton<IProductsRepository>(
//   'ProductsRepository',
//   ProductsRepository,
// );

// container.registerSingleton<IOrdersRepository>(
//   'OrdersRepository',
//   OrdersRepository,
// );

