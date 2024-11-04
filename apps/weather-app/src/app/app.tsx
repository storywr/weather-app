import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import { useDebounce } from '@uidotdev/usehooks';

export function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const { data: cityData } = useQuery({
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
    queryKey: ['currentConditions', search],
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
    <div className="p-10">
      <div className="flex flex-row gap-10 items-start">
        <div className="w-72">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Search City or Zip Code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {!isEmpty(search) && (cityData?.length ?? 0) > 0 && (
            <ul className="menu bg-base-200 rounded-box w-full">
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
            <div className="text-xl">
              {selectedCity.name}, {selectedCity.state ?? selectedCity.zip}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
