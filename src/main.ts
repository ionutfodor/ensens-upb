import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ApplicationConfiguration } from "./configuration/model/application-configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const applicationConfig = configService.get<ApplicationConfiguration>('app');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(applicationConfig.appName)
    .setDescription(applicationConfig.appDescription)
    .setVersion(applicationConfig.appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(applicationConfig.swaggerEndpoint, app, document);

  await app.listen(applicationConfig.port);
}
bootstrap();
