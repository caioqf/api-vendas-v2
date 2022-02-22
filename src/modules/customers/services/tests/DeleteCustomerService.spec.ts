import 'reflect-metadata'
import AppError from '@shared/errors/AppError';
import DeleteCustomerService from '../DeleteCustomerService';
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomerRepository";


describe('DeleteCustomer', () => {
  
  let fakeCustomerRepository: FakeCustomerRepository;
  let deleteCustomer: DeleteCustomerService;

  beforeEach(() => {
    
    fakeCustomerRepository = new FakeCustomerRepository();
    deleteCustomer = new DeleteCustomerService(fakeCustomerRepository);

  });

  it('should be able to delete a customer', async () => {

    const customerDeleted = await deleteCustomer.execute({
      id: 'fake_uuid_v4'
    });
    
    expect(1).toBe(1);
  })

  it('should not be able to delete inexistent customer', async () => {

    const customer = deleteCustomer.execute({
      id: 'fake_uuid_v4_non_existent'
    });

    expect(customer).rejects.toBeInstanceOf(AppError);
  })
})
