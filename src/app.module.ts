import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { CommonModule } from "./common/common.module";
import { InfluxdbService } from "./common/influxdb/service/influxdb.service";
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    CommonModule,
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    InfluxdbService]
})
export class AppModule {
}
