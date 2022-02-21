import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserService {
  public async execute({user_id}: IRequest): Promise<User>{
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);
    
    // console.log(user_id);

    if(!user){
      throw new AppError('User not found!')
    }

    return user
  }
}

export default ShowUserService;

