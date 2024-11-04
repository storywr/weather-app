import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('cities')
  async getCities(@Body('search') search: string): Promise<any> {
    return this.weatherService.getCoordinates(search);
  }

  @Post('current')
  async getWeather(@Body() body: any): Promise<any> {
    const { lat, lon } = body;
    return this.weatherService.getWeather(lat, lon);
  }

  @Post('forecast')
  async getForecast(@Body() body: any): Promise<any> {
    const { lat, lon } = body;
    return this.weatherService.getForecast(lat, lon);
  }
}
