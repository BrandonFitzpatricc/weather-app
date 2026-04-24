import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { fetchWeatherInfo, getUserCoordinates } from "./data-retriever";
import { processWeatherInfo, processUserCoordinates } from "./data-processor";

getUserCoordinates().then((userCoordinates) =>
  fetchWeatherInfo(processUserCoordinates(userCoordinates)).then((weatherInfo) =>
    console.log(weatherInfo),
  ),
);

fetchWeatherInfo(["Shirley", "New York"]).then((weatherInfo) =>
  console.log(processWeatherInfo(weatherInfo)),
);
