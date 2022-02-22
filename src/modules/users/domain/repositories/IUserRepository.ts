import User from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";
import { IDeleteUser } from "../models/IDeleteUser";


export interface IUserRepository {
  findByName(name: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[] | undefined>;
  create(data: ICreateUser): Promise<User>;
  remove(id: IDeleteUser): Promise<void>;
  save(customer: User): Promise<User>;

}
