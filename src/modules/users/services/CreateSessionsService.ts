import AppError from "@shared/errors/AppError";
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ICreateSession } from "../domain/models/ICreateSession";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IHashProvider } from "../providers/models/IHashProvider";
import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";


@injectable()
class CreateSessionService {
  constructor(
  @inject('UserRepository')
  private userRepository: IUserRepository,
  @inject('HashProvider')
  private hashProvider: IHashProvider ){}

  public async execute({email, password}: ICreateSession): Promise<IUserAuthenticated> {
    
    const user = await this.userRepository.findByEmail(email);
        
    if(!user){
      throw new AppError('Invalid credentials. Cod: 001', 401);
    }
    
    const passCheck = await this.hashProvider.compareHash(password, user.password);

    if(!passCheck){
      throw new AppError('Invalid credentials. Cod: 002', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {user, token};
  }
}

 export default CreateSessionService;
