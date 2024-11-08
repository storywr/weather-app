import { Body, Controller, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  CityCoordinatesDTO,
  CityDTO,
  SearchDTO,
  WeatherDataDTO,
} from '../../../../libs/dtos';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('cities')
  @ApiResponse({ type: CityDTO })
  async getCities(@Body() body: SearchDTO): Promise<{ data: CityDTO }> {
    const { search } = body;
    return this.weatherService.getCoordinates(search);
  }

  @Post('current')
  @ApiResponse({ type: WeatherDataDTO })
  async getWeather(
    @Body() body: CityCoordinatesDTO
  ): Promise<{ data: WeatherDataDTO }> {
    const { lat, lon } = body;
    return this.weatherService.getWeather(lat, lon);
  }

  @Post('forecast')
  @ApiResponse({ type: WeatherDataDTO })
  async getForecast(
    @Body() body: CityCoordinatesDTO
  ): Promise<{ data: { list: WeatherDataDTO[] } }> {
    const { lat, lon } = body;
    return this.weatherService.getForecast(lat, lon);
  }
}
