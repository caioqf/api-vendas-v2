import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import User from '../entities/User';


export default class UserRepository implements IUserRepository {

    private ormRepository: Repository<User>;

    constructor(){
        this.ormRepository = getRepository(User);
    }

    public async remove(user: User): Promise<void> {
        await this.ormRepository.remove(user);
    }

    public async create({name, email, password}: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        })
        await this.ormRepository.save(user)
        return user;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                email,
            }
        });
        return user;
    }

  public async findByName(name: string): Promise<User | undefined > {
      const user = await this.ormRepository.findOne({
          where: {
              name,
          }
      });
      return user;
  }

  public async findById(id: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne({
          where: {
              id,
          }
      });
      return user;
  }

  public async findAll(): Promise<User[] | undefined> {

    const users = await this.ormRepository.find()
    
    return users;
  } 
}
