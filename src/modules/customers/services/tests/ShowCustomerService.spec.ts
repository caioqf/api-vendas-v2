import 'reflect-metadata'
import AppError from '@shared/errors/AppError';
import ShowCustomerService from '../ShowCustomerService';
import { v4 as uuid_v4 } from 'uuid';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomerRepository";


describe('ShowCustomer', () => {

  let fakeCustomersRepository: FakeCustomerRepository;
  let showCustomer: ShowCustomerService; 


  const fakeCustomer = {
    id: "fake_uuid_v4",
    name: "caio",
    email: "test@gmail.com",
    createdAt: new Date,
    updatedAt: new Date
  }

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomerRepository();
    showCustomer = new ShowCustomerService(fakeCustomersRepository);

  });

  it('should be able to show a costumer', async () => {
     const customer = await showCustomer.execute(fakeCustomer);
     
     expect(customer).toHaveProperty('id');
     expect(customer.name).toBe(fakeCustomer.name);
     expect(customer.email).toBe(fakeCustomer.email);
  })


  it('should not be able to show a costumer if not exists', async () => {
    expect(
      showCustomer.execute({
        ...fakeCustomer, id: uuid_v4()
      }),
    ).rejects.toBeInstanceOf(AppError);
  })

});
