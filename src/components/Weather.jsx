import React, { useEffect, useRef, useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { WiRaindrop } from "react-icons/wi";
import "./Weather.css";
import search_icon from "../assets/images/search.png";
import wind from "../assets/images/wind.png";
import cloud from "../assets/images/cloud.png";
import rain from "../assets/images/rain.png";
import drizzle from "../assets/images/drizzle.png";
import snow from "../assets/images/snow.png";
import humidity from "../assets/images/humidity.png";
import sun from "../assets/images/clear.png";
import Privacy from "./Privacy";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({});
  const [isDay, setIsDay] = useState(true);

  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const getWeatherIcon = (iconCode) => allIcons[iconCode] || sun;

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8cfa3ddb97256a6a3b3d3fc19a9c8e6`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const { lat, lon } = data.coord;
        const icon = getWeatherIcon(data.weather[0].icon);

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=d8cfa3ddb97256a6a3b3d3fc19a9c8e6`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const filterDailyForecasts = (forecastList) => {
          let dailyForecasts = [];
          let currentDate = null;

          forecastList.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US");
            if (date !== currentDate) {
              dailyForecasts.push(forecast);
              currentDate = date;
            }
          });

          return dailyForecasts;
        };

        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          visibility: data.visibility / 1000, // Convert to km
          precipitation: data.rain ? `${data.rain["1h"]} mm` : "0 mm",
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
          hourly: forecastData.list.slice(0, 5), // Display first 5 hourly forecasts
          daily: filterDailyForecasts(forecastData.list),
        });
      } else {
        console.error("Error fetching weather data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Johannesburg");
  }, []);

  const handleToggleTheme = () => {
    setIsDay(!isDay);
  };

  const renderHourlyForecast = () => {
    if (!weatherData.hourly) return null;

    return (
      <div className="hourly_forecast">
        <h3>Hourly Forecast</h3>
        <div className="hourly_container">
          {weatherData.hourly.map((hour, index) => (
            <div key={index} className="hour">
              <p>{new Date(hour.dt * 1000).getHours()}:00</p>
              <img src={getWeatherIcon(hour.weather[0].icon)} alt="icon" />
              <p>{Math.floor(hour.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDailyForecast = () => {
    if (!weatherData.daily) return null;

    return (
      <div className="daily_forecast">
        <h3>Daily Forecast</h3>
        <div className="daily_container">
          {weatherData.daily.map((day, index) => (
            <div key={index} className="day">
              <p>
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <img src={getWeatherIcon(day.weather[0].icon)} alt="icon" />
              <p>{Math.floor(day.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`weather ${isDay ? "day-theme" : "night-theme"}`}>
      <div className="search_bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt="search icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      <button onClick={handleToggleTheme} className="toggle-button">
        {isDay ? "Switch to Night" : "Switch to Day"}
      </button>

      <div className="weather_data">
        <div className="weather_location">
          <div className="columns">
            <img src={weatherData.icon} alt="" className="weather_icon" />
            <p className="temperature">{weatherData.temperature}°c</p>
          </div>
          <p className="location">{weatherData.location}</p>
        </div>

        <div className="weather_info">
          <div className="col">
            <img src={humidity} alt="Humidity" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind} alt="Wind Speed" />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
          <div className="col">
            <MdOutlineVisibility />
            <div>
              <p>{weatherData.visibility} km</p>
              <span>Visibility</span>
            </div>
          </div>
          <div className="col">
            <WiRaindrop />
            <div>
              <p>{weatherData.precipitation}</p>
              <span>Precipitation</span>
            </div>
          </div>
        </div>
      </div>

      {renderHourlyForecast()}
      {renderDailyForecast()}

      <Privacy />
    </div>
  );
}

export default Weather;
