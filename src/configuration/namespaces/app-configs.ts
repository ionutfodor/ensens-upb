import { registerAs } from "@nestjs/config";
import { ConfigKey, Environment } from "../model/configuration-properties";

export const AppConfig = registerAs(
  ConfigKey.App, () => ({
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
    appDescription: process.env.APP_DESCRIPTION,
    env: Environment[process.env.ENVIRONMENT] || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    swaggerEndpoint: process.env.SWAGGER_ENDPOINT,
  }),
);