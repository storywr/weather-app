import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function App() {
  const [search, setSearch] = useState('');
  const result = useQuery({
    enabled: search.length > 4,
    queryKey: ['currentWeatherByCity', search],
    queryFn: async () => {
      const cityResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${search},US&appid=${
          import.meta.env.VITE_WEATHER_KEY
        }`
      );
      const cityData = await cityResponse.json();
      console.log({ cityData });
      const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          cityData?.lat
        }&lon=${cityData?.lon}&appid=${import.meta.env.VITE_WEATHER_KEY}`
      );
      const weatherData = await weather.json();
      return weatherData;
    },
  });

  console.log({ result });

  return (
    <div className="p-10">
      <input
        className="input input-bordered"
        type="text"
        placeholder="Type Zip"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default App;
