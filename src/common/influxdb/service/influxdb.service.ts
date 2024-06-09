import { Injectable } from '@nestjs/common';
import { InfluxDB } from "influx";
import { InfluxdbConfigProvider } from "../database-config/influxdb-config.provider";
import { Tag } from "../model/tag";
import { Field } from "../model/field";
import { SearchDTOUtil } from "../util/searchDTO-util";

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
    return await this.influxdb.getMeasurements();
  }

  async getTagsForMeasurement(measurement: string): Promise<Tag[]> {
    const measurements = await this.getMeasurements();
    SearchDTOUtil.validateMeasurement(measurement, measurements);
    return await this.getTagKeys(measurement);
  }

  async getFieldsForMeasurement(measurement: string): Promise<Field[]> {
    const measurements = await this.getMeasurements();
    SearchDTOUtil.validateMeasurement(measurement, measurements);
    return await this.getFieldKeys(measurement);
  }

  async getTagKeys(measurement: string): Promise<Tag[]> {
    const query = `SHOW TAG KEYS FROM "${measurement}"`;
    const response = await this.queryData(query);
    return response.map(({tagKey}) => new Tag(tagKey));
  }

  async getFieldKeys(measurement: string): Promise<Field[]> {
    const query = `SHOW FIELD KEYS FROM "${measurement}"`;
    const response = await this.queryData(query);
    return response.map(({fieldKey, fieldType}) => new Field(fieldKey, fieldType));
  }
}
