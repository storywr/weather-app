import isEmpty from 'lodash/isEmpty';
import SearchIcon from '../icons/search';
import ErrorAlert from './ErrorAlert';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Thunderstorm } from '@mui/icons-material';
import { City } from 'libs/shared-types';

type NavProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectCity: (value: City) => void;
  isLoadingCity: boolean;
  cityData: City[] | undefined;
  isErrorCity: boolean;
  isErrorForecast: boolean;
  isErrorWeather: boolean;
};

const Nav = ({
  search,
  handleSearch,
  handleSelectCity,
  isLoadingCity,
  cityData,
  isErrorCity,
  isErrorForecast,
  isErrorWeather,
}: NavProps) => {
  return (
    <div className="m-auto h-full w-full">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row gap-2">
          <Thunderstorm className="!w-10 !h-10" />
          <h2 className="text-3xl font-bold">Tempestas</h2>
        </div>
        <div className="w-96">
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="w-full"
              type="text"
              placeholder="Search City or Zip Code"
              value={search}
              onChange={handleSearch}
            />
            {isLoadingCity ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <SearchIcon />
            )}
          </label>
          <div className="w-96">
            {!isEmpty(search) && (cityData?.length ?? 0) > 0 && (
              <ul className="menu bg-base-200 rounded-box fixed z-50 w-96">
                {cityData?.map((city) => (
                  <li
                    key={city.lat}
                    onClick={() => {
                      handleSelectCity(city);
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
        </div>
        <GitHubIcon
          className="!h-10 !w-10 cursor-pointer"
          onClick={() => {
            window.open('https://github.com/storywr/weather-app', '_blank');
          }}
        />
      </div>
      {isErrorCity && <ErrorAlert message="Error! City not found." />}
      {isErrorWeather && <ErrorAlert message="Error! Weather not found." />}
      {isErrorForecast && <ErrorAlert message="Error! Forecast not found." />}
    </div>
  );
};

export default Nav;
