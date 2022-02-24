import { container } from 'tsyringe';
import '@modules/users/providers';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductsRepositoriy';

import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';


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

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductRepository,
);

// container.registerSingleton<IOrdersRepository>(
//   'OrdersRepository',
//   OrdersRepository,
// );

