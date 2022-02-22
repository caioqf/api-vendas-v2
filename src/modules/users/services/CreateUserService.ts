import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IHashProvider } from "../providers/models/IHashProvider";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";


@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider) {}
    
  public async execute({name, email, password}: ICreateUser): Promise<IUser> {
    
    const emailExists = await this.userRepository.findByEmail(email);

    if(emailExists){
      throw new AppError('Email already in use.')
    }

    const hashed = await this.hashProvider.generateHash(password)
    
    const user = await this.userRepository.create({
      name,
      email,
      password: hashed,
    })
   
    await this.userRepository.save(user);
    
    
    return user;
  }
}

export default CreateUserService;
