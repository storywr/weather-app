import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  async getData(search): Promise<{ data: any }> {
    const cityResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${search},US&appid=${this.configService.get<string>(
        'VITE_WEATHER_KEY'
      )}`
    );
    const cityData = await cityResponse.json();
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        cityData?.lat
      }&lon=${cityData?.lon}&appid=${this.configService.get<string>(
        'VITE_WEATHER_KEY'
      )}`
    );
    const weatherData = await weather.json();
    return weatherData;
  }
}
