import { Module } from "@nestjs/common";
import { InfluxdbModule } from './influxdb/influxdb.module';

@Module({
  imports: [
    InfluxdbModule
  ]
})
export class CommonModule {}
