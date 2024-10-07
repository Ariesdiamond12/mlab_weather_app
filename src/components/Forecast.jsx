import React from "react";

function Forecast() {
  if (!weatherData || !weatherData.hourly) return null;
  return (
    <div>
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
    </div>
  );
}

export default Forecast;
