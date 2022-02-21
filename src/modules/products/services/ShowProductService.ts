import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import  {ProductRepository} from "../typeorm/repositories/ProductsRepositoriy";

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsReposotory = getCustomRepository(ProductRepository);

    const product = await productsReposotory.findOne(id);

    if(!product){
      throw new AppError('Product not found.')
    }

    return product;
  }
}

export default ShowProductService
