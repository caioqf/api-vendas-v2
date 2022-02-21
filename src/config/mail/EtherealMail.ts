import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';



interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {

  static async sendEmail({to, from, subject, templateData}: ISendMail ): Promise<void> {
    
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      }
    });
    
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'RealizaTI',
        address: from?.email || 'recover@realiza.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await mailTemplate.parser(templateData),
    })
    
    console.log(`Message sent: %s`, message.messageId);
    console.log(`Preview URL: %s`, nodemailer.getTestMessageUrl(message));
    
  }
}
