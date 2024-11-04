import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { City, WeatherData } from 'libs/shared-types';

type CityCoordinates = {
  lat: number;
  lon: number;
};

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('cities')
  async getCities(@Body('search') search: string): Promise<{ data: City }> {
    return this.weatherService.getCoordinates(search);
  }

  @Post('current')
  async getWeather(
    @Body() body: CityCoordinates
  ): Promise<{ data: WeatherData }> {
    const { lat, lon } = body;
    return this.weatherService.getWeather(lat, lon);
  }

  @Post('forecast')
  async getForecast(
    @Body() body: CityCoordinates
  ): Promise<{ data: { list: WeatherData[] } }> {
    const { lat, lon } = body;
    return this.weatherService.getForecast(lat, lon);
  }
}
