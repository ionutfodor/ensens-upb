import { Injectable } from '@nestjs/common';
import { InfluxDB } from "influx";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfiguration } from "../../../configuration/model/database-configuration";

@Injectable()
export class InfluxdbService {
  private influxdb: InfluxDB;

  constructor(private configService: ConfigService) {
    const databaseConfiguration = configService.get<DatabaseConfiguration>('database');
    this.influxdb = new InfluxDB({
      host: databaseConfiguration.host,
      port: databaseConfiguration.port,
      database: databaseConfiguration.database,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password
    });
  }

  async queryData(query: string): Promise<any> {
    try {
      return await this.influxdb.query(query);
    } catch (error) {
      console.error('Error querying InfluxDB: ', error);
      throw error;
    }
  }

  async getMeasurements(): Promise<string[]> {
    try {
      return await this.influxdb.getMeasurements();
    } catch (error) {
      console.error('Error getting measurements from InfluxDB: ', error);
      throw error;
    }
  }
}
