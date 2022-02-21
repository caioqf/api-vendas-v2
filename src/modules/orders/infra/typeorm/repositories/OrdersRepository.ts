import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Product from "@modules/products/infra/typeorm/entities/Product";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";

interface IProductData {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProductData[];
}

@EntityRepository(Order)
class OdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined > {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({customer, products}: IRequest): Promise<Order> {
    
    const order = this.create({
      customer,
      order_products: products,  
    })
    
    await this.save(order)

    return order
  }
}

export default OdersRepository
