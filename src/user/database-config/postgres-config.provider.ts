import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfiguration } from "../../configuration/model/database-configuration";
import { ConfigKey } from "../../configuration/model/config-keys";

Injectable()
export class PostgresConfigProvider {

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
  }

  getConfig(): DatabaseConfiguration {
    const databaseConfiguration =
      this.configService.get<DatabaseConfiguration>(ConfigKey.PostgresDatabase);
    return {
      host: databaseConfiguration.host,
      port: databaseConfiguration.port,
      database: databaseConfiguration.database,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password};
  }
}