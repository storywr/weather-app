import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function App() {
  const [search, setSearch] = useState('');
  const result = useQuery({
    enabled: search.length > 4,
    queryKey: ['currentWeatherByCity', search],
    queryFn: async () => {
      const data = await fetch(`/api/weather`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ search }),
      });
      return data;
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
