import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/images/search.png";
import wind from "../assets/images/wind.png";
import cloud from "../assets/images/cloud.png";
import rain from "../assets/images/rain.png";
import drizzle from "../assets/images/drizzle.png";
import snow from "../assets/images/snow.png";
import humidity from "../assets/images/humidity.png";
import sun from "../assets/images/clear.png";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(true);

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

  //whenever we call the search function it we will provide one city name and it will be provided in the url
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8cfa3ddb97256a6a3b3d3fc19a9c8e6`;
      //In the fetch we will provide the  url and the method we want to use
      //Then convert the response using json method
      const response = await fetch(url);
      const data = await response.json(); // in the data we will get the weather data from the  api

      if (response.ok) {
        const { lat, lon } = data.coord;
        const icon = allIcons[data.weather[0].icon] || sun;

        const forecastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=d8cfa3ddb97256a6a3b3d3fc19a9c8e6`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
          hourly: forecastData.hourly, // Store hourly forecast
          daily: forecastData.daily, // Store daily forecast
        });
      } else {
        console.error("Error fetching weather data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    //we will call the search function with the city name from the url
    search("Johannesburg");
  }, []);

  const renderHourlyForecast = () => {
    if (!weatherData.hourly) return null;

    return (
      <div className="hourly_forecast">
        <h3>Hourly Forecast</h3>
        <div className="hourly_container">
          {weatherData.hourly.slice(0, 6).map((hour, index) => (
            <div key={index} className="hour">
              <p>{new Date(hour.dt * 1000).getHours()}:00</p>
              <img src={allIcons[hour.weather[0].icon] || sun} alt="icon" />
              <p>{Math.floor(hour.temp)}°C</p>
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
          {weatherData.daily.slice(0, 5).map((day, index) => (
            <div key={index} className="day">
              <p>
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <img src={allIcons[day.weather[0].icon] || sun} alt="icon" />
              <p>{Math.floor(day.temp.day)}°C</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    // First Column
    <div className="weather">
      <div className="search_bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt="search icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      <img src={weatherData.icon} alt="" className="weather_icon" />
      <p className="temperature">{weatherData.temperature}°c</p>
      <p className="location">{weatherData.location}</p>

      {/* Second Column */}
      <div className="weather_data">
        <div className="col">
          <img src={humidity} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" />
          <div>
            <p>{weatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>

      {/* Hourly and Daily Forecast */}
      {renderHourlyForecast()}
      {renderDailyForecast()}
    </div>
  );
}

export default Weather;
