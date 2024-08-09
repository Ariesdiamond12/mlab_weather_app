import React from "react";
import {
  UilTemperature,
  UilWind,
  UilSunset,
  UilTear,
  UilSun,
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
      Icon: UilTemperature,
      title: "Humidity",
      value: "34°",
    },
    {
      id: 3,
      Icon: UilWind,
      title: "Wind",
      value: "11 km/h",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-200">
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
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real Feel: <span>35°</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Temperature;
