import Product from "@modules/products/infra/typeorm/entities/Product";
import { ICreateProduct } from "../models/ICreateProduct";
import { IDeleteProduct } from "../models/IDeleteProduct";
import { IFindProducts } from "../models/IFindProducts";

export interface IProductsRepository {
  findByName(name: string): Promise<Product | undefined>;
  save(product: Product): Promise<Product>;
  create({name, price, quantity}: ICreateProduct): Promise<Product>
  remove(id: IDeleteProduct): Promise<void>;
}
