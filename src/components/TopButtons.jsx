import React from "react";

const TopButtons = () => {
  const cities = [
    {
      id: 1,
      name: "Polokwane",
    },
    {
      id: 2,
      name: "Seshego",
    },
    {
      id: 3,
      name: "Pretoria",
    },
    {
      id: 4,
      name: "Cape Town",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium hover:bg-gray-700/20 px-2 py-2 rounded-md transition ease-in"
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
