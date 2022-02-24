import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductsRepositoriy";
import RedisCache from "@shared/cache/RedisCache";


class ListProductService {
  public async execute(): Promise<Product[]> {

    const productsReposotory = getCustomRepository(ProductRepository);
  
    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products){
      products = await productsReposotory.find()
    }

    await redisCache.save("api-vendas-PRODUCT_LIST", products);

    return products;
  }
}

export default ListProductService;
