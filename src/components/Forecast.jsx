import React, { useState } from "react";

function Forecast({ weatherData, allIcons, sun }) {
  if (!weatherData || !weatherData.hourly || !weatherData.daily) return null;

  // State for temperature unit
  const [unit, setUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit

  // Function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (tempInCelsius) => (tempInCelsius * 9) / 5 + 32;

  // Function to toggle temperature unit
  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
    <div>
      <div className="unit-toggle">
        <button onClick={toggleUnit}>
          Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      <div className="hourly_forecast">
        <h3>Hourly Forecast</h3>
        <div className="hourly_container">
          {weatherData.hourly.slice(0, 6).map((hour, index) => (
            <div key={index} className="hour">
              <p>{new Date(hour.dt * 1000).getHours()}:00</p>
              <img src={allIcons[hour.weather[0].icon] || sun} alt="icon" />
              <p>
                {unit === "C"
                  ? `${Math.floor(hour.main.temp)}°C`
                  : `${Math.floor(celsiusToFahrenheit(hour.main.temp))}°F`}
              </p>
            </div>
          ))}
        </div>
      </div>

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
              <p>
                {unit === "C"
                  ? `${Math.floor(day.temp.day)}°C`
                  : `${Math.floor(celsiusToFahrenheit(day.temp.day))}°F`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
