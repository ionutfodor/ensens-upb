import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../model/configuration-properties";

export const DatabaseConfig = registerAs(
  ConfigKey.Database, () => ({
    host: process.env.INFLUXDB_HOST,
    database: process.env.INFLUXDB_DATABASE,
    port: parseInt(process.env.INFLUXDB_PORT, 10) || 8086,
    username: process.env.INFLUXDB_USERNAME,
    password: process.env.INFLUXDB_PASSWORD
  }),
);