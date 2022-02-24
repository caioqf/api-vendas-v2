import 'reflect-metadata';
import DeleteProductService from '../DeleteProductService';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import AppError from '@shared/errors/AppError';


describe('DeleteProduct', () => {
  
  let fakeProductsRepository: FakeProductsRepository;
  let deleteProduct: DeleteProductService;
  let createProduct: CreateProductService;

  beforeEach(() => {
    
    fakeProductsRepository = new FakeProductsRepository();
    deleteProduct = new DeleteProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository, );

  })

  it('should delete a product', async () => {
    
    const product = await createProduct.execute({
      name: 'dummy',
      price: 8999,
      quantity: 5,
    })
    const deleted = await deleteProduct.execute({
      id: product.id
    })
    expect(deleted).resolves
  })

  it('should not be able to delete inexistent product', async () => {
    
    await expect(
       deleteProduct.execute({
        id: 'pao',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

})
