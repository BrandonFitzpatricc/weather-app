import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { fetchWeatherInfo, getUserLocation } from "./data-retriever";
import { processWeatherInfo, processUserLocation } from "./data-processor";

getUserLocation().then((userLocation) =>
  fetchWeatherInfo(processUserLocation(userLocation)).then((weatherInfo) =>
    console.log(weatherInfo),
  ),
);

fetchWeatherInfo(["Shirley", "New York"]).then((weatherInfo) =>
  console.log(processWeatherInfo(weatherInfo)),
);
