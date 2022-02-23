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

    it('should be able to update a existent customer', async () => {
        const fakeRecivedId = 'fake_uuid_v4';

        const recivedCustomer = await fakeCustomersRepository.findById(fakeRecivedId);
        
        const afterUpdateCustomer = await updateCustomer.execute({
            id: "fake_uuid_v4",
            email: "tested@gmail.com",
            name: 'douglas',
        })

        expect(afterUpdateCustomer).toHaveProperty('id');
        expect(afterUpdateCustomer.name).toBe(recivedCustomer?.name)
        expect(afterUpdateCustomer.email).toBe(recivedCustomer?.email)
    });

    it('should not be able to update a inexistent customer', () => {
      expect(
          updateCustomer.execute({
              id: 'esto_non_existe',
              name: 'caio',
              email: 'caio@faria',
        }),
      ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to update to a existent email', async () => {
      
      const updated = await updateCustomer.execute({
        id: 'fake_uuid_v4',
        email: "test_diff@gmail.com",
        name: 'caio',
      })

      expect(updated).rejects.toBeInstanceOf(AppError);
    })
})
