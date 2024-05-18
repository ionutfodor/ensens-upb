import { IsDefined, IsEnum, IsNumber, IsString, MinLength } from "class-validator";

export enum ConfigKey {
  App = 'app',
  Database = 'database',
}

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

  //   DATABASE CONFIG
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
}