import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ApplicationConfiguration } from "./configuration/model/application-configuration";
import { ConfigKey } from "./configuration/model/config-keys";
import { SearchDTO } from "./common/dto/searchDTO";
import { SorterDTO } from "./common/dto/sorterDTO";
import { PaginationDTO } from "./common/dto/paginationDTO";
import { FilterDTO } from "./common/dto/filterDTO";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const applicationConfig =
    configService.get<ApplicationConfiguration>(ConfigKey.App);

  app.setGlobalPrefix(applicationConfig.appGlobalPrefix);
  const swaggerConfig = new DocumentBuilder()
    .setTitle(applicationConfig.appName)
    .setDescription(applicationConfig.appDescription)
    .setVersion(applicationConfig.appVersion)
    .addServer(`http://localhost:${applicationConfig.port}/`, 'Local environment')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [SearchDTO, SorterDTO, PaginationDTO, FilterDTO]
  });
  SwaggerModule.setup(applicationConfig.swaggerEndpoint, app, document);

  await app.listen(applicationConfig.port);
}
bootstrap();
