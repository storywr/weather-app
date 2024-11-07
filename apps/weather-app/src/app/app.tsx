import { useState } from 'react';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { useDebounce } from '@uidotdev/usehooks';
import WeatherCard from './components/WeatherCard';
import SearchIcon from './icons/search';
import { useGetCurrentConditions, useGetForecast } from './hooks/weather';
import { useGetCity } from './hooks/city';
import { City } from 'libs/shared-types';
import ErrorAlert from './components/ErrorAlert';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Thunderstorm, WbSunny } from '@mui/icons-material';

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

  return (
    <div className="p-8 flex flex-col gap-16 h-full w-full">
      <div className="m-auto h-full w-full">
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex flex-row gap-2">
            <Thunderstorm className="!w-10 !h-10" />
            <h2 className="text-3xl font-bold">Tempestas</h2>
          </div>
          <div className="w-96">
            <label className="input input-bordered flex items-center gap-2">
              <input
                className="w-full"
                type="text"
                placeholder="Search City or Zip Code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {isLoadingCity ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <SearchIcon />
              )}
            </label>
            <div className="w-96">
              {!isEmpty(search) && (cityData?.length ?? 0) > 0 && (
                <ul className="menu bg-base-200 rounded-box fixed z-50 w-96">
                  {cityData?.map((city) => (
                    <li
                      key={city.lat}
                      onClick={() => {
                        setSelectedCity(city);
                        setSearch('');
                      }}
                    >
                      <a>
                        {city.name}, {city.state ?? city.zip}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <GitHubIcon
            className="!h-10 !w-10 cursor-pointer"
            onClick={() => {
              window.open('https://github.com/storywr/weather-app', '_blank');
            }}
          />
        </div>
        {isErrorCity && <ErrorAlert message="Error! City not found." />}
        {isErrorWeather && <ErrorAlert message="Error! Weather not found." />}
        {isErrorForecast && <ErrorAlert message="Error! Forecast not found." />}
      </div>
      {isLoading && (
        <div className="flex flex-row gap-2">
          <div className="skeleton h-[332px] min-w-[310px]" />
          <div className="divider divider-horizontal divider-neutral !h-[332px]" />
          <div className="carousel rounded-box space-x-2">
            {Array(20)
              .fill(undefined)
              .map((_skeleton, idx) => (
                <div
                  key={idx}
                  className="carousel-item skeleton h-[332px] w-[310px]"
                />
              ))}
          </div>
        </div>
      )}
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
