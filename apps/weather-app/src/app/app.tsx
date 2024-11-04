import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import isNil from 'lodash/isNil';
import head from 'lodash/head';

export function App() {
  const [search, setSearch] = useState('');
  const { data: cityData } = useQuery({
    queryKey: ['currentCity', search],
    queryFn: async () => {
      const response = await fetch(`/api/weather/cities`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ search }),
      });
      const result = response.json();
      return result;
    },
  });

  const { data: weatherData } = useQuery({
    enabled: !isNil(cityData),
    queryKey: ['currentConditions', search],
    queryFn: async () => {
      let latCoordinates;
      let lonCoordinates;
      if (Array.isArray(cityData)) {
        const { lat, lon } = head(cityData);
        latCoordinates = lat;
        lonCoordinates = lon;
      } else {
        latCoordinates = cityData.lat;
        lonCoordinates = cityData.lon;
      }
      const response = await fetch(`/api/weather/conditions`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ lat: latCoordinates, lon: lonCoordinates }),
      });
      const result = response.json();
      return result;
    },
  });

  console.log({ weatherData });

  return (
    <div className="p-10">
      <div className="w-72">
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Search City or Zip Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
