import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { City } from 'libs/shared-types';
import isEmpty from 'lodash/isEmpty';

export function useGetCity(search: string): UseQueryResult<City[], Error> {
  return useQuery<City[], Error>({
    enabled: !isEmpty(search),
    queryKey: ['currentCity', search],
    queryFn: async () => {
      const response = await fetch(`/api/weather/cities`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ search: search }),
      });
      const result = await response.json();
      return [result].flat();
    },
  });
}
