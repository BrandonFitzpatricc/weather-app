import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserCoordinates,
} from "./data-retriever";

import {
  processWeatherInfo,
  processUserAddress,
  processUserCoordinates,
} from "./data-processor";

getUserCoordinates().then(async (coordinates) => {
  coordinates = processUserCoordinates(coordinates);
  const userAddress = processUserAddress(await fetchUserAddress(coordinates));
  console.log(userAddress);

  const coordinatesWeatherInfo = processWeatherInfo(
    await fetchWeatherInfo(userAddress),
  );
  console.log(coordinatesWeatherInfo);
});

fetchWeatherInfo(["Shirley", "New York"]).then((weatherInfo) => {
  console.log(processWeatherInfo(weatherInfo));
});
