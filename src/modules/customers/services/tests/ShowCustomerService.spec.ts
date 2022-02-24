import 'reflect-metadata'
import AppError from '@shared/errors/AppError';
import ShowCustomerService from '../ShowCustomerService';
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomerRepository";
import CreateCustomerService from '../CreateCustomerService';


describe('ShowCustomer', () => {

  let fakeCustomersRepository: FakeCustomerRepository;
  let showCustomer: ShowCustomerService; 
  let createCustomer: CreateCustomerService;

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomerRepository();
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
    createCustomer = new CreateCustomerService(fakeCustomersRepository);

  });

  it('should be able to show a costumer', async () => {
     const customer = await createCustomer.execute({
       name: 'caio',
       email: 'existo@gmail.com'
     });
     
     expect(customer).toHaveProperty('id');
     expect(customer.name).toBe(customer.name);
     expect(customer.email).toBe(customer.email);
  })


  it('should not be able to show a costumer if not exists', async () => {
    expect(
      showCustomer.execute({
        id: 'naoexisto'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

});
