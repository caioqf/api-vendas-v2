import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';


interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({email}: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('Invalid email address.');
    }
    
    // console.log(user);
    
    const { token } = await userTokenRepository.generate(user.id);

    const template = path.resolve(
      __dirname,
       '..',
        'views',
         'forgot_password.hbs');
    
    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[PASSWORD RECOVERY]',
      templateData: {
        file: template,
        variables: {
          name: user.name,
          token: token, 
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }
}

export default SendForgotPasswordEmailService;
