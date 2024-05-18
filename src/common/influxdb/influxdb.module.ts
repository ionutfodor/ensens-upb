import { Module } from '@nestjs/common';
import { InfluxdbService } from './service/influxdb.service';

@Module({
  providers: [InfluxdbService]
})
export class InfluxdbModule {}
