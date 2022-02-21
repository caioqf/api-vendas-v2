import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";
import bcryptjs from 'bcryptjs'

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateUserService {
  public async execute({user_id, name, email, password, old_password}: IRequest): Promise<User>{
  
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(user_id)
    
    if(!user){
      throw new AppError('User not found.')
    }

    const userEmailExists = await userRepository.findByEmail(email);

    if (userEmailExists && userEmailExists.id != user_id){
      throw new AppError('Email already in use.');
    }

    if(password && !old_password){
      throw new AppError('Old password is required.')
    }

    if(password && old_password){
      //testa senha antiga é compativel com a passada na request
       const testPassword = await bcryptjs.compare(old_password, user.password);

       if(!testPassword){
        throw new AppError('Invalid credentials.', 403);
      }
      //criptografa antes de salvar
      const hashed = await bcryptjs.hash(password, 10)
      user.password = hashed;
    }

    user.name = name;
    user.email = email;
    
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
