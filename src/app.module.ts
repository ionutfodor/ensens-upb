import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { CommonModule } from "./common/common.module";
import { ConfigurationModule } from './configuration/configuration.module';
import { UserModule } from './user/user.module';
import { InfluxdbModule } from "./common/influxdb/influxdb.module";

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    ProductModule,
    CommonModule,
    UserModule,
    InfluxdbModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ]
})
export class AppModule {
}
