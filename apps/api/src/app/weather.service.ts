import { City, WeatherData } from 'libs/shared-types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  async getCoordinates(search): Promise<{ data: City }> {
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

  async getWeather(lat: number, lon: number): Promise<{ data: WeatherData }> {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.configService.get<string>(
        'VITE_WEATHER_KEY'
      )}`
    );
    const weatherData = await weather.json();

    return weatherData;
  }

  async getForecast(
    lat: number,
    lon: number
  ): Promise<{ data: { list: WeatherData[] } }> {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=40&appid=${this.configService.get<string>(
        'VITE_WEATHER_KEY'
      )}`
    );
    const weatherData = await weather.json();

    return weatherData;
  }
}
