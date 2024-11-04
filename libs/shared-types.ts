export type City = {
  lat: string;
  lon: string;
  name: string;
  state: string;
  zip: string;
};

export type WeatherData = {
  weather: {
    description: string;
    icon: string;
  }[];
  dt: string;
  dt_txt: string;
  timezone: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  clouds: {
    all: number;
  };
};
