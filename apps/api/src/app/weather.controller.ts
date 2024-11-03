import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async getData(@Body('search') search: string): Promise<any> {
    return this.weatherService.getData(search);
  }
}
