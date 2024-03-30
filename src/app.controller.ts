import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
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
}
