import User from '@modules/users/infra/typeorm/entities/User';
import {v4 as uuid_v4 }  from 'uuid';
import { ICreateUser } from '../../models/ICreateUser';
import { IUserRepository } from '../IUserRepository';


export default class FakeUserRepository implements IUserRepository{

  private users: User[] = []

  public async findAll(): Promise< User[] | undefined> {
    return undefined;
  }

  public async create({name, email, password}: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuid_v4();
    user.email= email;
    user.name = name;
    user.password = password;
    
    this.users.push(user);
     
    return user;
  }

  public async remove(user: User): Promise<void> {}

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      findUser => findUser.id === user.id
    )

    this.users[findIndex] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async findByName(name: string): Promise<User | undefined > {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

}
