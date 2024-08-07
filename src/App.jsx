import { React, useState } from "react";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";

const App = () => {
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-sky-600 to-cyan-500 bg-blur-sm h-ft shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />
    </div>
  );
};

export default App;
