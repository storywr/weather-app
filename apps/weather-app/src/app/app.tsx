import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import isNil from 'lodash/isNil';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import { useDebounce } from '@uidotdev/usehooks';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const getDateTime = (offset: any) => {
  const time = dayjs
    .utc()
    .utcOffset(offset / 60)
    .format('ddd MMM D, h:mm A');
  return time;
};

export function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const {
    data: cityData,
    isLoading: isLoadingCity,
    isSuccess,
  } = useQuery({
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

  const { data: weatherData, isLoading: isLoadingWeather } = useQuery({
    enabled: !isNil(selectedCity),
    queryKey: ['currentConditions', selectedCity],
    queryFn: async () => {
      const response = await fetch(`/api/weather/conditions`, {
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

  console.log({ weatherData });

  return (
    <div className="p-8 flex flex-col gap-8 h-full w-full">
      <div className="w-80 m-auto">
        <label className="input input-bordered flex items-center gap-2">
          <input
            className="grow"
            type="text"
            placeholder="Search City or Zip Code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
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
      <div>
        {!isNil(selectedCity) && (
          <div className="card bg-base-300 min-w-80 w-fit shadow-xl">
            <div className="card-body">
              <h2 className="card-title flex flex-col justify-start items-start">
                {selectedCity.name}, {selectedCity.state ?? selectedCity.zip}
                <div className="text-sm font-normal">
                  {getDateTime(weatherData?.timezone ?? 0)}
                </div>
              </h2>
              <div className="divider my-2" />
              <div>
                <div className="stat-title">
                  {startCase(toLower(head(weatherData?.weather)?.description))}
                </div>
                <div className="stat-value flex flex-row gap-1">
                  {Math.round(weatherData?.main?.temp)}&#8457;
                </div>
                <div className="stat-desc">
                  <div>
                    Feels Like: {Math.round(weatherData?.main?.feels_like)}
                    &#8457;
                  </div>
                </div>
              </div>
              <div className="card-actions mt-4">
                <details className="collapse collapse-arrow bg-base-200">
                  <summary className="collapse-title">Details</summary>
                  <div className="collapse-content gap-1 flex flex-col">
                    <p>
                      High: {Math.round(weatherData?.main?.temp_max)}&#8457;
                    </p>
                    <p>Low: {Math.round(weatherData?.main?.temp_min)}&#8457;</p>
                    <p>Humidity: {weatherData?.main?.humidity}%</p>
                    <p>Cloudiness: {weatherData?.clouds?.all}%</p>
                    <p>Wind: {weatherData?.wind?.speed} mph</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
