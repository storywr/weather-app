import { CityDTO, WeatherDataDTO } from 'libs/dtos';
import WeatherCard from './WeatherCard';

type ForecastProps = {
  weatherData: WeatherDataDTO;
  selectedCity: CityDTO;
  forecastData: WeatherDataDTO[] | undefined;
};

const Forecast = ({
  weatherData,
  selectedCity,
  forecastData,
}: ForecastProps) => {
  return (
    <div className="flex flex-row gap-2">
      <WeatherCard
        weatherData={weatherData}
        selectedCity={selectedCity}
        isCurrent
      />
      <div className="divider divider-horizontal divider-neutral !h-[352px]" />
      <div className="carousel rounded-box space-x-2 pb-4">
        {forecastData?.map((forecast) => (
          <div className="carousel-item" key={forecast?.dt}>
            <WeatherCard weatherData={forecast} selectedCity={selectedCity} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
