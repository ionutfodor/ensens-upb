import { IsDefined, IsEnum, IsNumber, IsString, MinLength } from "class-validator";

export enum Environment {
  development = 'development',
  production = 'production',
}

export class EnvironmentVariables {
  //   APP CONFIG
  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_NAME: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_VERSION: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_DESCRIPTION: string;

  @IsDefined()
  @IsEnum(Environment)
  ENVIRONMENT: Environment;

  @IsDefined()
  @IsNumber()
  PORT: number;

  @IsDefined()
  @IsString()
  @MinLength(1)
  SWAGGER_ENDPOINT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_GLOBAL_PREFIX: string;

  //   INFLUX DATABASE CONFIG
  @IsDefined()
  @IsString()
  @MinLength(1)
  INFLUXDB_HOST: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  INFLUXDB_DATABASE: string;

  @IsDefined()
  @IsNumber()
  INFLUXDB_PORT: number;

  @IsDefined()
  @IsString()
  @MinLength(1)
  INFLUXDB_USERNAME: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  INFLUXDB_PASSWORD: string;

  //   POSTGRES DATABASE CONFIG
  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_HOST: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_DATABASE: string;

  @IsDefined()
  @IsNumber()
  POSTGRES_PORT: number;

  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_USERNAME: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  POSTGRES_PASSWORD: string;

  //   GOOGLE AUTHENTICATION CONFIG
  @IsDefined()
  @IsString()
  @MinLength(1)
  GOOGLE_CLIENT_ID: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  GOOGLE_CLIENT_SECRET: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  GOOGLE_SCOPE: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  GOOGLE_REDIRECT_URI: string;

  //    JWT CONFIG
  @IsDefined()
  @IsNumber()
  JWT_VALIDITY: number;

  @IsDefined()
  @IsString()
  @MinLength(1)
  JWT_SECRET: string;
}