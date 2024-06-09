import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../model/config-keys";

export const InfluxDatabaseConfig = registerAs(
  ConfigKey.InfluxDatabase, () => ({
    host: process.env.INFLUXDB_HOST,
    database: process.env.INFLUXDB_DATABASE,
    port: parseInt(process.env.INFLUXDB_PORT, 10) || 8086,
    username: process.env.INFLUXDB_USERNAME,
    password: process.env.INFLUXDB_PASSWORD
  }),
);

export const PostgresDatabaseConfig = registerAs(
  ConfigKey.PostgresDatabase, () => ({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD
  }),
);