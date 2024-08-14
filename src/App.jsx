import { useEffect, useState } from "react";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeandLocation from "./components/TimeandLocation";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { data } from "autoprefixer";

const App = () => {
  const [query, setQuery] = useState({ q: "Polokwane" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    await getFormattedWeatherData("weather", { q: "Polokwane" }).then(
      (data) => {
        setWeather(data);
      }
    );
    console.log(data);
  };
  getWeather();

  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div
      className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-blur-sm h-ft shadow-gray-400 "
      style={{ backdropFilter: "blur(10px)", border: "0.1px solid white" }}
    >
      <TopButtons />
      <Inputs />
      <TimeandLocation />
      <Temperature />
      <Forecast />
      <Forecast />
    </div>
  );
};

export default App;
