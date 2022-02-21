import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoriy";
import RedisCache from '@shared/cache/RedisCache';


//A interface é uma forma de normear os tipos dentro de um objeto, nesse caso
// todos os que serão utilizados dentro da classe/função
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

//Criar a classe que faz unicamente o que está descrito em seu Service, baseado na regra de negocio. No caso; criar um produto.
class CreateProductService {
  //Método 'execute'. O unico da classe, que vai fazer unicamente o que propõe o serviço.
  public async execute({name, price, quantity}: IRequest): Promise<Product> {
    


    //Declarar o repositorio (custom) que vem com todos os métodos padão (e custom) para serem usados aqui
    const productsReposotory = getCustomRepository(ProductRepository);
    
    //Usando a função criada no respositorio de Products pra achar o produto pelo nome
    const productExists = await productsReposotory.findByName(name)

    if(productExists){
      throw new AppError('There is already one product with this name.');
    }


    
    //Cria o produto com os parametros passados no 'execute'
    const product = productsReposotory.create({
      name,
      price,
      quantity,
    });

    const redisCache = new RedisCache();
    
    await redisCache.invalidade("api-vendas-PRODUCT_LIST");

    //Salva de fato no banco de dados com 'save'
    await productsReposotory.save(product);
    
    return product
  }
}

export default CreateProductService;
