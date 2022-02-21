import {CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import OrdersProducts from './OrdersProducts';
import Customer from '../../../customers/typeorm/entities/Customer';

//Representa as entidades existentes no banco, essas que podem e serão manipuladas pela api pra depois
//serem persistidas no DB.

@Entity('orders')
class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

export default Order;
