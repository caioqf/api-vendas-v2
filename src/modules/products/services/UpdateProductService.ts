import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductsRepositoriy";


interface IRequest {
  id: string,
  name: string,
  price: number,
  quantity: number,
}

@injectable()
class UpdateProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductsRepository){}

  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    
    const product = await this.productsRepository.findById(id)
    if(!product){
      throw new AppError('Product not found.')
    }

    const productExists = await this.productsRepository.findByName(name);
    if(productExists){
      throw new AppError('There is already one product with this name.')
    }

    product.name = name;
    product.price = price;
    product.quantity  = quantity;
    
    const redisCache = new RedisCache();

    await redisCache.invalidade("api-vendas-PRODUCT_LIST");

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService
