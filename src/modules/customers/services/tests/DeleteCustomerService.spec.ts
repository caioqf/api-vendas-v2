import 'reflect-metadata'
import AppError from '@shared/errors/AppError';
import DeleteCustomerService from '../DeleteCustomerService';
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomerRepository";
import CreateCustomerService from '../CreateCustomerService';


describe('DeleteCustomer', () => {
  
  let createCustomer: CreateCustomerService;
  let fakeCustomerRepository: FakeCustomerRepository;
  let deleteCustomer: DeleteCustomerService;

  beforeEach(() => {
   
    fakeCustomerRepository = new FakeCustomerRepository();
    deleteCustomer = new DeleteCustomerService(fakeCustomerRepository);
    createCustomer = new CreateCustomerService(fakeCustomerRepository);

  });

  it('should be able to delete a customer', async () => {

    const customer = await createCustomer.execute({
      name: 'caioba',
      email: 'caio@gmal'
    });

    const deleted = await deleteCustomer.execute({
      id: customer.id,
    })
    expect(deleted).resolves
  })

  it('should not be able to delete inexistent customer', async () => {

    const customer = deleteCustomer.execute({
      id: 'fake_uuid_v4_non_existent'
    });

    expect(customer).rejects.toBeInstanceOf(AppError);
  })
})
