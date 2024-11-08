import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CityDTO, WeatherDataDTO } from '../../../../libs/dtos';

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  private appId = this.configService.get<string>('VITE_WEATHER_KEY');

  private fetchData = async (urlSuffix: string) => {
    const baseURL = 'https://api.openweathermap.org/';
    const response = await fetch(`${baseURL}${urlSuffix}`);
    const data = response.json();
    return data;
  };

  async getCoordinates(search): Promise<{ data: CityDTO }> {
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    const isZip = zipRegex.test(search);
    const cityData = await this.fetchData(
      isZip
        ? `geo/1.0/zip?zip=${search},US&limit=5&appid=${this.appId}`
        : `geo/1.0/direct?q=${search},US&limit=5&appid=${this.appId}`
    );
    return cityData;
  }

  async getWeather(
    lat: number,
    lon: number
  ): Promise<{ data: WeatherDataDTO }> {
    const data = await this.fetchData(
      `data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.appId}`
    );
    return data;
  }

  async getForecast(
    lat: number,
    lon: number
  ): Promise<{ data: { list: WeatherDataDTO[] } }> {
    const data = await this.fetchData(
      `data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=40&appid=${this.appId}`
    );
    return data;
  }
}
