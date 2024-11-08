import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { CityDTO, WeatherDataDTO } from 'libs/dtos';
import isNil from 'lodash/isNil';

export function useGetCurrentConditions(
  selectedCity?: CityDTO
): UseQueryResult<WeatherDataDTO, Error> {
  return useQuery<WeatherDataDTO, Error>({
    enabled: !isNil(selectedCity),
    queryKey: ['currentConditions', selectedCity],
    queryFn: async () => {
      const response = await fetch(`/api/weather/current`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          lat: selectedCity?.lat!,
          lon: selectedCity?.lon!,
        }),
      });
      const result = await response.json();
      return result;
    },
  });
}

export function useGetForecast(
  selectedCity?: CityDTO
): UseQueryResult<WeatherDataDTO[], Error> {
  return useQuery<WeatherDataDTO[], Error>({
    enabled: !isNil(selectedCity),
    queryKey: ['forecast', selectedCity],
    queryFn: async () => {
      const response = await fetch(`/api/weather/forecast`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          lat: selectedCity?.lat!,
          lon: selectedCity?.lon!,
        }),
      });
      const result = await response.json();
      return result?.list ?? [];
    },
  });
}
