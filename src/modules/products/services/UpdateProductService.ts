import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoriy";


interface IRequest {
  id: string,
  name: string,
  price: number,
  quantity: number,
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsReposotory = getCustomRepository(ProductRepository)
    
    const product = await productsReposotory.findOne(id)
    if(!product){
      throw new AppError('Product not found.')
    }

    const productExists = await productsReposotory.findByName(name);
    if(productExists){
      throw new AppError('There is already one product with this name.')
    }

    product.name = name;
    product.price = price;
    product.quantity  = quantity;
    
    const redisCache = new RedisCache();

    await redisCache.invalidade("api-vendas-PRODUCT_LIST");

    await productsReposotory.save(product);

    return product;
  }
}

export default UpdateProductService
