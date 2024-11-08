import { useState } from 'react';
import isNil from 'lodash/isNil';
import { useDebounce } from '@uidotdev/usehooks';
import { useGetCurrentConditions, useGetForecast } from './hooks/weather';
import { useGetCity } from './hooks/city';
import { CityDTO } from 'libs/dtos';
import LoadingCarousel from './components/LoadingCarousel';
import Nav from './components/Nav';
import Forecast from './components/Forecast';

export function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedCity, setSelectedCity] = useState<CityDTO | undefined>(
    undefined
  );
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
  const isForecast = !isNil(selectedCity) && !isNil(weatherData) && !isLoading;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectCity = (city: CityDTO) => {
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
      {isForecast && (
        <Forecast
          weatherData={weatherData}
          selectedCity={selectedCity}
          forecastData={forecastData}
        />
      )}
    </div>
  );
}

export default App;
