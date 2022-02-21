import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from "typeorm";
import Product from "../../../products/typeorm/entities/Product";


@Entity('user_tokens')
class UserToken {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

export default UserToken;
