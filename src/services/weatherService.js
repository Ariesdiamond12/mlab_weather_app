import { data } from "autoprefixer";
import { DateTime } from "luxon";

const api_key = "54f011ee0b20d588fe92b39811ae56dd";
const base_url = "https://api.openweathermap.org/data/2.5/";

export const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(base_url + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: api_key });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return {}; // Return an empty object instead of null
  }
};

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyy ' | Local time 'hh:mm a"
) =>
  DateTime.fromSeconds(secs)
    .setZone(`UTC${offset / 3600}`)
    .toFormat(format);

const formatCurrent = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const localTime = formatToLocalTime(dt, timezone);

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    localTime,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    details,
    icon: iconUrlFromCode(icon),
    dt,
    timezone,
    speed,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  //hourly
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }))
    .slice(0, 5); // Corrected slice

  //daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  if (!formattedCurrentWeather) {
    console.error("Current weather data not found");
    return {};
  }

  const { dt, lon, lat, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lon,
    lat,
    units: searchParams.units,
  }).then((d) => {
    if (!d || !d.list) {
      console.error("Forecast data not found");
      return { hourly: [], daily: [] };
    }
    return formatForecastWeather(dt, timezone, d.list);
  });

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
