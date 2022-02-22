import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";


interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository) {}

  public async execute({id}: IRequest): Promise<void> {

    const user = await this.userRepository.findById(id);

    if(!user){
      throw new AppError('User not found.');
    }

    await this.userRepository.remove(user);

  }
}

export default DeleteUserService;
