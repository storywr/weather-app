import { City, WeatherData } from 'libs/shared-types';
import { getDate, getDateTime } from '../utils/datetime';
import head from 'lodash/head';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';

type WeatherCardProps = {
  weatherData: WeatherData;
  selectedCity: City;
  isCurrent?: boolean;
};

const WeatherCard = ({
  weatherData,
  selectedCity,
  isCurrent = false,
}: WeatherCardProps) => {
  return (
    <div className="card bg-base-300 min-w-96 max-h-fit w-fit shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex flex-col justify-start items-start">
          {selectedCity.name}, {selectedCity.state ?? selectedCity.zip}
          <div className="text-sm font-normal text-accent">
            {isCurrent
              ? getDateTime(weatherData?.timezone ?? 0)
              : getDate(weatherData?.dt_txt ?? 0)}
          </div>
        </h2>
        <div className="divider divider-neutral my-2" />
        <div className="flex flex-row justify-between">
          <div>
            <div className="stat-title text-primary">
              {startCase(toLower(head(weatherData?.weather)?.description))}
            </div>
            <div className="stat-value text-info">
              {Math.round(weatherData?.main?.temp)}&#8457;
            </div>
            <div className="stat-desc">
              Feels Like: {Math.round(weatherData?.main?.feels_like)}
              &#8457;
            </div>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${
              head(weatherData?.weather)?.icon
            }@2x.png`}
          />
          <div className="flex flex-col">
            <div className="text-sm">
              H: {Math.round(weatherData?.main?.temp_max)}&#8457;
            </div>
            <div className="text-sm">
              L: {Math.round(weatherData?.main?.temp_min)}&#8457;
            </div>
          </div>
        </div>
        <div className="card-actions mt-4">
          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title">Details</summary>
            <div className="collapse-content text-sm gap-1 flex flex-col">
              {isCurrent && (
                <>
                  <p>
                    Sunrise: {getDateTime(weatherData?.sys?.sunrise ?? 0, true)}
                  </p>
                  <p>
                    Sunset: {getDateTime(weatherData?.sys?.sunset ?? 0, true)}
                  </p>
                </>
              )}
              <p>Humidity: {weatherData?.main?.humidity}%</p>
              <p>Cloudiness: {weatherData?.clouds?.all}%</p>
              <p>Wind: {weatherData?.wind?.speed} mph</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
