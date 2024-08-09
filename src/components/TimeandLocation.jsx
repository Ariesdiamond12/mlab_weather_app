import React from "react";

function TimeandLocation() {
  const date = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = weekday[date.getDay()];
  const day = date.getDate();
  const name = month[date.getMonth()];
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight">
          {dayOfWeek}, {day} {name} {year} | Local time {time}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-2xl font-medium">Polokwane, PLK</p>
      </div>
    </div>
  );
}

export default TimeandLocation;
