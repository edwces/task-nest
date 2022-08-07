export interface EnvironmentVariables {
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  REDIS_HOST: string;

  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}
