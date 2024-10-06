# React + Vite

- I've created a weather app using React and Vite
- I used a weather API to fetch the current weather and 5-day forecast
- I implemented a simple UI using React components and styled components
- The getWeatherData function makes an HTTP request to the OpenWeatherMap API using a specific infoType (like current weather or forecast) and search parameters (like city name or coordinates).
- formatToLocalTime: Converts timestamps (in seconds) to human-readable local time based on the timezone offset, using the Luxon library for date manipulation
- formatCurrent: Extracts and formats important data from the current weather response (like temperature, humidity, wind speed, sunrise/sunset times, and weather details such as description and icon)
- formatForecast: Extracts and formats important data from the 5-day forecast response (like temperature)
- The getFormattedWeatherData function first fetches and formats the current weather using the formatCurrent function. Then, it uses the location data (longitude and latitude) from the current weather response to fetch and format the forecast weather using formatForecastWeather.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
