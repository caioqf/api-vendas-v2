import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductsRepositoriy";

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductsRepository){}

  public async execute({ id }: IRequest): Promise<Product | undefined> {

    const product = await this.productsRepository.findById(id);

    if(!product){
      throw new AppError('Product not found.')
    }

    return product;
  }
}

export default ShowProductService
