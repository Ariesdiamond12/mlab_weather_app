import React from "react";

const TopButtons = () => {
  const cities = [
    {
      id: 1,
      title: "Polokwane",
    },
    {
      id: 2,
      title: "Seshego",
    },
    {
      id: 3,
      title: "Pretoria",
    },
    {
      id: 4,
      title: "Emalahleni",
    },
    {
      id: 5,
      title: "Cape Town",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium">
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
