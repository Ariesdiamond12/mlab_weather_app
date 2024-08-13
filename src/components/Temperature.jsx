import React from "react";
import {
  UilTemperature,
  UilWind,
  UilSunset,
  UilTear,
  UilSun,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";

function Temperature() {
  const weatherDetails = [
    {
      id: 1,
      Icon: UilTemperature,
      title: "Real Feel",
      value: "22°",
    },
    {
      id: 2,
      Icon: UilTear,
      title: "Humidity",
      value: "34%",
    },
    {
      id: 3,
      Icon: UilWind,
      title: "Wind",
      value: "11 km/h",
    },
  ];

  const forecastDetails = [
    {
      id: 1,
      Icon: UilSun,
      title: "Sunrise",
      value: "06:30 AM",
    },
    {
      id: 2,
      Icon: UilSunset,
      title: "Sunset",
      value: "17:00 PM",
    },
    {
      id: 3,
      Icon: UilArrowUp,
      title: "High",
      value: "37°",
    },
    {
      id: 4,
      Icon: UilArrowDown,
      title: "Low",
      value: "7°",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl">
        <p>Rain</p>
      </div>

      <div className="flex flex-rox items-center justify-between py-3">
        <img
          src="http://openweathermap.org/img/wn/01d@2x.png"
          alt="weather icon"
          className="w-20"
        />
        <p className="text-5xl">34°</p>
        <div className="flex flex-col space-y-3 items-start">
          {weatherDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm items-center justify-center"
            >
              <Icon size={18} className="mr-1" />
              {`${title}:`} <span className="font-medium ml-1"> {value}</span>
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
                {`${title}:`} <span className="font-medium ml-1"> {value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Temperature;
