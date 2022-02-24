import 'reflect-metadata';
import UpdateCustomerService from '../UpdateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import AppError from '@shared/errors/AppError';
import CreateCustomerService from '../CreateCustomerService';


let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;
let createCustomer: CreateCustomerService;

describe('UpdateCustomer', () => {
    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    });

    it('should be able to update a costumer', async () => {
      const customer = await createCustomer.execute({
        name: 'caio',
        email: 'existo@gmail.com'
      });

      const update = updateCustomer.execute({
        id: customer.id,
        name: 'change',
        email: 'mudei@gmail.com',
      })
      expect(update).resolves
   })
    
    it('should not be able to update a inexistent customer', async () => {
      expect(
        updateCustomer.execute({
          id: 'noppers',
          name: 'noone',
          email: 'naoexisto@gmail.com'
        })
      ).rejects.toBeInstanceOf(AppError);
    })
  })
