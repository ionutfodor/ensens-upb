import { BadRequestException, Body, Controller, Get, HttpCode, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { InfluxdbService } from "./common/influxdb/service/influxdb.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { InfluxQueryBuilderService } from "./common/influxdb/service/influx-query-builder.service";
import { SearchDTO } from "./common/dto/searchDTO";

@Controller()
export class AppController {

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
      // return await this.influxQueryBuilderService.buildQuery(searchDTO);
      const query = await this.influxQueryBuilderService.buildQuery(searchDTO);
      return await this.influxdbService.queryData(query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
