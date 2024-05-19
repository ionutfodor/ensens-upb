import { Module } from '@nestjs/common';
import { InfluxdbService } from './service/influxdb.service';
import { InfluxdbConfigProvider } from "./database-config/influxdb-config.provider";

@Module({
  providers: [
    InfluxdbConfigProvider,
    InfluxdbService
  ],
  exports: [InfluxdbService]
})
export class InfluxdbModule {}
