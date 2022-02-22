import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IHashProvider } from "../providers/models/IHashProvider";
import { IUpdateUser } from "../domain/models/IUpdateUser";
import { IUser } from "../domain/models/IUser";


@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider) {}
  
  
  public async execute({user_id, name, email, password, old_password}: IUpdateUser): Promise<IUser>{

    const user = await this.userRepository.findById(user_id)
    
    if(!user){
      throw new AppError('User not found.')
    }

    const userEmailExists = await this.userRepository.findByEmail(email);

    if (userEmailExists && userEmailExists.id != user_id){
      throw new AppError('Email already in use.');
    }

    if(password && !old_password){
      throw new AppError('Old password is required.')
    }

    if(password && old_password){
      //testa senha antiga é compativel com a passada na request
       const testPassword = this.hashProvider.compareHash(old_password, user.password);

       if(!testPassword){
        throw new AppError('Invalid credentials.', 403);
      }

      //criptografa antes de salvar através da dependência injetada
      const hashed = await this.hashProvider.generateHash(password)
      user.password = hashed;
    }

    user.name = name;
    user.email = email;
    
    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
