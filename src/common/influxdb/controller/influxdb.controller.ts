import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { InfluxdbService } from "../service/influxdb.service";
import { InfluxQueryBuilderService } from "../service/influx-query-builder.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { Tag } from "../model/tag";
import { Field } from "../model/field";
import { SearchDTO } from "../../dto/searchDTO";

@Controller()
export class InfluxdbController {
  constructor(
    private readonly influxdbService: InfluxdbService,
    private readonly influxQueryBuilderService: InfluxQueryBuilderService
  ) {
  }

  @ApiTags('InfluxDB interface')
  @ApiOperation({ description: 'Retrieve a list of all measurements in the InfluxDB database' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'All measurements in the database as an array of strings' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('measurements')
  async getMeasurements(): Promise<string[]> {
    return await this.influxdbService.getMeasurements();
  }

  @ApiTags('InfluxDB interface')
  @ApiOperation({ description: 'Retrieve a list of all tags in a specific measurement' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'All tags in a measurement as an array of Tag[]' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Measurement [...] does not exist in the database!' })
  @ApiParam({
    name: 'measurement',
    required: true,
    description: 'The measurement name',
    example: "lora.tts.elsys.ers-eye01"
  })
  @UseGuards(JwtAuthGuard)
  @Get(':measurement/tags')
  async getTags(@Param('measurement') measurement: string): Promise<Tag[]> {
    try {
      return await this.influxdbService.getTagsForMeasurement(measurement);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiTags('InfluxDB interface')
  @ApiOperation({ description: 'Retrieve a list of all fields in a specific measurement' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'All tags in a measurement as an array of Field[]' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Measurement [...] does not exist in the database!' })
  @ApiParam({
    name: 'measurement',
    required: true,
    description: 'The measurement name',
    example: "lora.tts.elsys.ers-eye01"
  })
  @UseGuards(JwtAuthGuard)
  @Get(':measurement/fields')
  async getFields(@Param('measurement') measurement: string): Promise<Field[]> {
    try {
      return await this.influxdbService.getFieldsForMeasurement(measurement);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiTags('InfluxDB interface')
  @ApiOperation({ description: 'Retrieve data as JSON based on search criteria in the SearchDTO sent in the body of the request' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Data requested' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Measurement not specified! | ' +
      'Measurement [...] does not exist in the database! | ' +
      'No projection exists in measurement! | ' +
      'Sorting option is present but sorting direction is not specified! | ' +
      'Pagination option is present but pagination mode is not specified! | ' +
      'Pagination without limit set is not supported!' })
  @ApiBody({
    type: SearchDTO,
    description: `JSON structure for searchDTO`
  })
  @UseGuards(JwtAuthGuard)
  @Post('data')
  @HttpCode(200)
  async getData(@Body(new ValidationPipe({ transform: true })) searchDTO: SearchDTO): Promise<string> {
    try {
      const query = await this.influxQueryBuilderService.buildQuery(searchDTO);
      return await this.influxdbService.queryData(query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}