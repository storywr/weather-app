import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { CityDTO } from 'libs/dtos';
import isEmpty from 'lodash/isEmpty';

export function useGetCity(search: string): UseQueryResult<CityDTO[], Error> {
  return useQuery<CityDTO[], Error>({
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
