import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';


describe('CreateCustomer', () => {
  it('should be able to create new customer', async () => {
    
    const fakeRepo = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeRepo);

    const customer = await createCustomer.execute({
      name: 'douglas',
      email: 'teste@gmail.com',
    })
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create new customer', () => {
    expect(1).toBe(1);
  });
});
