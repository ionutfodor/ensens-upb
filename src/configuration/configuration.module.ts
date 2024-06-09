import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { validateConfig } from "./validation/configuration-validation";
import { AppConfig } from "./namespaces/app-configs";
import { PostgresDatabaseConfig, InfluxDatabaseConfig } from "./namespaces/database-configs";
import { GoogleAuthenticationConfig } from "./namespaces/google-authentication-configs";
import { JwtConfig } from "./namespaces/jwt-configs";

const environment = process.env.NODE_ENV || 'development';
const envFilePath = `.env.${environment}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
      load: [
        AppConfig,
        InfluxDatabaseConfig,
        PostgresDatabaseConfig,
        GoogleAuthenticationConfig,
        JwtConfig
      ],
      validate: validateConfig,
      expandVariables: true
    }),
  ],
})
export class ConfigurationModule {
}
