import { DateTime } from "luxon";

const api_key = "54f011ee0b20d588fe92b39811ae56dd";
const base_url = "https://api.openweathermap.org/data/2.5/";

export const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(base_url + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: api_key });

  return fetch(url).then((res) => res.json());
};

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyy ' | Local time 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
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
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    localTime,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  return formattedCurrentWeather;
};

export default getFormattedWeatherData;
