import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import AppError from '@shared/errors/AppError';


let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'douglas pena veiga araya faria borges',
      email: 'teste@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create new customer with existnt email', async () => {
    await createCustomer.execute({
      name: 'douglas pena veiga araya faria borges',
      email: 'teste@gmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'douglas pena veiga araya faria borges',
        email: 'teste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  })
});
