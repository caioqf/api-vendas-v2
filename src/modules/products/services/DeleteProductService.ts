import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import ProductRepository from "../infra/typeorm/repositories/ProductsRepositoriy"
import RedisCache from '@shared/cache/RedisCache';


interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({id}: IRequest): Promise<void>{
    const productsRepository = getCustomRepository(ProductRepository);
    
    const product = await productsRepository.findOne(id);
    if(!product){
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();
    
    await redisCache.invalidade("api-vendas-PRODUCT_LIST");

    await productsRepository.remove(product);

  }
}

export default DeleteProductService;
