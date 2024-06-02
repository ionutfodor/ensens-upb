import { BadRequestException, Body, Controller, Get, Header, UseGuards, ValidationPipe } from "@nestjs/common";
import { AppService } from "./app.service";
import { InfluxdbService } from "./common/influxdb/service/influxdb.service";
import { ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { InfluxQueryBuilderService } from "./common/influxdb/service/influx-query-builder.service";
import { SearchDTO } from "./common/dto/searchDTO";

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly influxdbService: InfluxdbService,
    private readonly influxQueryBuilderService: InfluxQueryBuilderService
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('object')
  getObject(): { name: string } {
    return { name: 'Popa Costel' };
  }

  @Get('object-as-text')
  @Header('Content-Type', 'text/html')
  getObjectAsText(): { name: string } {
    return { name: 'Popa Costel' };
  }

  @ApiResponse({ status: 200, description: 'A list of all measurements in the database' })
  @UseGuards(JwtAuthGuard)
  @Get('measurements')
  async getMeasurements(): Promise<string[]> {
    // TODO
    const result: any = await this.influxdbService.queryData('show measurements');
    console.log(result);
    console.log(await this.influxdbService.getMeasurements());
    return await this.influxdbService.getMeasurements();
  }


  @ApiResponse({ status: 200, description: 'Data requested' })
  @UseGuards(JwtAuthGuard)
  @Get('data')
  async getData(@Body('searchDTO', new ValidationPipe({ transform: true })) searchDTO: SearchDTO): Promise<string> {
    try {
      // return await this.influxQueryBuilderService.buildQuery(searchDTO);
      const query = await this.influxQueryBuilderService.buildQuery(searchDTO);
      return await this.influxdbService.queryData(query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
