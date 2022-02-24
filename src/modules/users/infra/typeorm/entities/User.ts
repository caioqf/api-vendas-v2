import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer';


@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @Column('varchar')
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({name: 'avatar_url'})
  getAvatarUrl(): string | null {
      if (!this.avatar){
          return null
      }
      return `${process.env.APP_API_URL}/files/${this.avatar}`
  }

}

export default User;
