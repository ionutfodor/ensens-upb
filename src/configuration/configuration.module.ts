import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { validateConfig } from "./validation/configuration-validation";
import { AppConfig } from "./namespaces/app-configs";
import { DatabaseConfig } from "./namespaces/database-configs";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.development',
    load: [AppConfig, DatabaseConfig],
    validate: validateConfig,
    isGlobal: true,
    expandVariables: true,
  })]
})
export class ConfigurationModule {}
