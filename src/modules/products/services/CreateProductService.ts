import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductsRepositoriy";
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";


//A interface é uma forma de normear os tipos dentro de um objeto, nesse caso
// todos os que serão utilizados dentro da classe/função
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

//Criar a classe que faz unicamente o que está descrito em seu Service, baseado na regra de negocio. No caso; criar um produto.
@injectable()
class CreateProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductsRepository){}
  
  //Método 'execute'. O unico da classe, que vai fazer unicamente o que propõe o serviço.
  public async execute({name, price, quantity}: IRequest): Promise<Product> {
        
    //Usando a função criada no respositorio de Products pra achar o produto pelo nome
    const productExists = await this.productsRepository.findByName(name)

    if(productExists){
      throw new AppError('There is already one product with this name.');
    }
    
    //Cria o produto com os parametros passados no 'execute'
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    const redisCache = new RedisCache();
    
    await redisCache.invalidade("api-vendas-PRODUCT_LIST");

    //Salva de fato no banco de dados com 'save'
    await this.productsRepository.save(product);
    
    return product
  }
}

export default CreateProductService;
