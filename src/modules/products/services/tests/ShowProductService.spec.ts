import 'reflect-metadata';
import ShowProductService from '../ShowProductService';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import AppError from '@shared/errors/AppError';


describe('ShowProduct', () => {
  
  let fakeProductsRepository: FakeProductsRepository;
  let showProduct: ShowProductService;
  let createProduct: CreateProductService;

  beforeEach(() => {
    
    fakeProductsRepository = new FakeProductsRepository();
    showProduct = new ShowProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository, );

  })

  it('should show a product', async () => {
    
    const product = await createProduct.execute({
      name: 'dummy',
      price: 8999,
      quantity: 5,
    })
    
    const show = await showProduct.execute({
      id: product.id
    })
    expect(show).resolves
  })

  it('should not be able to show inexistent product', async () => {
    
    await expect(
        showProduct.execute({
          id: 'pao',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

})
