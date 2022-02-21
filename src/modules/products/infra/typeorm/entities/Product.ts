import OrdersProducts from '../../../../orders/infra/typeorm/entities/OrdersProducts';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

//Representa as entidades existentes no banco, essas que podem e serão manipuladas pela api pra depois
//serem persistidas no DB.

@Entity('products')
class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];


  @Column()
  name: string;
  
  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Product;
