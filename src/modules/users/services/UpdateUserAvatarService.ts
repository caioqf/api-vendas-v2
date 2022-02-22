import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUpdateUserAvatar } from "../domain/models/IUpdateUserAvatar";


@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository){}


  public async execute({avatar_file, user_id}: IUpdateUserAvatar): Promise<User> {

    const user = await this.userRepository.findById(user_id);

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

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
