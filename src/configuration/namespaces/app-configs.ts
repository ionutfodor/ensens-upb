import { registerAs } from "@nestjs/config";
import { Environment } from "../model/configuration-properties";
import { ConfigKey } from "../model/config-keys";

export const AppConfig = registerAs(
  ConfigKey.App, () => ({
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
    appDescription: process.env.APP_DESCRIPTION,
    env: Environment[process.env.ENVIRONMENT] || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    appGlobalPrefix: process.env.APP_GLOBAL_PREFIX,
    swaggerEndpoint: process.env.SWAGGER_ENDPOINT,
  }),
);