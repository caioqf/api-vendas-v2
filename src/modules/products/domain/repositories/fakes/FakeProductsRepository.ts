import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';
import {v4 as uuid_v4 }  from 'uuid';
import { ICreateProduct } from '../../models/ICreateProduct';
import { IFindProducts } from '../../models/IFindProducts';
import { IProductsRepository } from '../IProductsRepository';


export default class FakeProductsRepository implements IProductsRepository{

  private products: Product[] = []


  public async create({name, price, quantity}: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = uuid_v4();
    product.name= name;
    product.price = price;
    product.quantity = quantity;

    this.products.push(product);
     
    return product;
  }

  public async remove(product: Product): Promise<void> {}

  public async save(product: Product): Promise<Product> {

    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id
    )

    this.products[findIndex] = product;

    return product;
  }


  public async findByName(name: string): Promise<Product | undefined > {
    const product = this.products.find(product => product.name === name);
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.id === id);
    return product;
  }

}
