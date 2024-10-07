import React from "react";
import "./Weather.css";
import search from '../assets/images/search.png'

function Weather() {
  return (
    <div className="weather">
      <div className="search_bar">
        <input type="text" placeholder="Search" />
        <img src={search} alt="search icon" />
      </div>
    </div>
  );
}

export default Weather;
