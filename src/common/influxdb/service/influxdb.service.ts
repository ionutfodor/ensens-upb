import { Injectable } from '@nestjs/common';
import { InfluxDB } from "influx";
import { InfluxdbConfigProvider } from "../database-config/influxdb-config.provider";

@Injectable()
export class InfluxdbService {
  private influxdb: InfluxDB;

  constructor(private influxConfigProvider: InfluxdbConfigProvider) {
    this.influxdb = new InfluxDB({...this.influxConfigProvider.getConfig()});
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
