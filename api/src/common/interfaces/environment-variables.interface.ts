export interface EnvironmentVariables {
  NODE_ENV: string;

  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  REDIS_HOST: string;

  SMTP_HOST: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;

  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}
