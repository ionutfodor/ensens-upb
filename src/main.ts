import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ApplicationConfiguration } from "./configuration/model/application-configuration";
import { ConfigKey } from "./configuration/model/config-keys";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const applicationConfig =
    configService.get<ApplicationConfiguration>(ConfigKey.App);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(applicationConfig.appName)
    .setDescription(applicationConfig.appDescription)
    .setVersion(applicationConfig.appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(applicationConfig.swaggerEndpoint, app, document);

  app.setGlobalPrefix(applicationConfig.appGlobalPrefix);
  await app.listen(applicationConfig.port);
}
bootstrap();
