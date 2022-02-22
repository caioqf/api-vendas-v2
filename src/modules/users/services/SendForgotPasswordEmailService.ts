import AppError from "@shared/errors/AppError";
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";
import { ISendForgotPasswordEmail } from "../domain/models/ISendForgotPasswordEmail";


@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository) {}

  public async execute({email}: ISendForgotPasswordEmail): Promise<void> {
    
    const user = await this.userRepository.findByEmail(email)
    
    if(!user){
      throw new AppError('Invalid email address.');
    }
    
    const token = await this.userTokenRepository.generate(user.id)

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
          token: `${token}`,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }
}

export default SendForgotPasswordEmailService;
