import React from "react";
import { UilSearch, UilMap } from "@iconscout/react-unicons";

function Inputs() {
  return (
    <div className="flex flex-row justify-center my-6 ">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          className="text-l font-light p-2 w-full rounded-lg focus:outline-none capitalize placeholder:lowercase"
          placeholder="Search by city..."
        />
        <UilSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
        <UilMap
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl font-medium transition:ease-out hover:scale-125"
        >
          C°
        </button>
        <p className="text-xl font-medium mx-1">|</p>
        <button
          name="imperial"
          className="text-xl font-medium transition:ease-out hover:scale-125"
        >
          F°
        </button>
      </div>
    </div>
  );
}

export default Inputs;
