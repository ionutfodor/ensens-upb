export interface ApplicationConfiguration {
  appName: string;
  appVersion: string;
  appDescription: string;
  environment: string;
  port: number;
  appGlobalPrefix: string;
  swaggerEndpoint: string;
}