import { Controller, Get, Header, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { InfluxdbService } from "./common/influxdb/service/influxdb.service";
import { ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly influxdbService: InfluxdbService,
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

  @ApiResponse({ status: 200, description: 'A list of all measurements in the database'})
  @UseGuards(JwtAuthGuard)
  @Get('measurements')
  async getMeasurements(): Promise<string[]> {
    // TODO
    const result: any = await this.influxdbService.queryData('show measurements');
    console.log(result);
    console.log(await this.influxdbService.getMeasurements());
    return await this.influxdbService.getMeasurements();
  }
}
