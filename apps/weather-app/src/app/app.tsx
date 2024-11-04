import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { useDebounce } from '@uidotdev/usehooks';
import WeatherCard from './components/WeatherCard';
import SearchIcon from './icons/search';

export function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const { data: cityData, isLoading: isLoadingCity } = useQuery({
    enabled: !isEmpty(debouncedSearch),
    queryKey: ['currentCity', debouncedSearch],
    queryFn: async () => {
      const response = await fetch(`/api/weather/cities`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ search: debouncedSearch }),
      });
      const result = await response.json();
      return [result].flat();
    },
  });

  const { data: weatherData } = useQuery({
    enabled: !isNil(selectedCity),
    queryKey: ['currentConditions', selectedCity],
    queryFn: async () => {
      const response = await fetch(`/api/weather/current`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          lat: selectedCity.lat!,
          lon: selectedCity.lon!,
        }),
      });
      const result = response.json();
      return result;
    },
  });

  const { data: forecastData } = useQuery({
    enabled: !isNil(selectedCity),
    queryKey: ['forecast', selectedCity],
    queryFn: async () => {
      const response = await fetch(`/api/weather/forecast`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          lat: selectedCity.lat!,
          lon: selectedCity.lon!,
        }),
      });
      const result = response.json();
      return result;
    },
  });

  return (
    <div className="p-8 flex flex-col gap-16 h-full w-full">
      <div className="w-96 m-auto">
        <div className="flex flex-row gap-8">
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="w-64"
              type="text"
              placeholder="Search City or Zip Code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon />
          </label>
          {isLoadingCity && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </div>
        {!isEmpty(search) && (cityData?.length ?? 0) > 0 && (
          <ul className="menu bg-base-200 rounded-box w-80 fixed z-50">
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
      {!isNil(selectedCity) && (
        <div className="flex flex-row gap-2">
          <WeatherCard
            weatherData={weatherData}
            selectedCity={selectedCity}
            isCurrent
          />
          <div className="divider divider-horizontal divider-neutral !h-[332px]" />
          <div className="carousel rounded-box space-x-2">
            {forecastData?.list?.map((forecast) => (
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
