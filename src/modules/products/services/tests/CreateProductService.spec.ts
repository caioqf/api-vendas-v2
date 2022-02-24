import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import AppError from '@shared/errors/AppError';

describe('CreateProduct', () => {
  
  let fakeProducRepository: FakeProductsRepository;
  let createProduct: CreateProductService;

  beforeEach(() => {
    
    fakeProducRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProducRepository);
    
  })

  it('should be able to create a new product', async () => {
    
    const product = await createProduct.execute({
      name: 'dummy',
      price: 8999,
      quantity: 5,
    })
    
    expect(product).resolves
  })

  it('should not be able to create a product with repeated name', async () => {
    
    const product = await createProduct.execute({
      name: 'dummy',
      price: 8999,
      quantity: 5,
    })

    expect(
      createProduct.execute({
        name: 'dummy',
        price: 8999,
        quantity: 5,
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})
