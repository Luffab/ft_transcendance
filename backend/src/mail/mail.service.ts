import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { getMaxListeners } from 'process';
import { User } from '../typeorm/entities/User';

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_KEY)

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(mail: string, username: string, code: string) {
    return await this.mailerService.sendMail({
      to: "fttranscendance42@gmail.com",
      from: "fatilly@student.42lyon.fr", // override default from
      subject: 'Ton code de verification est la !',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: username,
		verify_code: code,
      },
    });
  }
}