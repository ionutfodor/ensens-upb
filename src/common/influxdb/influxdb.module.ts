import { Module } from '@nestjs/common';
import { InfluxdbService } from './service/influxdb.service';
import { InfluxdbConfigProvider } from "./database-config/influxdb-config.provider";
import { InfluxQueryBuilderService } from "./service/influx-query-builder.service";
import { InfluxdbController } from "./controller/influxdb.controller";

@Module({
  providers: [
    InfluxdbConfigProvider,
    InfluxdbService,
    InfluxQueryBuilderService
  ],
  exports: [
    InfluxdbService,
    InfluxQueryBuilderService
  ],
  controllers: [
    InfluxdbController
  ]
})
export class InfluxdbModule {}
