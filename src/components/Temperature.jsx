import React, { useState, useEffect } from "react";
import {
  UilTemperature,
  UilWind,
  UilSunset,
  UilTear,
  UilSun,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";
import getFormattedWeatherData from "../services/weatherService"; // Import your API function

function Temperature() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data when the component mounts
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({
          q: "Polokwane", // Replace this with dynamic location data or user input
          units: "metric", // Optional: "metric" for Celsius, "imperial" for Fahrenheit
        });
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data.");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a better loader
  }

  if (error) {
    return <div>{error}</div>; // Handle error case
  }

  if (!weather) {
    return <div>No weather data available</div>; // Handle empty data case
  }

  // Destructure weather data to use in your UI
  const {
    temp,
    feels_like,
    humidity,
    wind_speed: windSpeed,
    icon,
    details,
    sunrise,
    sunset,
    temp_max: high,
    temp_min: low,
  } = weather;

  // Display the weather details dynamically
  const weatherDetails = [
    {
      id: 1,
      Icon: UilTemperature,
      title: "Real Feel",
      value: `${feels_like}°`,
    },
    {
      id: 2,
      Icon: UilTear,
      title: "Humidity",
      value: `${humidity}%`,
    },
    {
      id: 3,
      Icon: UilWind,
      title: "Wind",
      value: `${windSpeed} km/h`,
    },
  ];

  const forecastDetails = [
    {
      id: 1,
      Icon: UilSun,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: UilSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: UilArrowUp,
      title: "High",
      value: `${high}°`,
    },
    {
      id: 4,
      Icon: UilArrowDown,
      title: "Low",
      value: `${low}°`,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl">
        <p>{details}</p>
      </div>

      <div className="flex flex-rox items-center justify-between py-3">
        <img src={icon} alt="weather icon" className="w-20" />
        <p className="text-5xl">{`${temp}°`}</p>
        <div className="flex flex-col space-y-3 items-start">
          {weatherDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm items-center justify-center"
            >
              <Icon size={18} className="mr-1" />
              {`${title}:`} <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        <div className="flex flex-row items-center">
          {forecastDetails.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex flex-row items-center">
              <Icon size={30} />
              <p className="font-light ml-1">
                {`${title}:`} <span className="font-medium ml-1">{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Temperature;
