import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EnvironmentVariables } from '../common/interfaces/environment-variables.interface';

export const mailerProvider = {
  useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
    if (configService.get('NODE_ENV') === 'development') {
      const testAccount = await nodemailer.createTestAccount();
      return {
        transport: {
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            type: 'LOGIN',
            user: testAccount.user,
            pass: testAccount.pass,
          },
        },
        preview: true,
      };
    } else {
      return {
        transport: {
          host: configService.get('SMTP_HOST'),
          port: 587,
          secure: false,
          auth: {
            type: 'LOGIN',
            user: configService.get('SMTP_USER'),
            pass: configService.get('SMTP_PASSWORD'),
          },
        },
      };
    }
  },
  inject: [ConfigService],
} as MailerAsyncOptions;
