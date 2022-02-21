import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';


interface IRequest {
  avatar_file: string;
  user_id: string;
}

class UpdateUserAvatarService {
  public async execute({avatar_file, user_id}: IRequest): Promise<User> {
    const usersRepo = getCustomRepository(UserRepository);

    const user = await usersRepo.findById(user_id);

    if(!user){
      throw new AppError('Unauthorized', 401);
    }

    if(user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists){
        
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    
    user.avatar = avatar_file;

    await usersRepo.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
