import { useState } from 'react';
import isNil from 'lodash/isNil';
import { useDebounce } from '@uidotdev/usehooks';
import WeatherCard from './components/WeatherCard';
import { useGetCurrentConditions, useGetForecast } from './hooks/weather';
import { useGetCity } from './hooks/city';
import { City } from 'libs/shared-types';
import LoadingCarousel from './components/LoadingCarousel';
import Nav from './components/Nav';

export function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const {
    data: cityData,
    isLoading: isLoadingCity,
    isError: isErrorCity,
  } = useGetCity(debouncedSearch);
  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    isError: isErrorWeather,
  } = useGetCurrentConditions(selectedCity);
  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    isError: isErrorForecast,
  } = useGetForecast(selectedCity);

  const isLoading = isLoadingWeather || isLoadingForecast;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setSearch('');
  };

  return (
    <div className="p-8 flex flex-col gap-16 h-full w-full">
      <Nav
        search={search}
        handleSearch={handleSearch}
        handleSelectCity={handleSelectCity}
        isLoadingCity={isLoadingCity}
        cityData={cityData}
        isErrorCity={isErrorCity}
        isErrorForecast={isErrorForecast}
        isErrorWeather={isErrorWeather}
      />
      {isLoading && <LoadingCarousel />}
      {!isNil(selectedCity) && !isNil(weatherData) && !isLoading && (
        <div className="flex flex-row gap-2">
          <WeatherCard
            weatherData={weatherData}
            selectedCity={selectedCity}
            isCurrent
          />
          <div className="divider divider-horizontal divider-neutral !h-[332px]" />
          <div className="carousel rounded-box space-x-2">
            {forecastData?.map((forecast) => (
              <div className="carousel-item" key={forecast?.dt}>
                <WeatherCard
                  weatherData={forecast}
                  selectedCity={selectedCity}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
