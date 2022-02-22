import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";
import { IHashProvider } from "../providers/models/IHashProvider";


interface IRequest {
  token: string;
  password: string;
}


@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({token, password}: IRequest): Promise<void> {

    const userToken = await this.userTokensRepository.findByToken(token);

    if(!userToken){
      throw new AppError('User token does not exists.')
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if(!user){
      throw new AppError('User not found.')
    }

    const tokenCreatedAt = userToken.createdAt

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
