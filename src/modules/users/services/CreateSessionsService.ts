import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import bcryptjs from 'bcryptjs'
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({email, password}: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    
    // console.log(authConfig.jwt.secret);
    

    const user = await userRepository.findByEmail(email);

    if(!user){
      throw new AppError('Invalid credentials. Cod: 001', 401);
    }
    
    const passCheck = await bcryptjs.compare(password, user.password);

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
