import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaSun } from "react-icons/fa6";
import { IoIosMoon } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import "./Weather.css";
import search_icon from "../assets/images/search.png";
import cloud from "../assets/images/cloud.png";
import rain from "../assets/images/rain.png";
import drizzle from "../assets/images/drizzle.png";
import snow from "../assets/images/snow.png";
import sun from "../assets/images/clear.png";
import PrivacyModal from "./PrivacyModal";
import { determineUpcomingEvent } from "../../utils/weatherUtils";



function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({});
  const [isDay, setIsDay] = useState(true);
  const [unit, setUnit] = useState("C"); // State to track the temperature unit
  const [geolocation, setGeoLocation] = useState( )

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

  const search = async (city = "", lat, lon) => {
    try {
      let url;
      if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d8cfa3ddb97256a6a3b3d3fc19a9c8e6`;
      } else if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8cfa3ddb97256a6a3b3d3fc19a9c8e6`;
      } else {
        throw new Error("City or coordinates must be provided.");
      }
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        const { lat: latitude, lon: longitude } = data.coord;
        const icon = getWeatherIcon(data.weather[0].icon);
  
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=d8cfa3ddb97256a6a3b3d3fc19a9c8e6`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
  
        const filterDailyForecasts = (forecastList) => {
          let dailyForecasts = [];
          let currentDate = null;
  
          forecastList.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString(
              "en-US"
            );
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
  
        determineUpcomingEvent(data);
      } else {
        console.error("Error fetching weather data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };
  

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const location = await getUserLocation();
        setGeoLocation(location); // Store geolocation in state if needed
        const { latitude, longitude } = location;
        // Fetch weather data using coordinates
        search("", latitude, longitude);
      } catch (error) {
        console.error("Could not fetch user location:", error);
        // Fallback to a default city if location fails
        search("");
      }
    };
  
    fetchWeatherData();
  }, []);
  

  const handleToggleTheme = () => {
    setIsDay(!isDay);
  };

  // Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (temp) => (temp * 9) / 5 + 32;

  // Toggle between Celsius and Fahrenheit
  const handleToggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
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
              <p>
                {unit === "C"
                  ? `${Math.floor(hour.main.temp)}°C`
                  : `${Math.floor(celsiusToFahrenheit(hour.main.temp))}°F`}
              </p>
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
              <p>
                {unit === "C"
                  ? `${Math.floor(day.main.temp)}°C`
                  : `${Math.floor(celsiusToFahrenheit(day.main.temp))}°F`}
              </p>
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
        <FaLocationDot className="cursor-pointer" onClick={getUserLocation}/>
        {/* Button to toggle between day and night theme */}
        <button onClick={handleToggleTheme} className="toggle-button">
          {isDay ? <FaSun size={20} /> : <IoIosMoon size={20} />}
        </button>
      </div>

      {/* Separate button for unit toggle */}
      <div className="unit-toggle">
        <button onClick={handleToggleUnit} className="unit-toggle-button">
          {unit === "C" ? "Switch to °F" : "Switch to °C"}
        </button>
      </div>

      <div className="weather_data">
        <div className="weather_location">
          <div className="columns">
            <img src={weatherData.icon} alt="" className="weather_icon" />
            <p className="temperature">
              {unit === "C"
                ? `${weatherData.temperature}°C`
                : `${celsiusToFahrenheit(weatherData.temperature)}°F`}
            </p>
          </div>
          <p className="location">{weatherData.location}</p>
        </div>

        <div className="weather_info">
          <div className="col">
            <WiHumidity />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <TbWind />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
          <div className="col">
            <FaEye />
            <div>
              <p>{weatherData.visibility} km</p>
              <span>Visibility</span>
            </div>
          </div>
          <div className="col">
            <IoWater />
            <div>
              <p>{weatherData.precipitation}</p>
              <span>Precipitation</span>
            </div>
          </div>
        </div>
      </div>

      {renderHourlyForecast()}
      {renderDailyForecast()}

      <PrivacyModal />
    </div>
  );
}

export default Weather;
