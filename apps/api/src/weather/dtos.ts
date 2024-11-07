import { ApiProperty } from '@nestjs/swagger';

export class CityCoordinatesDTO {
  @ApiProperty()
  lat: number;

  @ApiProperty()
  lon: number;
}

export class SearchDTO {
  @ApiProperty()
  search: string;
}

export class CityDTO {
  @ApiProperty()
  lat: string;

  @ApiProperty()
  lon: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  zip: string;
}

export class WeatherDataDTO {
  @ApiProperty({
    type: 'object',
    properties: {
      description: { type: 'string' },
      icon: { type: 'string' },
    },
  })
  weather: {
    description: string;
    icon: string;
  }[];

  @ApiProperty()
  dt: string;

  @ApiProperty()
  dt_txt: string;

  @ApiProperty()
  timezone: number;

  @ApiProperty({
    type: 'object',
    properties: {
      temp: { type: 'number' },
      temp_max: { type: 'number' },
      temp_min: { type: 'number' },
      feels_like: { type: 'number' },
      humidity: { type: 'number' },
    },
  })
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      speed: { type: 'number' },
    },
  })
  wind: {
    speed: number;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      sunrise: { type: 'number' },
      sunset: { type: 'number' },
    },
  })
  sys: {
    sunrise: number;
    sunset: number;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      all: { type: 'number' },
    },
  })
  clouds: {
    all: number;
  };
}
