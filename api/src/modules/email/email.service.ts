import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendResetCode(code: string, to: string) {
    return this.mailerService.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to,
      subject: 'Password Reset Code',
      text: code,
    });
  }
}
