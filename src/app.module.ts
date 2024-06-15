import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "./common/common.module";
import { ConfigurationModule } from './configuration/configuration.module';
import { UserModule } from './user/user.module';
import { InfluxdbModule } from "./common/influxdb/influxdb.module";

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    CommonModule,
    UserModule,
    InfluxdbModule
  ],
  providers: [
  ]
})
export class AppModule {
}
