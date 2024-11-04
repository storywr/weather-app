import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import head from 'lodash/head';

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  async getCoordinates(search): Promise<{ data: any }> {
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    const isZip = zipRegex.test(search);

    let cityData;
    if (isZip) {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${search},US&limit=5&appid=${this.configService.get<string>(
          'VITE_WEATHER_KEY'
        )}`
      );
      cityData = await response.json();
    } else {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search},US&limit=5&appid=${this.configService.get<string>(
          'VITE_WEATHER_KEY'
        )}`
      );
      const cities = await response.json();
      cityData = cities;
    }

    return cityData;
  }

  async getWeather(lat: string, lon: string): Promise<{ data: any }> {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.configService.get<string>(
        'VITE_WEATHER_KEY'
      )}`
    );
    const weatherData = await weather.json();

    return weatherData;
  }
}
