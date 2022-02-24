import 'reflect-metadata';
import UpdateProductService from '../UpdateProductService';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import AppError from '@shared/errors/AppError';


describe('ShowProduct', () => {
  
  let fakeProductsRepository: FakeProductsRepository;
  let updateProduct: UpdateProductService;
  let createProduct: CreateProductService;

  beforeEach(() => {
    
    fakeProductsRepository = new FakeProductsRepository();
    updateProduct = new UpdateProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository, );

  })

  it('should update a product', async () => {
    
    const product = await createProduct.execute({
      name: 'dummy',
      price: 8999,
      quantity: 5,
    })
    
    const update = await updateProduct.execute({
      id: product.id,
      name: 'douglas',
      price: 500.00,
      quantity: 15,
    })
    expect(update).resolves
  })

  it('should not be able to update inexistent product', async () => {
    
    await expect(
      updateProduct.execute({
        id: 'naO_existo',
        name: 'douglas',
        price: 500.00,
        quantity: 15,
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update the product name to a existent one', async () => {
    
    const product = await createProduct.execute({
      name: 'dummy',
      price: 8999,
      quantity: 5,
    })

    await expect(
      updateProduct.execute({
        id: product.id,
        name: 'dummy',
        price: 500.00,
        quantity: 15,
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})
