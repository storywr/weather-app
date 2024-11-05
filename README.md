# WeatherApp

✨ The App is deployed [HERE](https://weather-app-production-d91a.up.railway.app/) ✨.

## To Run Locally

Clone repo. Sign up for API key at [OpenWeather](https://openweathermap.org/api). Create an .env file in apps/api and add VITE_WEATHER_KEY = {YOUR_KEY}.

Create another .env file for the frontend in apps/weather-app. Add your localhost url: VITE_API_URL = http://localhost:3000.

Install dependencies

`npm i`

In one terminal window run the BE from the root directory

`nx serve api`

In another terminal run the FE from the root directory

`nx serve weather-app`
