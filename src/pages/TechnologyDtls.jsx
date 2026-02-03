import React from "react";
import { useParams } from "react-router-dom";
import Healthcare from "./Technologies/Healthcare";
import Finance from "./Technologies/Finance";
import Technology from "./Technologies/Technology";
import Energy from "./Technologies/Energy";
import Government from "./Technologies/Government";

const TechnologyDtls = () => {
  const { tech } = useParams();

  if (tech === "healthcare") {
    return <Healthcare />;
  } else if (tech === "finance") {
    return <Finance />;
  } else if (tech === "technology") {
    return <Technology />;
  } else if (tech === "energy") {
    return <Energy />;
  } else if (tech === "government") {
    return <Government />;
  }
  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        Technology Not Found
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
        The technology you are looking for does not exist. Please check the URL
        or return to the homepage.
      </p>
    </div>
  );
};

export default TechnologyDtls;
